import { Card, CardActionArea, CardContent, CardHeader } from '@mui/material'
import React, { ReactElement, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import ROUTES from '../../endpoints/routes.endpoints'
import { itemformatHelper } from '../../helpers/itemformat.helper'
import { InstitutionPreviewEntity } from '../../types/institutions/entities.types'
import ItemCardPreviewBase from '../itemPage/ItemCardPreviewBase'

type Props = {
    institution: InstitutionPreviewEntity
}

const InstitutionPreview = (props: Props) => {
    const { t } = useTranslation();
    const { institution } = props;
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(ROUTES.institutionDetails.replace(":id", institution.id ? institution.id.toString() : "-1"));
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
            ? names.slice(1).map(x => (x.name ? x.name + "/" + x.nameType : "")).join(', ') : "";
        return nameAlternatives ?
            <p><strong>{t('alternativeHe')} {t('name').toLowerCase()}:</strong> {nameAlternatives}</p>
            : <></>;
    }

    const InstitutionExternDatabaseIds = (): ReactElement => {
        return itemformatHelper.formatExternDatabaseIds(institution.externDatabaseIds, t);
    }

    return (
        <ItemCardPreviewBase
            title={InstitutionTitle()}
            subheader={
                <div>
                    {InstitutionLevel()}
                    {InstitutionType()}
                </div>}
            onClick={handleCardClick}>
            {InstitutionNameAlternatives()}
            {InstitutionExternDatabaseIds()}
        </ItemCardPreviewBase>
    )
}

export default InstitutionPreview