import ROUTES from '../../endpoints/routes.endpoints';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NewItemWithExistingUpdateDeletePreview from '../../components/itemPage/NewItemWithExistingUpdateDeletePreview';
import usePersonService from '../../hooks/persons/usePersonService';
import { useNavigate } from 'react-router';
import { clearObject, clearValues } from '../../utils/objects-utils';
import ItemDataSection from '../../components/itemPage/ItemDataSection';
import { CreatePersonWithDetailsCommand } from '../../types/persons/commands.types';
import { PersonExternDatabaseIdEntity, PersonNameEntity } from '../../types/persons/entities.types';
import { handleDeleteItem, handleEntityItemUpdate, handleEntityNewItem } from '../../utils/zuepc-item-utils';
import CRUDItemPageBase from '../../components/itemPage/CRUDItemPageBase';
import { personBasicInfoSchema, personExternIdentifierSchema, personNameSchema } from '../../form-schemas/person.schema';
import SubmitResetForm from '../../components/common/SubmitResetForm';
import PersonCreateEditBase from '../../components/persons/PersonCreateEditBase';

type Props = {}


const PersonCreate = (props: Props) => {
  const { t } = useTranslation();
  const { createPerson } = usePersonService();
  const [isProcessing, setIsProcessing] = useState(false);
  const [personNames, setPersonNames] = useState<PersonNameEntity[]>([]);
  const [personExternDbIds, setPersonExternDbIds] = useState<PersonExternDatabaseIdEntity[]>([]);
  const navigate = useNavigate();

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
        navigate(ROUTES.personDetails.replace(":id", newId));
      })
      .catch((err) => {
        setIsProcessing(false);
        console.error(err);
      });
  }


  return (
    <PersonCreateEditBase
      title={`${t('newShe')} ${t('person').toLowerCase()}`}
      handleDeleteItem={handleDeleteItem}
      handleNewItem={handleEntityNewItem}
      handleUpdateItem={handleEntityItemUpdate}
      onSubmit={handleSubmitForm}
      isProcessing={isProcessing}
      names={personNames}
      setNames={setPersonNames}
      externDatabaseIds={personExternDbIds}
      setExternDatabaseIds={setPersonExternDbIds}
    />)
}

export default PersonCreate