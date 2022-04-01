import ROUTES from '../../endpoints/routes.endpoints';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import usePersonService from '../../hooks/persons/usePersonService';
import { ChangeableItem, FormikFieldSchema } from '../../types/common/component.types';
import { useEffect, useState } from 'react';
import { clearChangeableItemValues, clearObject } from '../../utils/objects-utils';
import { handleDeleteItem, handleExistingEntityItemUpdate, handleExistingEntityNewItem, sortItemsToInserToUpdateToDelete } from '../../utils/zuepc-item-utils';
import { PersonDetailsEntity, PersonExternDatabaseIdEntity, PersonNameEntity } from '../../types/persons/entities.types';
import { UpdatePersonWithDetailsCommand } from '../../types/persons/commands.types';
import { personBasicInfoSchema } from '../../form-schemas/person.schema';
import PersonCreateEditBase from '../../components/persons/PersonCreateEditBase';

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
  const [basicInfoSchema, setBasicInfoSchema] = useState<FormikFieldSchema[]>([])

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

          if(isMounted)
          {
            setPerson(resPerson);
            setBasicInfoSchema([
              ...basicInfoSchema.map(x => {
                const initValue = resPerson[x.name as keyof PersonDetailsEntity]
                return { ...x, initValue: initValue ? initValue : "" }
              })
            ])
            resPerson.names && setPersonNames([
              ...resPerson.names.map((x): ChangeableItem<PersonNameEntity> => {
                return { item: x, changed: false }
              })
            ])
            resPerson.externDatabaseIds && setPersonExternDbIds([
              ...resPerson.externDatabaseIds.map((x): ChangeableItem<PersonExternDatabaseIdEntity> => { return { item: x, changed: false } })
            ])
          }
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
      sortItemsToInserToUpdateToDelete(person.names ? person.names : [], clearedNames);
    const [externDatabaseIdsToInsert, externDatabaseIdsToUpdate, externDatabaseIdsToDelete] =
      sortItemsToInserToUpdateToDelete(person.externDatabaseIds ? person.externDatabaseIds : [], clearedExtIds);

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
        navigate(ROUTES.personDetails.replace(":id", id ? id : "-1"));
      })
      .catch((err) => {
        console.error(err);
        setIsProcessing(false);
      });
  }

  return (
    <PersonCreateEditBase
      title={`${t('editPage')}: ${t('person')}(${id})`}
      basicInfoSchema={basicInfoSchema}
      handleDeleteItem={handleDeleteItem}
      handleNewItem={handleExistingEntityNewItem}
      handleUpdateItem={handleExistingEntityItemUpdate}
      onSubmit={handleSubmitForm}
      isProcessing={isProcessing}
      isLoading={isLoading}
      names={personNames.map(x=> x.item)}
      setNames={setPersonNames}
      externDatabaseIds={personExternDbIds.map(x=> x.item)}
      setExternDatabaseIds={setPersonExternDbIds}
    />)
}

export default PersonEdit