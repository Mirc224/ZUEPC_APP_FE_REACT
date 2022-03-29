import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import useInstitutionService from '../../hooks/institutions/useInstitutionService';
import { ChangeableItem, FormikFieldSchema } from '../../types/common/component.types';
import { InstitutionDetailsEntity, InstitutionExternDatabaseIdEntity, InstitutionNameEntity } from '../../types/institutions/entities.types';
import { clearChangeableItemValues, clearObject } from '../../utils/objects-utils';
import { handleDeleteItem, handleExistingEntityItemUpdate, handleExistingEntityNewItem, sortItemsToInserTotUpdateToDelete } from '../../utils/zuepc-item-utils';
import { UpdateInstitutionWithDetailsCommand } from '../../types/institutions/commands.types';
import ROUTES from '../../endpoints/routes.endpoints';
import CRUDItemPageBase from '../../components/itemPage/CRUDItemPageBase';
import ItemDataSection from '../../components/itemPage/ItemDataSection';
import { Grid } from '@mui/material';
import SubmitResetForm from '../../components/SubmitResetForm';
import NewItemWithExistingUpdateDeletePreview from '../../components/itemPage/NewItemWithExistingUpdateDeletePreview';
import { institutionBasicInfoSchema, institutionExternIdentifierSchema, institutionNameSchema } from '../../form-schemas/institution.schema';

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
    const baseFormName = "whole-form";

    const [basicInfoSchema, setBasicInfoSchema] = useState<FormikFieldSchema[]>([])

    const newNameSchema = institutionNameSchema;
    const newExternIdentifierSchema = institutionExternIdentifierSchema;

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
                        return { ...x, initValue: resInstitution[x.name as keyof InstitutionDetailsEntity] }
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
            sortItemsToInserTotUpdateToDelete(institution.names ? institution.names : [], clearedNames);
        const [externDatabaseIdsToInsert, externDatabaseIdsToUpdate, externDatabaseIdsToDelete] =
            sortItemsToInserTotUpdateToDelete(institution.externDatabaseIds ? institution.externDatabaseIds : [], clearedExtIds);

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

    const dataSections = [
        {
            title: t('name'),
            formName: "new-name",
            newItemFormSchema: newNameSchema,
            existItemFormSchema: newNameSchema,
            items: institutionNames.map(x => x.item),
            onNewItemSubmit: (values: InstitutionNameEntity, dirty: boolean) => {
                handleExistingEntityNewItem(values, dirty, setInstitutionNames)
            },
            onItemDelete: (key: number) => handleDeleteItem(key, setInstitutionNames),
            onExistItemUpdate: (key: number, values: InstitutionNameEntity) => {
                handleExistingEntityItemUpdate(key, values, setInstitutionNames)
            }
        },
        {
            title: t("externDatabaseIds"),
            formName: "new-extern-id",
            newItemFormSchema: newExternIdentifierSchema,
            existItemFormSchema: newExternIdentifierSchema,
            items: institutionExternDbIds.map(x => x.item),
            onNewItemSubmit: (values: InstitutionExternDatabaseIdEntity, dirty: boolean) => {
                handleExistingEntityNewItem(values, dirty, setInstitutionExternDbIds)
            },
            onItemDelete: (key: number) => { handleDeleteItem(key, setInstitutionExternDbIds) },
            onExistItemUpdate: (key: number, values: InstitutionExternDatabaseIdEntity) => {
                handleExistingEntityItemUpdate(key, values, setInstitutionExternDbIds)
            }
        },
    ]

    return (
        <CRUDItemPageBase
            title={`${t('editPage')}: ${t('institution')}(${id})`}
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

export default InstitutionEdit