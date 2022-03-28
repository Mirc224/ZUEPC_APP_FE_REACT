import { Backdrop, Button, CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import SubmitResetForm from '../../components/SubmitResetForm';
import { FormikFieldSchema} from '../../types/common/component.types';
import NewItemWithExistingUpdateDeletePreview from '../../components/NewItemWithExistingUpdateDeletePreview';
import usePersonService from '../../hooks/persons/usePersonService';
import routes from '../../endpoints/routes.endpoints';
import { useNavigate } from 'react-router';
import { clearObject, clearValues } from '../../utils/objects-utils';
import ItemDataSection from '../../components/ItemDataSection';
import { CreatePersonWithDetailsCommand } from '../../types/persons/commands.types';
import { PersonExternDatabaseIdEntity, PersonNameEntity } from '../../types/persons/entities.types';
import { handleDeleteItem, handleEntityItemUpdate, handleEntityNewItem } from '../../utils/zuepc-item-utils';

type Props = {}


const PersonCreate = (props: Props) => {
  const { t } = useTranslation();
  const { createPerson } = usePersonService();
  const [isLoading, setIsLoading] = useState(false);
  const [personNames, setPersonNames] = useState<PersonNameEntity[]>([]);
  const [personExternDbIds, setPersonExternDbIds] = useState<PersonExternDatabaseIdEntity[]>([]);
  const navigate = useNavigate();

  const basicInfoSchema: FormikFieldSchema[] = [
    {
      name: "birthYear",
      labelTranslationKey: "birthYear",
      validationSchema: (yup
        .number()
        .typeError('mustBeNumber')
        .nullable(true)),
      type: "text",
      initValue: "",
    },
    {
      name: "deathYear",
      labelTranslationKey: "deathYear",
      validationSchema: (yup
        .number()
        .typeError('mustBeNumber')
        .nullable(true)),
      type: "text",
      initValue: ""
    },
  ]

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

  const handleSubmitForm = (values: any) => {
    setIsLoading(true);
    const clearedNames = clearValues(personNames).filter(x => Object.keys(x).length);
    const clearedExtIds = clearValues(personExternDbIds).filter(x => Object.keys(x).length);
    let objectToCreate: CreatePersonWithDetailsCommand = {
      names: clearedNames,
      externDatabaseIds: clearedExtIds
    };
    objectToCreate = Object.assign(objectToCreate, clearObject(values))

    createPerson(objectToCreate, {
      headers: { 'Content-type': 'application/json' }
    })
      .then((response) => {
        const newId = response.data.id;
        setIsLoading(false);
        navigate(routes.personDetails.replace(":id", newId));
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  }

  const dataSections = [
    {
      title: t("name"),
      formName: "new-name",
      newItemFormSchema: newNameSchema,
      existItemFormSchema: newNameSchema,
      items: personNames,
      onNewItemSubmit: (values: PersonNameEntity, dirty: boolean) => {
        handleEntityNewItem(values, dirty, setPersonNames)
      },
      onItemDelete: (key: number) => handleDeleteItem(key, setPersonNames),
      onExistItemUpdate: (key: number, values: PersonNameEntity) => {
        handleEntityItemUpdate(key, values, setPersonNames)
      }
    },
    {
      title: t("externDatabaseIds"),
      formName: "new-extern-id",
      newItemFormSchema: newExternIdentifierSchema,
      existItemFormSchema: newExternIdentifierSchema,
      items: personExternDbIds,
      onNewItemSubmit: (values: PersonExternDatabaseIdEntity, dirty: boolean) => {
        handleEntityNewItem(values, dirty, setPersonExternDbIds)
      },
      onItemDelete: (key: number) => { handleDeleteItem(key, setPersonExternDbIds) },
      onExistItemUpdate: (key: number, values: PersonExternDatabaseIdEntity) => {
        handleEntityItemUpdate(key, values, setPersonExternDbIds)
      }
    },
  ]

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <header>
            <Typography
              className='text-center'
              component="h1"
              variant="h4">
              {t('newShe')} {t('person').toLowerCase()}
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container >
  )
}

export default PersonCreate