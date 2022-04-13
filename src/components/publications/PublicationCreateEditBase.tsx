import { Dispatch, SetStateAction, useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import CRUDItemPageBase from '../../components/itemPage/CRUDItemPageBase';
import ItemDataSection from '../../components/itemPage/ItemDataSection';
import NewAuthorWithExistingAuthorsForm from '../../components/publications/NewAuthorWithExistingAuthorsForm';
import { AuthorFormValues, ChangeableItem, FormikFieldSchema, RelatedPublicationFormValues } from '../../types/common/component.types';
import NewRelatedPublicationWithExistingForm from '../../components/publications/NewRelatedPublicationWithExistingForm';
import { publicationActivitySchema, publicationAuthorSchema, publicationBasicInfoSchema, publicationExternDatabaseIdSchema, publicationIdentifierSchema, publicationNameSchema, relatedPublicationSchema } from '../../form-schemas/publication.schema';
import { PublicationActivityEntity, PublicationExternDatabaseIdEntity, PublicationIdentifierEntity, PublicationNameEntity } from '../../types/publications/entities.types';
import NewItemWithExistingUpdateDeletePreview from '../../components/itemPage/NewItemWithExistingUpdateDeletePreview';
import SubmitResetForm from '../../components/common/SubmitResetForm';

type Props = {
    title: string,
    isLoading?: boolean,
    basicInfoSchema?: FormikFieldSchema[],
    handleNewItem: (values: any, dirty: boolean, setItems: any) => void
    handleUpdateItem: (key: number, values: any, setItems: any) => void
    handleDeleteItem: (key: number, setItems: any) => void,
    onSubmit: (values: any, dirty: boolean) => void,
    isProcessing: boolean,
    names: PublicationNameEntity[],
    setNames: Dispatch<SetStateAction<PublicationNameEntity[]>> | Dispatch<SetStateAction<ChangeableItem<PublicationNameEntity>[]>> ,
    identifiers: PublicationIdentifierEntity[],
    setIdentifiers: Dispatch<SetStateAction<PublicationIdentifierEntity[]>> | Dispatch<SetStateAction<ChangeableItem<PublicationIdentifierEntity>[]>>, 
    externDatabaseIds: PublicationExternDatabaseIdEntity[],
    setExternDatabaseIds: Dispatch<SetStateAction<PublicationExternDatabaseIdEntity[]>> | Dispatch<SetStateAction<ChangeableItem<PublicationExternDatabaseIdEntity>[]>> ,
    publicationActivities: PublicationActivityEntity[],
    setPublicationActivites: Dispatch<SetStateAction<PublicationActivityEntity[]>> | Dispatch<SetStateAction<ChangeableItem<PublicationActivityEntity>[]>>,
    authors: AuthorFormValues[],
    setAuthors: Dispatch<SetStateAction<AuthorFormValues[]>> | Dispatch<SetStateAction<ChangeableItem<AuthorFormValues>[]>>, 
    relatedPublications: RelatedPublicationFormValues[],
    setRelatedPublications: Dispatch<SetStateAction<RelatedPublicationFormValues[]>> | Dispatch<SetStateAction<ChangeableItem<RelatedPublicationFormValues>[]>>
}


const PublicationCreateEditBase = (props: Props) => {
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
        identifiers,
        setIdentifiers,
        externDatabaseIds,
        setExternDatabaseIds,
        publicationActivities,
        setPublicationActivites,
        authors,
        setAuthors,
        relatedPublications,
        setRelatedPublications } = props;
    const baseFormName = "whole-form";
    const _isMounted = useRef(true);

    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    }, [])

    const dataSections = [
        {
            title: t("name"),
            formName: "new-name",
            newItemFormSchema: publicationNameSchema,
            existItemFormSchema: publicationNameSchema,
            items: names,
            onNewItemSubmit: (values: PublicationNameEntity, dirty: boolean) => {
                handleNewItem(values, dirty, setNames)
            },
            onItemDelete: (key: number) => handleDeleteItem(key, setNames),
            onExistItemUpdate: (key: number, values: PublicationNameEntity) => {
                handleUpdateItem(key, values, setNames)
            }
        },
        {
            title: t("publicationIdentifier"),
            formName: "new-identifier",
            newItemFormSchema: publicationIdentifierSchema,
            existItemFormSchema: publicationIdentifierSchema,
            items: identifiers,
            onNewItemSubmit: (values: PublicationIdentifierEntity, dirty: boolean) => {
                handleNewItem(values, dirty, setIdentifiers)
            },
            onItemDelete: (key: number) => handleDeleteItem(key, setIdentifiers),
            onExistItemUpdate: (key: number, values: PublicationIdentifierEntity) => {
                handleUpdateItem(key, values, setIdentifiers)
            }
        },
        {
            title: t("externDatabaseIds"),
            formName: "new-extern-id",
            newItemFormSchema: publicationExternDatabaseIdSchema,
            existItemFormSchema: publicationExternDatabaseIdSchema,
            items: externDatabaseIds,
            onNewItemSubmit: (values: PublicationExternDatabaseIdEntity, dirty: boolean) => {
                handleNewItem(values, dirty, setExternDatabaseIds)
            },
            onItemDelete: (key: number) => { handleDeleteItem(key, setExternDatabaseIds) },
            onExistItemUpdate: (key: number, values: PublicationExternDatabaseIdEntity) => {
                handleUpdateItem(key, values, setExternDatabaseIds)
            }
        },
        {
            title: t("publicationActivity"),
            formName: "new-activity",
            newItemFormSchema: publicationActivitySchema,
            existItemFormSchema: publicationActivitySchema,
            items: publicationActivities,
            onNewItemSubmit: (values: PublicationActivityEntity, dirty: boolean) => {
                handleNewItem(values, dirty, setPublicationActivites)
            },
            onItemDelete: (key: number) => handleDeleteItem(key, setPublicationActivites),
            onExistItemUpdate: (key: number, values: PublicationActivityEntity) => {
                handleUpdateItem(key, values, setPublicationActivites)
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
                    fields={basicInfoSchema ? basicInfoSchema : publicationBasicInfoSchema}
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
            <ItemDataSection title={t("publicationAuthor")}>
                <NewAuthorWithExistingAuthorsForm
                    authors={authors}
                    newItemFormSchema={publicationAuthorSchema}
                    onNewItemSubmit={(values: AuthorFormValues, dirty: boolean) =>
                        _isMounted.current && handleNewItem(values, dirty, setAuthors)
                    }
                    onItemDelete={(key: number) => _isMounted.current && handleDeleteItem(key, setAuthors)}
                    onExistItemUpdate={(key: number, values: AuthorFormValues) => {
                        _isMounted.current && handleUpdateItem(key, values, setAuthors)
                    }}
                />
            </ItemDataSection>
            <ItemDataSection title={t("relatedPublication")}>
                <NewRelatedPublicationWithExistingForm
                    relatedPublications={relatedPublications}
                    newItemFormSchema={relatedPublicationSchema}
                    onNewItemSubmit={(values: RelatedPublicationFormValues, dirty: boolean) =>
                        handleNewItem(values, dirty, setRelatedPublications)
                    }
                    onItemDelete={(key: number) => handleDeleteItem(key, setRelatedPublications)}
                    onExistItemUpdate={(key: number, values: RelatedPublicationFormValues) => {
                        handleUpdateItem(key, values, setRelatedPublications)
                    }}
                />
            </ItemDataSection>
        </CRUDItemPageBase>
    )
}

export default PublicationCreateEditBase