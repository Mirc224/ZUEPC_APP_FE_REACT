import ROUTES from '../../endpoints/routes.endpoints';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import ItemDetailPageBase from '../../components/itemPage/ItemDetailPageBase';
import useInstitutionService from '../../hooks/institutions/useInstitutionService';
import { InstitutionDetailsEntity, InstitutionNameEntity } from '../../types/institutions/entities.types';
import ItemDataSection from "../../components/itemPage/ItemDataSection";
import ItemCardPreviewBase from '../../components/itemPage/ItemCardPreviewBase';

type Props = {}

const InstitutionDetail = (props: Props) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const { getInstitutionDetails, deleteInstitution } = useInstitutionService();
    const [isLoading, setIsLoading] = useState(false);
    const [institution, setInstitution] = useState<InstitutionDetailsEntity>(undefined!);
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        if (id !== undefined) {
            setIsLoading(true);
            getInstitutionDetails(id, {
                signal: controller.signal
            })
                .then((response) => {
                    isMounted && setInstitution(response.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    if (err.response.status === 404) {
                        navigate(ROUTES.notFound);
                        return;
                    }
                    console.log(err);
                })
        }

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [id])

    const handleClickEdit = () => {
        navigate(ROUTES.institutionEdit.replace(":id", institution.id ? institution.id.toString() : "-1"));
    }

    const handleClickDelete = () => {
        setOpen(true);
    }

    const handleConfirmDelete = () => {
        setOpen(false);
        if (id !== undefined) {
            deleteInstitution(id, {
                headers: { 'Content-type': 'application/json' }
            })
                .then((response) => {
                    navigate(ROUTES.persons);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const formatInstitutionName = (name: InstitutionNameEntity): string => {
        return name.name ? name.name + (name.nameType ? " | " + name.nameType : "") : t('unknown');
    }

    return (
        <ItemDetailPageBase
            isLoading={isLoading}
            title={`${t('institution')} (${id})`}
            dialogFullScreen={fullScreen}
            dialogIsOpen={open}
            dialogTitle={`${t('delete')}  ${t('institution')} (${id})`}
            onClickEdit={handleClickEdit}
            onClickDelete={handleClickDelete}
            onDialogClose={handleDialogClose}
            onDialogConfirm={handleConfirmDelete}
        >
            {institution &&
                <>
                    <ItemDataSection title={`${t("basic")} ${t('informations').toLowerCase()}`} >
                        {(institution.level || institution.level === 0) &&
                            <Typography component="p" variant="body2">
                                <strong>{t('institutionLevel')}:</strong> {institution.level}
                            </Typography>}
                        {institution.institutionType &&
                            <Typography component="p" variant="body2">
                                <strong>{t('institutionType')}:</strong> {institution.institutionType}
                            </Typography>}
                    </ItemDataSection>
                    <ItemDataSection title={t("name")}>
                        {institution.names &&
                            <Grid container spacing={2} direction="column">
                                {institution.names.map((x, i) =>
                                    <Grid item key={i} xs>
                                        <ItemCardPreviewBase
                                            title={
                                                <Typography component="p" variant="body2">
                                                    {formatInstitutionName(x)}
                                                </Typography>} />
                                    </Grid>)}
                            </Grid>}
                    </ItemDataSection>
                    <ItemDataSection title={t("externDatabaseIds")}>
                        {institution.externDatabaseIds &&
                            <Grid container spacing={2} direction="column">
                                {institution.externDatabaseIds.map((x, i) =>
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

export default InstitutionDetail