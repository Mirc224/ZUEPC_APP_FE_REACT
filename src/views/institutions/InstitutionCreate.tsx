import ROUTES from '../../endpoints/routes.endpoints';
import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import useInstitutionService from '../../hooks/institutions/useInstitutionService';
import { InstitutionExternDatabaseIdEntity, InstitutionNameEntity } from '../../types/institutions/entities.types';
import { clearObject, clearValues } from '../../utils/objects-utils';
import { CreateInstitutionWithDetailsCommand } from '../../types/institutions/commands.types';
import { handleDeleteItem, handleEntityItemUpdate, handleEntityNewItem } from '../../utils/zuepc-item-utils';
import InstitutionCreateEditBase from '../../components/institutions/InstitutionCreateEditBase';

type Props = {}

const InstitutionCreate = (props: Props) => {
    const { t } = useTranslation();
    const { createInstitution } = useInstitutionService();
    const [isProcessing, setIsProcessing] = useState(false);
    const [institutionNames, setInstitutionNames] = useState<InstitutionNameEntity[]>([]);
    const [institutionExternDbIds, setInstitutionExternDbIds] = useState<InstitutionExternDatabaseIdEntity[]>([]);
    const navigate = useNavigate();

    const handleSubmitForm = (values: any) => {
        setIsProcessing(true);
        const clearedNames = clearValues(institutionNames).filter(x => Object.keys(x).length);
        const clearedExtIds = clearValues(institutionExternDbIds).filter(x => Object.keys(x).length);
        let objectToCreate: CreateInstitutionWithDetailsCommand = {
            names: clearedNames,
            externDatabaseIds: clearedExtIds
        };
        objectToCreate = Object.assign(objectToCreate, clearObject(values))

        createInstitution(objectToCreate, {
            headers: { 'Content-type': 'application/json' }
        })
            .then((response) => {
                const newId = response.data.id;
                setIsProcessing(false);
                navigate(ROUTES.institutionDetails.replace(":id", newId));
            })
            .catch((err) => {
                setIsProcessing(false);
                console.error(err);
            });
    }

    return (
        <InstitutionCreateEditBase 
                title={`${t('newShe')} ${t('institution').toLowerCase()}`} 
                handleDeleteItem={handleDeleteItem}
                handleNewItem={handleEntityNewItem}
                handleUpdateItem={handleEntityItemUpdate}
                onSubmit={handleSubmitForm}
                isProcessing={isProcessing}
                names={institutionNames}
                setNames={setInstitutionNames}
                externDatabaseIds={institutionExternDbIds}
                setExternDatabaseIds={setInstitutionExternDbIds} />)

}

export default InstitutionCreate