import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthorFormValues, RelatedPublicationFormValues } from '../../types/common/component.types';
import { PublicationActivityEntity, PublicationExternDatabaseIdEntity, PublicationIdentifierEntity, PublicationNameEntity } from '../../types/publications/entities.types';
import { clearObject, clearValues } from '../../utils/objects-utils';
import { CreatePublicationWithDetailsCommand } from '../../types/publications/commands.types';
import usePublicationService from '../../hooks/publications/usePublicationService';
import ROUTES from '../../endpoints/routes.endpoints';
import { useNavigate } from 'react-router';
import { conversionHelper } from '../../helpers/conversion.helper';
import PublicationCreateEditBase from '../../components/publications/PublicationCreateEditBase';
import { handleDeleteItem, handleEntityItemUpdate, handleEntityNewItem } from '../../utils/zuepc-item-utils';

type Props = {

}
const PublicationCreate = (props: Props) => {
    const {t} = useTranslation();
    const { createPublication } = usePublicationService();
    const [isProcessing, setIsProcessing] = useState(false);
    const [names, setNames] = useState<PublicationNameEntity[]>([])
    const [identifiers, setIdentifiers] = useState<PublicationIdentifierEntity[]>([])
    const [externDatabaseIds, setExternDatabaseIds] = useState<PublicationExternDatabaseIdEntity[]>([])
    const [publicationActivities, setPublicationActivites] = useState<PublicationActivityEntity[]>([])
    const [authors, setAuthors] = useState<AuthorFormValues[]>([])
    const [relatedPublications, setRelatedPublications] = useState<RelatedPublicationFormValues[]>([])

    const navigate = useNavigate();

    const handleSubmitForm = (values: any) => {
        setIsProcessing(true);
        const clearedAuthors = clearValues(authors
            .map(x => conversionHelper.authorFormValuesToPublicationAuthorEntity(x)))
            .filter(x => Object.keys(x).length);
        const clearedRelatedPub = clearValues(relatedPublications
            .map(x => conversionHelper.relatedPublicationFormValuesToRelatedPublicationEntity(x)))
            .filter(x => Object.keys(x).length);
        const clearedNames = clearValues(names).filter(x => Object.keys(x).length);
        const clearedIdentifiers = clearValues(identifiers).filter(x => Object.keys(x).length);
        const clearedActivities = clearValues(publicationActivities).filter(x => Object.keys(x).length);
        const clearedExtIds = clearValues(externDatabaseIds).filter(x => Object.keys(x).length);

        let objectToCreate: CreatePublicationWithDetailsCommand = {
            names: clearedNames,
            externDatabaseIds: clearedExtIds,
            identifiers: clearedIdentifiers,
            publicationActivities: clearedActivities,
            authors: clearedAuthors,
            relatedPublications: clearedRelatedPub
        };
        objectToCreate = Object.assign(objectToCreate, clearObject(values))
        createPublication(objectToCreate, {
            headers: { 'Content-type': 'application/json' }
        })
            .then((response) => {
                const newId = response.data.id;
                setIsProcessing(false);
                navigate(ROUTES.publicationDetails.replace(":id", newId));
            })
            .catch((err) => {
                setIsProcessing(false);
                console.error(err);
            });
    }


    return (
        <PublicationCreateEditBase
            title={`${t('newShe')} ${t('publication').toLowerCase()}`}
            handleDeleteItem={handleDeleteItem}
            handleNewItem={handleEntityNewItem}
            handleUpdateItem={handleEntityItemUpdate}
            onSubmit={handleSubmitForm}
            isProcessing={isProcessing}
            names={names}
            setNames={setNames}
            identifiers={identifiers}
            setIdentifiers={setIdentifiers}
            externDatabaseIds={externDatabaseIds}
            setExternDatabaseIds={setExternDatabaseIds}
            publicationActivities={publicationActivities}
            setPublicationActivites={setPublicationActivites}
            authors={authors}
            setAuthors={setAuthors}
            relatedPublications={relatedPublications}
            setRelatedPublications={setRelatedPublications}
        />
    )
}

export default PublicationCreate