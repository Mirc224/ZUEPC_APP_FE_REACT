import * as yup from 'yup';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CRUDItemPageBase from '../../components/itemPage/CRUDItemPageBase';
import ItemDataSection from '../../components/itemPage/ItemDataSection';
import NewAuthorWithExistingAuthorsForm from '../../components/publications/NewAuthorWithExistingAuthorsForm';
import { AuthorFormValues, FormikFieldSchema, RelatedPublicationFormValues } from '../../types/common/component.types';
import { handleDeleteItem, handleEntityItemUpdate, handleEntityNewItem } from '../../utils/zuepc-item-utils';
import NewRelatedPublicationWithExistingForm from '../../components/publications/NewRelatedPublicationWithExistingForm';
import { publicationActivitySchema, publicationAuthorSchema, publicationBasicInfoSchema, publicationExternDatabaseIdSchema, publicationIdentifierSchema, publicationNameSchema, relatedPublicationSchema } from '../../form-schemas/publication.schema';
import { PublicationActivityEntity, PublicationExternDatabaseIdEntity, PublicationIdentifierEntity, PublicationNameEntity } from '../../types/publications/entities.types';
import NewItemWithExistingUpdateDeletePreview from '../../components/itemPage/NewItemWithExistingUpdateDeletePreview';
import SubmitResetForm from '../../components/common/SubmitResetForm';

type Props = {}


