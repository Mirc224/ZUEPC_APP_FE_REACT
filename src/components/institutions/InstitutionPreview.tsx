import { Card, CardActionArea, CardContent, CardHeader } from '@mui/material'
import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import routes from '../../endpoints/routes.endpoints'
import { InstitutionPreviewEntity } from '../../types/institutions/entities.types'

type Props = {
    institution: InstitutionPreviewEntity
}

const InstitutionPreview = (props: Props) => {
    const { t } = useTranslation();
    const { institution } = props;
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(routes.institutionDetails.replace(":id", institution.id ? institution.id.toString() : "-1"));
    }

    const InstitutionTitle = (): string => {
        let title = (institution.id ? institution.id.toString() : t('unknown')) + "|";
        let namePart = institution.names && institution.names.length > 0 ?
            (institution.names[0].name ? institution.names[0].name : "") 
            : t('unknown');
        title += " " + namePart;

        return title;
    }

    const InstitutionType = (): ReactElement => {
        return institution.institutionType ? 
        <p><strong>{t('institutionType')}:</strong> {institution.institutionType}</p> 
        : <></>;
    }

    const InstitutionLevel = (): ReactElement => {
        return institution.level ?
            <p><strong>{t('institutionLevel')}:</strong> {institution.level}</p>
            : <></>;
    }

    const InstitutionNameAlternatives = (): ReactElement => {
        const names = institution.names;
        let nameAlternatives = names && names.length > 1
            ? names.slice(1).map(x => (x.name ? x.name + "/" +x.nameType : "")).join(', ') : "";
        return nameAlternatives ?
            <p><strong>{t('alternativeObject')} {t('name').toLowerCase()}:</strong> {nameAlternatives}</p> 
            : <></>;
    }

    const InstitutionExternDatabaseIds = (): ReactElement => {
        const externDatabaseIds = institution.externDatabaseIds;
        let externDbIdsString = externDatabaseIds && externDatabaseIds.length > 0 ? externDatabaseIds.map(x => x.externIdentifierValue).join(', ') : "";
        return externDbIdsString ?
            <p><strong>{t('externDatabaseIds')}:</strong> {externDbIdsString}</p> : <></>;
    }

    return (
        <Card >
            <CardActionArea onClick={handleCardClick}>
                <CardHeader
                    title={InstitutionTitle()}
                    subheader={
                    <div>
                        {InstitutionLevel()}
                        {InstitutionType()}
                    </div>}
                />
                <CardContent>
                    {InstitutionNameAlternatives()}
                    {InstitutionExternDatabaseIds()}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default InstitutionPreview