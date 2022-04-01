import { dividerClasses, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import AutocompleteSearchWithPreview from '../../components/itemPage/AutocompleteSearchWithPreview';
import PublicationCreateEditBase from '../../components/publications/PublicationCreateEditBase';
import ROUTES from '../../endpoints/routes.endpoints';
import { publicationBasicInfoSchema } from '../../form-schemas/publication.schema';
import { conversionHelper } from '../../helpers/conversion.helper';
import usePersonService from '../../hooks/persons/usePersonService';
import usePublicationService from '../../hooks/publications/usePublicationService';
import { AuthorFormValues, ChangeableItem, FormikFieldSchema, RelatedPublicationFormValues, SearchFieldSchema } from '../../types/common/component.types';
import { PersonNameEntity } from '../../types/persons/entities.types';
import { UpdatePublicationWithDetailsCommand } from '../../types/publications/commands.types';
import { PublicationActivityEntity, PublicationAuthorEntity, PublicationDetailsEntity, PublicationExternDatabaseIdEntity, PublicationIdentifierEntity, PublicationNameEntity, RelatedPublicationEntity } from '../../types/publications/entities.types';
import { clearChangeableItemValues, clearObject } from '../../utils/objects-utils';
import { handleDeleteItem, handleExistingEntityItemUpdate, handleExistingEntityNewItem, sortItemsToInserToUpdateToDelete } from '../../utils/zuepc-item-utils';

type Props = {}

const PublicationEdit = (props: Props) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { updatePublication, getPublicationDetails } = usePublicationService();
    const {  getPersonNames } = usePersonService();
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [publication, setPublication] = useState<PublicationDetailsEntity>(undefined!);
    const [names, setNames] = useState<ChangeableItem<PublicationNameEntity>[]>([])
    const [identifiers, setIdentifiers] = useState<ChangeableItem<PublicationIdentifierEntity>[]>([])
    const [externDatabaseIds, setExternDatabaseIds] = useState<ChangeableItem<PublicationExternDatabaseIdEntity>[]>([])
    const [publicationActivities, setPublicationActivites] = useState<ChangeableItem<PublicationActivityEntity>[]>([])
    const [authors, setAuthors] = useState<ChangeableItem<AuthorFormValues>[]>([])
    const [relatedPublications, setRelatedPublications] = useState<ChangeableItem<RelatedPublicationFormValues>[]>([])
    const [basicInfoSchema, setBasicInfoSchema] = useState<FormikFieldSchema[]>([])

    const [tmp, setTmp] = useState([1, 2, 3]);

    const navigate = useNavigate();
    const _isMounted = useRef(true);

    useEffect(() => {
        return () => {
            _isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        if (id !== undefined) {
            setIsLoading(true);
            getPublicationDetails(id, {
                signal: controller.signal
            })
                .then((response) => {
                    const resPublication: PublicationDetailsEntity = response.data;
                    const basicInfoSchema = publicationBasicInfoSchema;

                    if (isMounted) {

                        setPublication(resPublication);
                        setBasicInfoSchema([
                            ...basicInfoSchema.map(x => {
                                const initValue = resPublication[x.name as keyof PublicationDetailsEntity]
                                return { ...x, initValue: initValue ? initValue : "" }
                            })
                        ])
                        resPublication.names && setNames([
                            ...resPublication.names.map((x): ChangeableItem<PublicationNameEntity> => {
                                return { item: x, changed: false }
                            })
                        ])

                        resPublication.identifiers && setIdentifiers([
                            ...resPublication.identifiers.map((x): ChangeableItem<PublicationIdentifierEntity> => {
                                return { item: x, changed: false }
                            })
                        ])
                        resPublication.externDatabaseIds && setExternDatabaseIds([
                            ...resPublication.externDatabaseIds.map((x): ChangeableItem<PublicationExternDatabaseIdEntity> => { return { item: x, changed: false } })
                        ])

                        resPublication.publicationActivities && setPublicationActivites([
                            ...resPublication.publicationActivities.map((x): ChangeableItem<PublicationActivityEntity> => { return { item: x, changed: false } })
                        ])
                        resPublication.authors && setAuthors([
                            ...resPublication.authors.map((x): ChangeableItem<AuthorFormValues> => {
                                return {
                                    item: conversionHelper.publicationAuthorDetailsEntityToAuthorFormValues(x), changed: false
                                }
                            })
                        ])
                        resPublication.relatedPublications && setRelatedPublications([
                            ...resPublication.relatedPublications.map((x): ChangeableItem<RelatedPublicationFormValues> => {
                                return {
                                    item: conversionHelper.relatedPublicationDetailsEntityToRelatedPublicationFormValues(x), changed: false
                                }
                            })
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
        const convertedToAuthorEntity = authors.map<ChangeableItem<PublicationAuthorEntity>>(x => {
            return {
                item: conversionHelper.authorFormValuesToPublicationAuthorEntity(x.item),
                changed: x.changed
            }
        })
        const convertedToRelatedPubEntity = relatedPublications.map<ChangeableItem<RelatedPublicationEntity>>(x => {
            return {
                item: conversionHelper.relatedPublicationFormValuesToRelatedPublicationEntity(x.item),
                changed: x.changed
            }
        })
        const clearedNames = clearChangeableItemValues(names);
        const clearedIdentifiers = clearChangeableItemValues(identifiers);
        const clearedExtIds = clearChangeableItemValues(externDatabaseIds);
        const clearedPublicationActivities = clearChangeableItemValues(publicationActivities);
        const clearedAuthors = clearChangeableItemValues(convertedToAuthorEntity);
        const clearedRelPub = clearChangeableItemValues(convertedToRelatedPubEntity);

        const origPublicationAuthorsEnt = publication.authors
            ? publication.authors.map(x => conversionHelper.publicationAuthorDetailsEntityToPublicationAuthorEntity(x))
            : [];

        const origRelPubEnt = publication.relatedPublications
            ? publication.relatedPublications.map(x => conversionHelper.relatedPublicationDetailsEntityToRelatedPublicationEntity(x))
            : [];


        const [namesToInsert, namesToUpdate, namesToDelete] =
            sortItemsToInserToUpdateToDelete(publication.names ? publication.names : [], clearedNames);
        const [identifiersToInsert, identifiersToUpdate, identifiersToDelete] =
            sortItemsToInserToUpdateToDelete(publication.identifiers ? publication.identifiers : [], clearedIdentifiers);
        const [externDatabaseIdsToInsert, externDatabaseIdsToUpdate, externDatabaseIdsToDelete] =
            sortItemsToInserToUpdateToDelete(publication.externDatabaseIds ? publication.externDatabaseIds : [], clearedExtIds);
        const [publicationActivitiesToInsert, publicationActivitiesToUpdate, publicationActivitiesToDelete] =
            sortItemsToInserToUpdateToDelete(publication.publicationActivities ? publication.publicationActivities : [], clearedPublicationActivities);
        const [authorsToInsert, authorsToUpdate, authorsToDelete] =
            sortItemsToInserToUpdateToDelete(origPublicationAuthorsEnt ? origPublicationAuthorsEnt : [], clearedAuthors);
        const [relatedPubToInsert, relatedPubToUpdate, relatedPubToDelete] =
            sortItemsToInserToUpdateToDelete(origRelPubEnt ? origRelPubEnt : [], clearedRelPub);


        let objectToUpdate: UpdatePublicationWithDetailsCommand = {
            id: publication.id,
            namesToInsert: namesToInsert,
            namesToUpdate: namesToUpdate,
            namesToDelete: namesToDelete,
            identifiersToInsert: identifiersToInsert,
            identifiersToUpdate: identifiersToUpdate,
            identifiersToDelete: identifiersToDelete,
            externDatabaseIdsToInsert: externDatabaseIdsToInsert,
            externDatabaseIdsToUpdate: externDatabaseIdsToUpdate,
            externDatabaseIdsToDelete: externDatabaseIdsToDelete,
            publicationActivitiesToInsert: publicationActivitiesToInsert,
            publicationActivitiesToUpdate: publicationActivitiesToUpdate,
            publicationActivitiesToDelete: publicationActivitiesToDelete,
            authorsToInsert: authorsToInsert,
            authorsToUpdate: authorsToUpdate,
            authorsToDelete: authorsToDelete,
            relatedPublicationsToInsert: relatedPubToInsert,
            relatedPublicationsToUpdate: relatedPubToUpdate,
            relatedPublicationsToDelete: relatedPubToDelete,
        };
        objectToUpdate = Object.assign(objectToUpdate, clearObject(values))

        updatePublication(objectToUpdate, {
            headers: { 'Content-type': 'application/json' }
        })
            .then((response) => {
                setIsProcessing(false);
                navigate(ROUTES.publicationDetails.replace(":id", id ? id : "-1"));
            })
            .catch((err) => {
                console.error(err);
                setIsProcessing(false);
            });
    }

    return (
        < PublicationCreateEditBase
            title={`${t('editPage')}: ${t('publication')}(${id})`}
            handleDeleteItem={handleDeleteItem}
            handleNewItem={handleExistingEntityNewItem}
            handleUpdateItem={handleExistingEntityItemUpdate}
            onSubmit={handleSubmitForm}
            isProcessing={isProcessing}
            isLoading={isLoading}
            basicInfoSchema={basicInfoSchema}
            names={names.map(x => x.item)}
            setNames={setNames}
            identifiers={identifiers.map(x => x.item)}
            setIdentifiers={setIdentifiers}
            externDatabaseIds={externDatabaseIds.map(x => x.item)}
            setExternDatabaseIds={setExternDatabaseIds}
            publicationActivities={publicationActivities.map(x => x.item)}
            setPublicationActivites={setPublicationActivites}
            authors={authors.map(x => x.item)}
            setAuthors={setAuthors}
            relatedPublications={relatedPublications.map(x => x.item)}
            setRelatedPublications={setRelatedPublications}
        />)
}

export default PublicationEdit