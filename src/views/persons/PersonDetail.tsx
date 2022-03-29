import { Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import ItemDataSection from '../../components/itemPage/ItemDataSection';
import routes from '../../endpoints/routes.endpoints';
import usePersonService from '../../hooks/persons/usePersonService';
import { PersonDetailsEntity, PersonNameEntity } from '../../types/persons/entities.types';
import ItemDetailPageBase from '../../components/itemPage/ItemDetailPageBase';
type Props = {}

const PersonDetail = (props: Props) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const { getPersonDetails, deletePerson } = usePersonService();
    const [isLoading, setIsLoading] = useState(false);
    const [person, setPerson] = useState<PersonDetailsEntity>(undefined!);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        if (id !== undefined) {
            setIsLoading(true);
            getPersonDetails(id, {
                signal: controller.signal
            })
                .then((response) => {
                    isMounted && setPerson(response.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const handleClickEdit = () => {
        navigate(routes.personEdit.replace(":id", person.id ? person.id.toString() : "-1"));
    }

    const handleClickDelete = () => {
        setOpen(true);
    }

    const handleConfirmDelete = () => {
        setOpen(false);
        if (id !== undefined) {
            deletePerson(id, {
                headers: { 'Content-type': 'application/json' }
            })
                .then((response) => {
                    navigate(routes.persons);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const formatPersonName = (name: PersonNameEntity): string => {
        const formatedName =
            (name.firstName ? name.firstName : "") +
            (name.lastName ? " " + name.lastName : "");
        return formatedName ? formatedName + (name.nameType ? " | " + name.nameType : "") : t('unknown')
    }
    return (
        <ItemDetailPageBase
            isLoading={isLoading}
            title={`${t('person')} (${id})`}
            dialogFullScreen={fullScreen}
            dialogIsOpen={open}
            dialogTitle={`${t('delete')}  ${t('person')} (${id})`}
            onClickEdit={handleClickEdit}
            onClickDelete={handleClickDelete}
            onDialogClose={handleDialogClose}
            onDialogConfirm={handleConfirmDelete}
        >
            {person &&
                <>
                    <ItemDataSection title={`${t("basic")} ${t('informations').toLowerCase()}`} >
                        {(person.birthYear || person.birthYear === 0) &&
                            <Typography component="p" variant="body2">
                                <strong>{t('birthYear')}:</strong> {person.birthYear}
                            </Typography>}
                        {(person.deathYear || person.deathYear === 0) &&
                            <Typography component="p" variant="body2">
                                <strong>{t('deathYear')}:</strong> {person.deathYear}
                            </Typography>}
                    </ItemDataSection>
                    <ItemDataSection title={`${t("firstName")}/${t("lastName")}`}>
                        {person.names &&
                            <ul>
                                {person.names.map((x, i) =>
                                    <li key={i}>
                                        <Typography component="p" variant="body2">
                                            {formatPersonName(x)}
                                        </Typography>
                                    </li>
                                )}
                            </ul>}
                    </ItemDataSection>
                    <ItemDataSection title={t("externDatabaseIds")}>
                        {person.externDatabaseIds &&
                            <ul>
                                {person.externDatabaseIds.map((x, i) =>
                                    <li key={i}>
                                        <Typography component="p" variant="body2">
                                            {x.externIdentifierValue}
                                        </Typography>
                                    </li>
                                )}
                            </ul>}
                    </ItemDataSection>
                </>}
        </ItemDetailPageBase>
    )
}

export default PersonDetail