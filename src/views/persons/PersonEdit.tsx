import { Button, Container, Grid, Typography } from '@mui/material';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import NewItemWithExistingUpdateDeletePreview from '../../components/NewItemWithExistingUpdateDeletePreview';
import SubmitResetForm from '../../components/SubmitResetForm';
import usePersonService from '../../hooks/persons/usePersonService';
import { ChangeableItem, FormikFieldSchema } from '../../types/common/component.types';
import { useEffect, useState } from 'react';
import { clearObject } from '../../utils/objects-utils';
import LoadingScreen from '../../components/LoadingScreen';
import ItemDataSection from '../../components/ItemDataSection';
import { handleDeleteItem, handleExistingEntityItemUpdate, handleExistingEntityNewItem, sortItemsToInserTotUpdateToDelete } from '../../utils/zuepc-item-utils';
import { PersonDetailsEntity, PersonExternDatabaseIdEntity, PersonNameEntity } from '../../types/persons/entities.types';
import { UpdatePersonWithDetailsCommand } from '../../types/persons/commands.types';
import routes from '../../endpoints/routes.endpoints';

type Props = {}


const PersonEdit = (props: Props) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [person, setPerson] = useState<PersonDetailsEntity>(undefined!);
  const { getPersonDetails, updatePerson } = usePersonService();
  const [personNames, setPersonNames] = useState<ChangeableItem<PersonNameEntity>[]>([]);
  const [personExternDbIds, setPersonExternDbIds] = useState<ChangeableItem<PersonExternDatabaseIdEntity>[]>([]);
  const navigate = useNavigate();

  const [basicInfoSchema, setBasicInfoSchema] = useState<FormikFieldSchema[]>([])

  const newNameSchema: FormikFieldSchema[] = [
    {
      name: "firstName",
      type: "text",
      initValue: ""
    },
    {
      name: "lastName",
      type: "text",
      initValue: ""
    },
    {
      name: "nameType",
      type: "text",
      initValue: "",
    },
  ]

  const newExternIdentifierSchema: FormikFieldSchema[] = [
    {
      name: 'externIdentifierValue',
      type: "text",
      initValue: ""
    }
  ]

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    if (id !== undefined) {
      setIsLoading(true);
      getPersonDetails(id, {
        signal: controller.signal
      })
        .then((response) => {
          const person: PersonDetailsEntity = response.data;
          isMounted && setPerson(person);
          isMounted && setBasicInfoSchema([{
            name: "birthYear",
            labelTranslationKey: "birthYear",
            validationSchema: (yup
              .number()
              .typeError('mustBeNumber')
              .nullable(true)),
            type: "text",
            initValue: person.birthYear ? person.birthYear : "",
          },
          {
            name: "deathYear",
            labelTranslationKey: "deathYear",
            validationSchema: (yup
              .number()
              .typeError('mustBeNumber')
              .nullable(true)),
            type: "text",
            initValue: person.deathYear ? person.deathYear : ""
          }])
          isMounted && person.names && setPersonNames([
            ...person.names.map((x): ChangeableItem<PersonNameEntity> => { return { item: x, changed: false } })
          ])
          isMounted && person.externDatabaseIds && setPersonExternDbIds([
            ...person.externDatabaseIds.map((x): ChangeableItem<PersonExternDatabaseIdEntity> => { return { item: x, changed: false } })
          ])
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        })
    }

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

  const handleSubmitForm = (values: any) => {
    const clearedNames = personNames.map((x): ChangeableItem<PersonNameEntity> => {
      return { item: clearObject<PersonNameEntity>(x.item), changed: x.changed }
    }).filter(x => Object.keys(x.item).length);

    const clearedExtIds = personExternDbIds.map((x): ChangeableItem<PersonExternDatabaseIdEntity> => {
      return { item: clearObject<PersonExternDatabaseIdEntity>(x.item), changed: x.changed }
    }).filter(x => Object.keys(x.item).length);

    const [namesToInsert, namesToUpdate, namesToDelete] =
      sortItemsToInserTotUpdateToDelete(person.names ? person.names : [], clearedNames);

    const [externDatabaseIdsToInsert, externDatabaseIdsToUpdate, externDatabaseIdsToDelete] =
      sortItemsToInserTotUpdateToDelete(person.externDatabaseIds ? person.externDatabaseIds : [], clearedExtIds);

    let objectToUpdate: UpdatePersonWithDetailsCommand = {
      id: person.id,
      namesToInsert: namesToInsert,
      namesToUpdate: namesToUpdate,
      namesToDelete: namesToDelete,
      externDatabaseIdsToInsert: externDatabaseIdsToInsert,
      externDatabaseIdsToUpdate: externDatabaseIdsToUpdate,
      externDatabaseIdsToDelete: externDatabaseIdsToDelete,
    };
    objectToUpdate = Object.assign(objectToUpdate, clearObject(values))

    updatePerson(objectToUpdate, {
      headers: { 'Content-type': 'application/json' }
    })
      .then((response) => {
        setIsLoading(false);
        navigate(routes.personDetails.replace(":id", id ? id : "-1"));
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }

  const dataSections = [
    {
      title: t("name"),
      formName: "new-name",
      newItemFormSchema: newNameSchema,
      existItemFormSchema: newNameSchema,
      items: personNames.map(x => x.item),
      onNewItemSubmit: (values: PersonNameEntity, dirty: boolean) => { 
        handleExistingEntityNewItem(values, dirty, setPersonNames)},
      onItemDelete: (key: number) => handleDeleteItem(key, setPersonNames),
      onExistItemUpdate: (key: number, values: PersonNameEntity) => {
        handleExistingEntityItemUpdate(key, values, setPersonNames)
      }
    },
    {
      title: t("externDatabaseIds"),
      formName: "new-extern-id",
      newItemFormSchema: newExternIdentifierSchema,
      existItemFormSchema: newExternIdentifierSchema,
      items: personExternDbIds.map(x => x.item),
      onNewItemSubmit: (values: PersonExternDatabaseIdEntity, dirty: boolean) => {
        handleExistingEntityNewItem(values, dirty, setPersonExternDbIds)
      },
      onItemDelete: (key: number) => { handleDeleteItem(key, setPersonExternDbIds) },
      onExistItemUpdate: (key: number, values: PersonExternDatabaseIdEntity) => {
        handleExistingEntityItemUpdate(key, values, setPersonExternDbIds)
      }
    },
  ]

  return (
    <>
      {isLoading || person === undefined
        ?
        <LoadingScreen isLoading={isLoading} />
        :
        <Container>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <header>
                <Typography
                  className='text-center'
                  component="h1"
                  variant="h4">
                  {`${t('editPage')}: ${t('person')} (${id})`}
                </Typography>
                <hr />
              </header>
            </Grid>
            <Grid item xs={12}>
              <main>
                <ItemDataSection title={`${t("basic")} ${t('informations').toLowerCase()}`}>
                  <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                      <SubmitResetForm direction="row" onSubmit={handleSubmitForm} fields={basicInfoSchema} formId="whole-form" />
                    </Grid>
                  </Grid>
                </ItemDataSection>
                {dataSections.map((x, i) =>
                  <ItemDataSection key={i} title={x.title}>
                    <NewItemWithExistingUpdateDeletePreview
                      formName={x.formName}
                      newItemFormSchema={x.newItemFormSchema}
                      existItemFormSchema={x.existItemFormSchema}
                      items={x.items}
                      onNewItemSubmit={x.onNewItemSubmit}
                      onItemDelete={x.onItemDelete}
                      onEixstItemUpdate={x.onExistItemUpdate}
                    />
                  </ItemDataSection>
                )}
              </main>
              <hr />
            </Grid>
            <Grid item xs={2}>
              <footer>
                <Button form="whole-form" color="primary" variant="contained" fullWidth type="submit">
                  {t("submit")}
                </Button>
              </footer>
            </Grid>
          </Grid>
        </Container >}
    </>
  )
}

export default PersonEdit