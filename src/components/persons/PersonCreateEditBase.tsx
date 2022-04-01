import React, { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { personBasicInfoSchema, personExternIdentifierSchema, personNameSchema } from '../../form-schemas/person.schema'
import { ChangeableItem, FormikFieldSchema } from '../../types/common/component.types'
import { PersonExternDatabaseIdEntity, PersonNameEntity } from '../../types/persons/entities.types'
import SubmitResetForm from '../common/SubmitResetForm'
import CRUDItemPageBase from '../itemPage/CRUDItemPageBase'
import ItemDataSection from '../itemPage/ItemDataSection'
import NewItemWithExistingUpdateDeletePreview from '../itemPage/NewItemWithExistingUpdateDeletePreview'

type Props = {
    title: string,
    isLoading?: boolean,
    basicInfoSchema?: FormikFieldSchema[],
    handleNewItem: (values: any, dirty: boolean, setItems: any) => void
    handleUpdateItem: (key: number, values: any, setItems: any) => void
    handleDeleteItem: (key: number, setItems: any) => void,
    onSubmit: (values: any, dirty: boolean) => void,
    isProcessing: boolean,
    names: PersonNameEntity[],
    setNames: Dispatch<SetStateAction<PersonNameEntity[]>> | Dispatch<SetStateAction<ChangeableItem<PersonNameEntity>[]>>,
    externDatabaseIds: PersonExternDatabaseIdEntity[],
    setExternDatabaseIds: Dispatch<SetStateAction<PersonExternDatabaseIdEntity[]>> | Dispatch<SetStateAction<ChangeableItem<PersonExternDatabaseIdEntity>[]>>
}

const PersonCreateEditBase = (props: Props) => {
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
        setExternDatabaseIds } = props;
    const baseFormName = "whole-form";

    const dataSections = [
        {
            title: `${t("firstName")}/${t("lastName")}`,
            formName: "new-name",
            newItemFormSchema: personNameSchema,
            existItemFormSchema: personNameSchema,
            items: names,
            onNewItemSubmit: (values: PersonNameEntity, dirty: boolean) => {
                handleNewItem(values, dirty, setNames)
            },
            onItemDelete: (key: number) => handleDeleteItem(key, setNames),
            onExistItemUpdate: (key: number, values: PersonNameEntity) => {
                handleUpdateItem(key, values, setNames)
            }
        },
        {
            title: t("externDatabaseIds"),
            formName: "new-extern-id",
            newItemFormSchema: personExternIdentifierSchema,
            existItemFormSchema: personExternIdentifierSchema,
            items: externDatabaseIds,
            onNewItemSubmit: (values: PersonExternDatabaseIdEntity, dirty: boolean) => {
                handleNewItem(values, dirty, setExternDatabaseIds)
            },
            onItemDelete: (key: number) => { handleDeleteItem(key, setExternDatabaseIds) },
            onExistItemUpdate: (key: number, values: PersonExternDatabaseIdEntity) => {
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
                <SubmitResetForm
                    onSubmit={onSubmit}
                    fields={basicInfoSchema ? basicInfoSchema : personBasicInfoSchema}
                    formId={baseFormName} />
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

export default PersonCreateEditBase