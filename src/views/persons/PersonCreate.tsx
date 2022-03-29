import { Grid } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import SubmitResetForm from '../../components/SubmitResetForm';
import { FormikFieldSchema } from '../../types/common/component.types';
import NewItemWithExistingUpdateDeletePreview from '../../components/itemPage/NewItemWithExistingUpdateDeletePreview';
import usePersonService from '../../hooks/persons/usePersonService';
import routes from '../../endpoints/routes.endpoints';
import { useNavigate } from 'react-router';
import { clearObject, clearValues } from '../../utils/objects-utils';
import ItemDataSection from '../../components/itemPage/ItemDataSection';
import { CreatePersonWithDetailsCommand } from '../../types/persons/commands.types';
import { PersonExternDatabaseIdEntity, PersonNameEntity } from '../../types/persons/entities.types';
import { handleDeleteItem, handleEntityItemUpdate, handleEntityNewItem } from '../../utils/zuepc-item-utils';
import CRUDItemPageBase from '../../components/itemPage/CRUDItemPageBase';
import { personBasicInfoSchema, personExternIdentifierSchema, personNameSchema } from '../../form-schemas/person.schema';

type Props = {}


const PersonCreate = (props: Props) => {
  const { t } = useTranslation();
  const { createPerson } = usePersonService();
  const [isProcessing, setIsProcessing] = useState(false);
  const [personNames, setPersonNames] = useState<PersonNameEntity[]>([]);
  const [personExternDbIds, setPersonExternDbIds] = useState<PersonExternDatabaseIdEntity[]>([]);
  const navigate = useNavigate();
  const baseFormName = "whole-form";

  const basicInfoSchema = personBasicInfoSchema;

  const newNameSchema = personNameSchema;

  const newExternIdentifierSchema = personExternIdentifierSchema;

  const handleSubmitForm = (values: any) => {
    setIsProcessing(true);
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
        setIsProcessing(false);
        navigate(routes.personDetails.replace(":id", newId));
      })
      .catch((err) => {
        setIsProcessing(false);
        console.error(err);
      });
  }

  const dataSections = [
    {
      title: `${t("firstName")}/${t("lastName")}`,
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
    <CRUDItemPageBase
      title={`${t('newShe')} ${t('person').toLowerCase()}`}
      wholeFormId={baseFormName}
      isProcessing={isProcessing}
    >
      <ItemDataSection title={`${t("basic")} ${t('informations').toLowerCase()}`}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <SubmitResetForm
              direction="row"
              onSubmit={handleSubmitForm}
              fields={basicInfoSchema}
              formId={baseFormName} />
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
    </CRUDItemPageBase>)
}

export default PersonCreate