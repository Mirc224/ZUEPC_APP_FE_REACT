import { Card, CardActionArea, CardContent, CardHeader } from '@mui/material'
import routes from '../../endpoints/routes.endpoints';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PublicationPreviewEntity } from '../../types/publications/entities.types';

type Props = {
    publication: PublicationPreviewEntity
}

const PublicationPreview = (props: Props) => {
    const { t } = useTranslation();
    const { publication } = props;
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(routes.personDetails.replace(":id", publication.id ? publication.id.toString() : "-1"));
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

    const PublicationNameAlternatives = (): ReactElement => {
        const names = publication.names;
        let nameAlternatives = names && names.length > 1
            ? names.slice(1).map(x => (x.name ? x.name : "")).join(' / ') : "";
        return nameAlternatives ?
            <p><strong>{t('alternativeHe')} {t('name').toLowerCase()}:</strong> {nameAlternatives}</p>
            : <></>;
    }
    // const PersonNameAlternatives = (): ReactElement => {
    //     const names = publication.names;
    //     let nameAlternatives = names && names.length > 1
    //         ? names.slice(1).map(x => (x.firstName ? x.firstName : "") +
    //             (x.lastName ? " " + x.lastName : "")).join(', ') : "";
    //     return nameAlternatives ?
    //         <p>
    //             <strong>{t('alternativeObject')} {t('firstName').toLowerCase() + "/" + t('lastName').toLowerCase()}:</strong> {nameAlternatives}
    //         </p>
    //         : <></>;
    // }

    // const PersonExternDatabaseIds = (): ReactElement => {
    //     const externDatabaseIds = publication.externDatabaseIds;
    //     let externDbIdsString = externDatabaseIds && externDatabaseIds.length > 0 ? externDatabaseIds.map(x => x.externIdentifierValue).join(', ') : "";
    //     return externDbIdsString ?
    //         <p><strong>{t('externDatabaseIds')}:</strong> {externDbIdsString}</p> : <></>;
    // }

    return (
        <Card >
            <CardActionArea onClick={handleCardClick}>
                <CardHeader
                    title={PublicationTitle()}
                    subheader={
                    <div>
                        {PublishYear()}
                        {DocumentType()}
                    </div>}
                />
                <CardContent>
                    {PublicationNameAlternatives()}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default PublicationPreview