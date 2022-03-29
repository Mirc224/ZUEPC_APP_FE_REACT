import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import NewItemWithExistingUpdateDeletePreview from '../../components/itemPage/NewItemWithExistingUpdateDeletePreview';
import SubmitResetForm from '../../components/SubmitResetForm';
import usePersonService from '../../hooks/persons/usePersonService';
import { ChangeableItem, FormikFieldSchema } from '../../types/common/component.types';
import { useEffect, useState } from 'react';
import { clearChangeableItemValues, clearObject } from '../../utils/objects-utils';
import ItemDataSection from '../../components/itemPage/ItemDataSection';
import { handleDeleteItem, handleExistingEntityItemUpdate, handleExistingEntityNewItem, sortItemsToInserTotUpdateToDelete } from '../../utils/zuepc-item-utils';
import { PersonDetailsEntity, PersonExternDatabaseIdEntity, PersonNameEntity } from '../../types/persons/entities.types';
import { UpdatePersonWithDetailsCommand } from '../../types/persons/commands.types';
import routes from '../../endpoints/routes.endpoints';
import CRUDItemPageBase from '../../components/itemPage/CRUDItemPageBase';
import { personBasicInfoSchema, personExternIdentifierSchema, personNameSchema } from '../../form-schemas/person.schema';

type Props = {}


const PersonEdit = (props: Props) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [person, setPerson] = useState<PersonDetailsEntity>(undefined!);
  const { getPersonDetails, updatePerson } = usePersonService();
  const [personNames, setPersonNames] = useState<ChangeableItem<PersonNameEntity>[]>([]);
  const [personExternDbIds, setPersonExternDbIds] = useState<ChangeableItem<PersonExternDatabaseIdEntity>[]>([]);
  const navigate = useNavigate();
  const baseFormName = "whole-form";

  const [basicInfoSchema, setBasicInfoSchema] = useState<FormikFieldSchema[]>([])

  const newNameSchema = personNameSchema;
  const newExternIdentifierSchema = personExternIdentifierSchema;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    if (id !== undefined) {
      setIsLoading(true);
      getPersonDetails(id, {
        signal: controller.signal
      })
        .then((response) => {
          const resPerson: PersonDetailsEntity = response.data;
          const basicInfoSchema = personBasicInfoSchema;

          isMounted && setPerson(resPerson);
          isMounted && setBasicInfoSchema([
            ...basicInfoSchema.map(x=> {
              return {...x, initValue: resPerson[x.name as keyof PersonDetailsEntity]}
            })
          ])
          isMounted && resPerson.names && setPersonNames([
            ...resPerson.names.map((x): ChangeableItem<PersonNameEntity> => { return { item: x, changed: false } })
          ])
          isMounted && resPerson.externDatabaseIds && setPersonExternDbIds([
            ...resPerson.externDatabaseIds.map((x): ChangeableItem<PersonExternDatabaseIdEntity> => { return { item: x, changed: false } })
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
    setIsProcessing(true)
    const clearedNames = clearChangeableItemValues(personNames);
    const clearedExtIds = clearChangeableItemValues(personExternDbIds);
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
        setIsProcessing(false);
        navigate(routes.personDetails.replace(":id", id ? id : "-1"));
      })
      .catch((err) => {
        console.error(err);
        setIsProcessing(false);
      });
  }

  const dataSections = [
    {
      title: `${t("firstName")}/${t("lastName")}`,
      formName: "new-name",
      newItemFormSchema: newNameSchema,
      existItemFormSchema: newNameSchema,
      items: personNames.map(x => x.item),
      onNewItemSubmit: (values: PersonNameEntity, dirty: boolean) => {
        handleExistingEntityNewItem(values, dirty, setPersonNames)
      },
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
    <CRUDItemPageBase
      title={`${t('editPage')}: ${t('person')}(${id})`}
      wholeFormId={baseFormName}
      isLoading={isLoading}
      isProcessing={isProcessing}
    >
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
    </CRUDItemPageBase>
  )
}

export default PersonEdit