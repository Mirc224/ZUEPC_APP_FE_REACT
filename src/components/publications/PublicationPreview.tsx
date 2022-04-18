import ROUTES from '../../endpoints/routes.endpoints';
import { ReactElement, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PublicationPreviewEntity } from '../../types/publications/entities.types';
import ItemCardPreviewBase from '../itemPage/ItemCardPreviewBase';
import { itemformatHelper } from '../../helpers/itemformat.helper';

type Props = {
    publication: PublicationPreviewEntity
}

const PublicationPreview = (props: Props) => {
    const { t } = useTranslation();
    const { publication } = props;
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(ROUTES.publicationDetails.replace(":id", publication.id ? publication.id.toString() : "-1"));
    }

    const PublicationTitle = (): string => {
        let title = (publication.id ? publication.id.toString() : t('unknown')) + "|";
        let namePart = publication.names && publication.names.length > 0 ?
            (publication.names[0].name ? publication.names[0].name : "") : t('unknown');
        title += " " + namePart;
        return title;
    }

    const PublishYear = (): ReactElement => {
        return publication.publishYear ?
            <p><strong>{t('publishYear')}:</strong> {publication.publishYear}</p>
            : <></>;
    }

    const DocumentType = (): ReactElement => {
        return publication.documentType ?
            <p><strong>{t('documentType')}:</strong> {publication.documentType}</p>
            : <></>;
    }

    const PublicationNameAlternative = (): ReactElement => {
        let counter = 0;
        const names = publication.names
            .filter(x => x)
            .slice(1)
            .map<ReactNode>(x => <span key={counter++}>{x.name}</span>);
        let nameAlternatives = names.length > 1
            ? names
                .reduce((prev, curr) => {
                    const delimeter = <strong key={counter++}> / </strong>
                    return [prev, delimeter, curr];
                }) : names;
        return names.length > 0 ?
            <p>
                <strong>{t('alternativeHe')} {t('name').toLowerCase()}: </strong>
                {nameAlternatives}
            </p>
            : <></>;
    }

    const PublicationAuthorPersons = (): ReactElement => {
        let counter = 0;
        const authors = publication.authors
            .map<ReactNode>(x => {
                const person = x.personPreview;
                const names = person ? person.names : undefined;
                let authorName = names && names.length > 0
                    ? names[0].firstName + " " + names[0].lastName : "";
                authorName = authorName.trim();
                return <span key={counter++}>{authorName}({x.personPreview?.id})</span>
            });
        const finalAuthors = authors.length > 0
            ? authors
                .reduce((prev, curr) => {
                    const delimeter = <strong key={counter++}> / </strong>
                    return [prev, delimeter, curr];
                }) : authors;
        return authors.length > 0 ?
            <p>
                <strong>{t('author')}: </strong>
                {finalAuthors}
            </p>
            : <></>;
    }

    const PublicationAuthorInstitutions = (): ReactElement => {
        let counter = 0;
        const authors = publication.authors
            .map<ReactNode>(x => {
                const institution = x.institutionPreview;
                const names = institution ? institution.names : undefined;
                let institutionName = names && names.length > 0 ? names[0].name ? names[0].name : "" : "";
                institutionName = institutionName.trim();
                return <span key={counter++}>{institutionName}({x.institutionPreview?.id})</span>
            });
        const finalInstitutions = authors.length > 0
            ? authors
                .reduce((prev, curr) => {
                    const delimeter = <strong key={counter++}> / </strong>
                    return [prev, delimeter, curr];
                }) : authors;
        return authors.length > 0 ?
            <p>
                <strong>{t('affiliatedInstitution')}: </strong>
                {finalInstitutions}
            </p>
            : <></>;
    }

    const PublicationIdentifier = (): ReactElement => {
        let counter = 0;
        const identifiers = publication.identifiers
            .map<ReactNode>(x => {
                let formatedIdentifier = x.identifierName ? x.identifierName + ":" : "";
                formatedIdentifier += x.identifierValue ? x.identifierValue : "";
                formatedIdentifier += x.iSForm ? ` (${x.iSForm})` : "";
                return <span key={counter++}>{formatedIdentifier}</span>
            });
        const finalIdentifiers = identifiers.length > 0
            ? identifiers
                .reduce((prev, curr) => {
                    const delimeter = <strong key={counter++}> / </strong>
                    return [prev, delimeter, curr];
                }) : identifiers;
        return identifiers.length > 0 ?
            <p>
                <strong>{t('publicationIdentifier')}: </strong>
                {finalIdentifiers}
            </p>
            : <></>;
    }

    const PublicationExternDbIds = (): ReactElement => {
        return itemformatHelper.formatExternDatabaseIds(publication.externDatabaseIds, t);
    }

    const PublicationActivites = (): ReactElement => {
        let counter = 0;
        if(!publication.publicationActivities) {
            return <></>;
        }
        const activities = publication.publicationActivities
            .map<ReactNode>(x => {
                let resultActivity = []
                if(x.category){
                    resultActivity.push(x.category);
                }
                if (x.activityYear) {
                    resultActivity.push(x.activityYear);
                }
                if (x.governmentGrant) {
                    resultActivity.push(x.governmentGrant);
                }
                return <span key={counter++}>[{resultActivity.length > 0 ? resultActivity.join("/") : ""}]</span>
            });
        const finalActivities = activities.length > 0
            ? activities
                .reduce((prev, curr) => {
                    const delimeter = <strong key={counter++}> / </strong>
                    return [prev, delimeter, curr];
                }) : activities;
        return activities.length > 0 ?
            <p>
                <strong>{t('publicationActivity')}: </strong>
                {finalActivities}
            </p>
            : <></>;
    }

    return (
        <ItemCardPreviewBase
            title={PublicationTitle()}
            subheader={
                <div>
                    {PublishYear()}
                    {DocumentType()}
                </div>}
            onClick={handleCardClick}
        >
            {PublicationNameAlternative()}
            {PublicationAuthorPersons()}
            {PublicationAuthorInstitutions()}
            {PublicationIdentifier()}
            {PublicationExternDbIds()}
            {PublicationActivites()}
        </ItemCardPreviewBase>
    )
}

export default PublicationPreview