import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import useInstitutionService from '../../hooks/institutions/useInstitutionService';
import { InstitutionExternDatabaseIdEntity, InstitutionNameEntity } from '../../types/institutions/entities.types';
import { FormikFieldSchema } from '../../types/common/component.types';
import { clearObject, clearValues } from '../../utils/objects-utils';
import { CreateInstitutionWithDetailsCommand } from '../../types/institutions/commands.types';
import routes from '../../endpoints/routes.endpoints';
import { handleDeleteItem, handleEntityItemUpdate, handleEntityNewItem } from '../../utils/zuepc-item-utils';
import CRUDItemPageBase from '../../components/itemPage/CRUDItemPageBase';
import ItemDataSection from '../../components/itemPage/ItemDataSection';
import { Grid } from '@mui/material';
import SubmitResetForm from '../../components/SubmitResetForm';
import NewItemWithExistingUpdateDeletePreview from '../../components/itemPage/NewItemWithExistingUpdateDeletePreview';
import { institutionBasicInfoSchema, institutionExternIdentifierSchema, institutionNameSchema } from '../../validation-schemas/institution.schema';

type Props = {}

const InstitutionCreate = (props: Props) => {
    const { t } = useTranslation();
    const { createInstitution } = useInstitutionService();
    const [isProcessing, setIsProcessing] = useState(false);
    const [institutionNames, setInstitutionNames] = useState<InstitutionNameEntity[]>([]);
    const [institutionExternDbIds, setInstitutionExternDbIds] = useState<InstitutionExternDatabaseIdEntity[]>([]);
    const navigate = useNavigate();
    const baseFormName = "whole-form";

    const basicInfoSchema = institutionBasicInfoSchema;
    const newNameSchema = institutionNameSchema;
    const newExternIdentifierSchema = institutionExternIdentifierSchema;

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
                navigate(routes.institutionDetails.replace(":id", newId));
            })
            .catch((err) => {
                setIsProcessing(false);
                console.error(err);
            });
    }

    const dataSections = [
        {
            title: t("name"),
            formName: "new-name",
            newItemFormSchema: newNameSchema,
            existItemFormSchema: newNameSchema,
            items: institutionNames,
            onNewItemSubmit: (values: InstitutionNameEntity, dirty: boolean) => {
                handleEntityNewItem(values, dirty, setInstitutionNames)
            },
            onItemDelete: (key: number) => handleDeleteItem(key, setInstitutionNames),
            onExistItemUpdate: (key: number, values: InstitutionNameEntity) => {
                handleEntityItemUpdate(key, values, setInstitutionNames)
            }
        },
        {
            title: t("externDatabaseIds"),
            formName: "new-extern-id",
            newItemFormSchema: newExternIdentifierSchema,
            existItemFormSchema: newExternIdentifierSchema,
            items: institutionExternDbIds,
            onNewItemSubmit: (values: InstitutionExternDatabaseIdEntity, dirty: boolean) => {
                handleEntityNewItem(values, dirty, setInstitutionExternDbIds)
            },
            onItemDelete: (key: number) => { handleDeleteItem(key, setInstitutionExternDbIds) },
            onExistItemUpdate: (key: number, values: InstitutionExternDatabaseIdEntity) => {
                handleEntityItemUpdate(key, values, setInstitutionExternDbIds)
            }
        },
    ]

    return (
        <CRUDItemPageBase
            title={`${t('newShe')} ${t('institution').toLowerCase()}`}
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

export default InstitutionCreate