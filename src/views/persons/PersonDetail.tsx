import ROUTES from '../../endpoints/routes.endpoints';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import ItemDataSection from '../../components/itemPage/ItemDataSection';
import usePersonService from '../../hooks/persons/usePersonService';
import { PersonDetailsEntity, PersonNameEntity } from '../../types/persons/entities.types';
import ItemDetailPageBase from '../../components/itemPage/ItemDetailPageBase';
import ItemCardPreviewBase from '../../components/itemPage/ItemCardPreviewBase';
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
    }, [id])

    const handleClickEdit = () => {
        navigate(ROUTES.personEdit.replace(":id", person.id ? person.id.toString() : "-1"));
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
                    navigate(ROUTES.persons);
                })
                .catch((err) => {
                    if (err.response.status === 404) {
                        navigate(ROUTES.notFound);
                        return;
                    }
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
                            <Grid container spacing={2} direction="column">
                                {person.names.map((x, i) =>
                                    <Grid item key={i} xs>
                                        <ItemCardPreviewBase
                                            title={
                                                <Typography component="p" variant="body2">
                                                    {formatPersonName(x)}
                                                </Typography>} />
                                    </Grid>
                                )}
                            </Grid>}
                    </ItemDataSection>
                    <ItemDataSection title={t("externDatabaseIds")}>
                        {person.externDatabaseIds &&
                            <Grid container spacing={2} direction="column">
                                {person.externDatabaseIds.map((x, i) =>
                                    <Grid item key={i} xs>
                                        <ItemCardPreviewBase
                                            title={
                                                <Typography component="p" variant="body2">
                                                    {x.externIdentifierValue}
                                                </Typography>} />
                                    </Grid>
                                )}
                            </Grid>}
                    </ItemDataSection>
                </>}
        </ItemDetailPageBase>
    )
}

export default PersonDetail