import { Card, CardActionArea, CardContent, CardHeader } from '@mui/material'
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

    const PublicationAuthor = (): ReactElement => {
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
            {PublicationAuthor()}
            {PublicationIdentifier()}
            {PublicationExternDbIds()}
        </ItemCardPreviewBase>
    )
}

export default PublicationPreview