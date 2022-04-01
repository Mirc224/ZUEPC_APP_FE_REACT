import { Grid } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next';
import { institutionBasicInfoSchema, institutionExternIdentifierSchema, institutionNameSchema } from '../../form-schemas/institution.schema';
import { ChangeableItem, FormikFieldSchema } from '../../types/common/component.types';
import { InstitutionExternDatabaseIdEntity, InstitutionNameEntity } from '../../types/institutions/entities.types';
import SubmitResetForm from '../common/SubmitResetForm';
import CRUDItemPageBase from '../itemPage/CRUDItemPageBase';
import ItemDataSection from '../itemPage/ItemDataSection';
import NewItemWithExistingUpdateDeletePreview from '../itemPage/NewItemWithExistingUpdateDeletePreview';

type Props = {
    title: string,
    isLoading?: boolean,
    basicInfoSchema?: FormikFieldSchema[],
    handleNewItem: (values: any, dirty: boolean, setItems: any) => void
    handleUpdateItem: (key: number, values: any, setItems: any) => void
    handleDeleteItem: (key: number, setItems: any) => void,
    onSubmit: (values: any, dirty: boolean) => void,
    isProcessing: boolean,
    names: InstitutionNameEntity[],
    setNames: Dispatch<SetStateAction<InstitutionNameEntity[]>> | Dispatch<SetStateAction<ChangeableItem<InstitutionNameEntity>[]>>,
    externDatabaseIds: InstitutionExternDatabaseIdEntity[],
    setExternDatabaseIds: Dispatch<SetStateAction<InstitutionExternDatabaseIdEntity[]>> | Dispatch<SetStateAction<ChangeableItem<InstitutionExternDatabaseIdEntity>[]>>
}

const InstitutionCreateEditBase = (props: Props) => {
    const { t } = useTranslation();
    const {
        title,
        basicInfoSchema,
        handleDeleteItem,
        handleNewItem,
        handleUpdateItem,
        onSubmit,
        isLoading,
        isProcessing,
        names,
        setNames,
        externDatabaseIds,
        setExternDatabaseIds } = props
    const baseFormName = "whole-form";

    const dataSections = [
        {
            title: t("name"),
            formName: "new-name",
            newItemFormSchema: institutionNameSchema,
            existItemFormSchema: institutionNameSchema,
            items: names,
            onNewItemSubmit: (values: InstitutionNameEntity, dirty: boolean) => {
                handleNewItem(values, dirty, setNames)
            },
            onItemDelete: (key: number) => handleDeleteItem(key, setNames),
            onExistItemUpdate: (key: number, values: InstitutionNameEntity) => {
                handleUpdateItem(key, values, setNames)
            }
        },
        {
            title: t("externDatabaseIds"),
            formName: "new-extern-id",
            newItemFormSchema: institutionExternIdentifierSchema,
            existItemFormSchema: institutionExternIdentifierSchema,
            items: externDatabaseIds,
            onNewItemSubmit: (values: InstitutionExternDatabaseIdEntity, dirty: boolean) => {
                handleNewItem(values, dirty, setExternDatabaseIds)
            },
            onItemDelete: (key: number) => { handleDeleteItem(key, setExternDatabaseIds) },
            onExistItemUpdate: (key: number, values: InstitutionExternDatabaseIdEntity) => {
                handleUpdateItem(key, values, setExternDatabaseIds)
            }
        },
    ]

    return (
        <CRUDItemPageBase
            title={title}
            wholeFormId={baseFormName}
            isProcessing={isProcessing}
            isLoading={isLoading}
        >
            <ItemDataSection title={`${t("basic")} ${t('informations').toLowerCase()}`}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <SubmitResetForm
                            direction="row"
                            onSubmit={onSubmit}
                            fields={basicInfoSchema ? basicInfoSchema : institutionBasicInfoSchema}
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

export default InstitutionCreateEditBase