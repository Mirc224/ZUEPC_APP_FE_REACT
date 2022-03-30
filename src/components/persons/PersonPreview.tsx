import { Card, CardActionArea, CardContent, CardHeader } from '@mui/material'
import ROUTES from '../../endpoints/routes.endpoints';
import { ReactElement, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PersonPreviewEntity } from '../../types/persons/entities.types';
import ItemCardPreviewBase from '../itemPage/ItemCardPreviewBase';
import { itemformatHelper } from '../../helpers/itemformat.helper';

type Props = {
    person: PersonPreviewEntity
}

const PersonPreview = (props: Props) => {
    const { t } = useTranslation();
    const { person } = props;
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(ROUTES.personDetails.replace(":id", person.id ? person.id.toString() : "-1"));
    }

    const PersonTitle = (): string => {
        let title = (person.id ? person.id.toString() : t('unknown')) + "|";
        let namePart = person.names && person.names.length > 0 ?
            (person.names[0].firstName ? person.names[0].firstName : "") +
            (person.names[0].lastName ? " " + person.names[0].lastName : "")
            : t('unknown');
        title += " " + namePart;

        return title;
    }

    const PersonYears = (): string => {
        let birthPart = person.birthYear ? (person.birthYear.toString() + "-" + (person.deathYear ? person.deathYear.toString() : "")) : "";
        birthPart = birthPart ? ` (${birthPart})` : "";
        return birthPart;
    }

    const PersonNameAlternatives = (): ReactElement => {
        const names = person.names;
        let nameAlternatives = names && names.length > 1
            ? names.slice(1).map(x => (x.firstName ? x.firstName : "") +
                (x.lastName ? " " + x.lastName : "")).join(', ') : "";
        return nameAlternatives ?
            <p>
                <strong>{t('alternativeIt')} {t('firstName').toLowerCase() + "/" + t('lastName').toLowerCase()}:</strong> {nameAlternatives}
            </p>
            : <></>;
    }

    const PersonExternDatabaseIds = (): ReactElement => {
        return itemformatHelper.formatExternDatabaseIds(person.externDatabaseIds, t);
    }


    return (
        <ItemCardPreviewBase
            title={PersonTitle()}
            subheader={PersonYears()}
            onClick={handleCardClick}
        >
            {PersonNameAlternatives()}
            {PersonExternDatabaseIds()}
        </ItemCardPreviewBase>
    )
}

export default PersonPreview