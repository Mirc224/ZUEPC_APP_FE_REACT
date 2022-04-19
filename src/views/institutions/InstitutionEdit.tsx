import ROUTES from '../../endpoints/routes.endpoints';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import useInstitutionService from '../../hooks/institutions/useInstitutionService';
import { ChangeableItem, FormikFieldSchema } from '../../types/common/component.types';
import { InstitutionDetailsEntity, InstitutionExternDatabaseIdEntity, InstitutionNameEntity } from '../../types/institutions/entities.types';
import { clearChangeableItemValues, clearObject } from '../../utils/objects-utils';
import { handleDeleteItem, handleExistingEntityItemUpdate, handleExistingEntityNewItem, sortItemsToInsertToUpdateToDelete } from '../../utils/zuepc-item-utils';
import { UpdateInstitutionWithDetailsCommand } from '../../types/institutions/commands.types';
import { institutionBasicInfoSchema} from '../../form-schemas/institution.schema';
import InstitutionCreateEditBase from '../../components/institutions/InstitutionCreateEditBase';

type Props = {}

const InstitutionEdit = (props: Props) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [institution, setInstitution] = useState<InstitutionDetailsEntity>(undefined!);
    const { getInstitutionDetails, updateInstitution } = useInstitutionService();
    const [institutionNames, setInstitutionNames] = useState<ChangeableItem<InstitutionNameEntity>[]>([]);
    const [institutionExternDbIds, setInstitutionExternDbIds] = useState<ChangeableItem<InstitutionExternDatabaseIdEntity>[]>([]);
    const navigate = useNavigate();

    const [basicInfoSchema, setBasicInfoSchema] = useState<FormikFieldSchema[]>([])
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        if (id !== undefined) {
            setIsLoading(true);
            getInstitutionDetails(id, {
                signal: controller.signal
            })
                .then((response) => {
                    const resInstitution: InstitutionDetailsEntity = response.data;
                    const basicInfoSchema = institutionBasicInfoSchema;
                    isMounted && setInstitution(resInstitution);
                    isMounted && setBasicInfoSchema([...basicInfoSchema.map(x => {
                        const initValue = resInstitution[x.name as keyof InstitutionDetailsEntity];
                        return { ...x, initValue: initValue ? initValue : ""}
                    })])
                    isMounted && resInstitution.names && setInstitutionNames([
                        ...resInstitution.names.map((x): ChangeableItem<InstitutionNameEntity> => { return { item: x, changed: false } })
                    ])
                    isMounted && resInstitution.externDatabaseIds && setInstitutionExternDbIds([
                        ...resInstitution.externDatabaseIds.map((x): ChangeableItem<InstitutionExternDatabaseIdEntity> => { return { item: x, changed: false } })
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
        const clearedNames = clearChangeableItemValues(institutionNames);
        const clearedExtIds = clearChangeableItemValues(institutionExternDbIds);
        const [namesToInsert, namesToUpdate, namesToDelete] =
            sortItemsToInsertToUpdateToDelete(institution.names ? institution.names : [], clearedNames);
        const [externDatabaseIdsToInsert, externDatabaseIdsToUpdate, externDatabaseIdsToDelete] =
            sortItemsToInsertToUpdateToDelete(institution.externDatabaseIds ? institution.externDatabaseIds : [], clearedExtIds);

        let objectToUpdate: UpdateInstitutionWithDetailsCommand = {
            id: institution.id,
            namesToInsert: namesToInsert,
            namesToUpdate: namesToUpdate,
            namesToDelete: namesToDelete,
            externDatabaseIdsToInsert: externDatabaseIdsToInsert,
            externDatabaseIdsToUpdate: externDatabaseIdsToUpdate,
            externDatabaseIdsToDelete: externDatabaseIdsToDelete,
        };
        objectToUpdate = Object.assign(objectToUpdate, clearObject(values))

        updateInstitution(objectToUpdate, {
            headers: { 'Content-type': 'application/json' }
        })
            .then((response) => {
                setIsProcessing(false);
                navigate(ROUTES.institutionDetails.replace(":id", id ? id : "-1"));
            })
            .catch((err) => {
                console.error(err);
                setIsProcessing(false);
            });
    }

    return (
        <InstitutionCreateEditBase
            title={`${t('editPage')}: ${t('institution')}(${id})`}
            basicInfoSchema={basicInfoSchema}
            handleDeleteItem={handleDeleteItem}
            handleNewItem={handleExistingEntityNewItem}
            handleUpdateItem={handleExistingEntityItemUpdate}
            onSubmit={handleSubmitForm}
            isProcessing={isProcessing}
            isLoading={isLoading}
            names={institutionNames.map(x=> x.item)}
            setNames={setInstitutionNames}
            externDatabaseIds={institutionExternDbIds.map(x => x.item) }
            setExternDatabaseIds={setInstitutionExternDbIds} />)
}

export default InstitutionEdit