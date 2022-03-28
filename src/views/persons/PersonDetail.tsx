import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import DeleteDialog from '../../components/dialog/DeleteDialog';
import ItemDataSection from '../../components/ItemDataSection';
import ItemPageHeader from '../../components/ItemPageHeader';
import LoadingScreen from '../../components/LoadingScreen';
import routes from '../../endpoints/routes.endpoints';
import usePersonService from '../../hooks/persons/usePersonService';
import { PersonDetailsEntity, PersonNameEntity } from '../../types/persons/entities.types';

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

    const handleOnClickEdit = () => {
        navigate(routes.personEdit.replace(":id", person.id.toString()));
    }

    const handleOnClickDelete = () => {
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

    const handleClose = () => {
        setOpen(false);
    };

    const formatPersonName = (name: PersonNameEntity): string => {
        const formatedName =
            (name.firstName ? name.firstName : "") +
            (name.lastName ? " " + name.lastName : "");
        return formatedName ? formatedName + (name.nameType ? " | " + name.nameType : "") : t('unknown')
    }
    return (
        <article>
            {isLoading || person === undefined
                ?
                <LoadingScreen isLoading={isLoading} />
                :
                <Container>
                    <ItemPageHeader
                        title={`${t('person')} (${person.id})`}
                        onClickEdit={handleOnClickEdit}
                        onClickDelete={handleOnClickDelete}
                    />
                    <main>
                        <ItemDataSection title={`${t("basic")} ${t('informations').toLowerCase()}`} >
                            {person.birthYear &&
                                <Typography component="p" variant="body2">
                                    <strong>{t('birthYear')}:</strong> {person.birthYear}
                                </Typography>}
                            {person.deathYear &&
                                <Typography component="p" variant="body2">
                                    <strong>{t('deathYear')}:</strong> {person.deathYear}
                                </Typography>}
                        </ItemDataSection>
                        <ItemDataSection title={t("name")}>
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
                    </main>
                </Container>}
            <DeleteDialog
                fullScreen={fullScreen}
                open={open}
                dialogTitle={`${t('delete')}  ${t('person')} (${id})`}
                onClose={handleClose}
                onConfirmation={handleConfirmDelete} />
        </article>
    )
}

export default PersonDetail