const PublicationCreate = (props: Props) => {
    const { t } = useTranslation();
    const [isProcessing, setIsProcessing] = useState(false);
    const [names, setNames] = useState<PublicationNameEntity[]>([])
    const [identifiers, setIdentifiers] = useState<PublicationIdentifierEntity[]>([])
    const [externDatabaseIds, setExternDatabaseIds] = useState<PublicationExternDatabaseIdEntity[]>([])
    const [publicationActivities, setPublicationActivites] = useState<PublicationActivityEntity[]>([])
    const [authors, setAuthors] = useState<AuthorFormValues[]>([])
    const [relatedPublications, setRelatedPublications] = useState<RelatedPublicationFormValues[]>([])
    const baseFormName = "whole-form";

    const newPublicationAuthorSchema = publicationAuthorSchema;
    const newRelatedPublicationSchema = relatedPublicationSchema;
    const newPublicationBasicInfoSchema = publicationBasicInfoSchema;
    const newPublicationNameSchema = publicationNameSchema;
    const newPublicationIdentifierSchema = publicationIdentifierSchema;
    const newPublicationExternDatabaseIdSchema = publicationExternDatabaseIdSchema;
    const newPublicationActivitySchema = publicationActivitySchema;

    const dataSections = [
        {
            title: t("name"),
            formName: "new-name",
            newItemFormSchema: newPublicationNameSchema,
            existItemFormSchema: newPublicationNameSchema,
            items: names,
            onNewItemSubmit: (values: PublicationNameEntity, dirty: boolean) => {
                handleEntityNewItem(values, dirty, setNames)
            },
            onItemDelete: (key: number) => handleDeleteItem(key, setNames),
            onExistItemUpdate: (key: number, values: PublicationNameEntity) => {
                handleEntityItemUpdate(key, values, setNames)
            }
        },
        {
            title: t("publicationIdentifier"),
            formName: "new-identifier",
            newItemFormSchema: newPublicationIdentifierSchema,
            existItemFormSchema: newPublicationIdentifierSchema,
            items: identifiers,
            onNewItemSubmit: (values: PublicationIdentifierEntity, dirty: boolean) => {
                handleEntityNewItem(values, dirty, setIdentifiers)
            },
            onItemDelete: (key: number) => handleDeleteItem(key, setIdentifiers),
            onExistItemUpdate: (key: number, values: PublicationIdentifierEntity) => {
                handleEntityItemUpdate(key, values, setIdentifiers)
            }
        },
        {
            title: t("externDatabaseIds"),
            formName: "new-extern-id",
            newItemFormSchema: newPublicationExternDatabaseIdSchema,
            existItemFormSchema: newPublicationExternDatabaseIdSchema,
            items: externDatabaseIds,
            onNewItemSubmit: (values: PublicationExternDatabaseIdEntity, dirty: boolean) => {
                handleEntityNewItem(values, dirty, setExternDatabaseIds)
            },
            onItemDelete: (key: number) => { handleDeleteItem(key, setExternDatabaseIds) },
            onExistItemUpdate: (key: number, values: PublicationExternDatabaseIdEntity) => {
                handleEntityItemUpdate(key, values, setExternDatabaseIds)
            }
        },
        {
            title: t("publicationActivity"),
            formName: "new-activity",
            newItemFormSchema: newPublicationActivitySchema,
            existItemFormSchema: newPublicationActivitySchema,
            items: publicationActivities,
            onNewItemSubmit: (values: PublicationActivityEntity, dirty: boolean) => {
                handleEntityNewItem(values, dirty, setPublicationActivites)
            },
            onItemDelete: (key: number) => handleDeleteItem(key, setIdentifiers),
            onExistItemUpdate: (key: number, values: PublicationActivityEntity) => {
                handleEntityItemUpdate(key, values, setPublicationActivites)
            }
        },
    ]

    const handleSubmitForm = (values: any) => {
        // setIsProcessing(true);
        // const clearedNames = clearValues(personNames).filter(x => Object.keys(x).length);
        // const clearedExtIds = clearValues(personExternDbIds).filter(x => Object.keys(x).length);
        // let objectToCreate: CreatePersonWithDetailsCommand = {
        //     names: clearedNames,
        //     externDatabaseIds: clearedExtIds
        // };
        // objectToCreate = Object.assign(objectToCreate, clearObject(values))

        // createPerson(objectToCreate, {
        //     headers: { 'Content-type': 'application/json' }
        // })
        //     .then((response) => {
        //         const newId = response.data.id;
        //         setIsProcessing(false);
        //         navigate(ROUTES.personDetails.replace(":id", newId));
        //     })
        //     .catch((err) => {
        //         setIsProcessing(false);
        //         console.error(err);
        //     });
    }


    return (
        <CRUDItemPageBase
            title={`${t('newShe')} ${t('publication').toLowerCase()}`}
            wholeFormId={baseFormName}
            isProcessing={isProcessing}
        >
            <ItemDataSection title={`${t("basic")} ${t('informations').toLowerCase()}`}>
                <SubmitResetForm
                    onSubmit={handleSubmitForm}
                    fields={publicationBasicInfoSchema}
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
                    newItemFormSchema={newPublicationAuthorSchema}
                    onNewItemSubmit={(values: AuthorFormValues, dirty: boolean) =>
                        handleEntityNewItem(values, dirty, setAuthors)
                    }
                    onItemDelete={(key: number) => handleDeleteItem(key, setAuthors)}
                    onExistItemUpdate={(key: number, values: AuthorFormValues) => {
                        handleEntityItemUpdate(key, values, setAuthors)
                    }}
                />
            </ItemDataSection>
            <ItemDataSection title={t("relatedPublication")}>
                <NewRelatedPublicationWithExistingForm
                    relatedPublications={relatedPublications}
                    newItemFormSchema={newRelatedPublicationSchema}
                    onNewItemSubmit={(values: RelatedPublicationFormValues, dirty: boolean) =>
                        handleEntityNewItem(values, dirty, setRelatedPublications)
                    }
                    onItemDelete={(key: number) => handleDeleteItem(key, setRelatedPublications)}
                    onExistItemUpdate={(key: number, values: RelatedPublicationFormValues) => {
                        handleEntityItemUpdate(key, values, setRelatedPublications)
                    }}
                />
            </ItemDataSection>
        </CRUDItemPageBase>
    )
}

export default PublicationCreate