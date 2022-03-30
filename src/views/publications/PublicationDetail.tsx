import ROUTES from '../../endpoints/routes.endpoints';
import { Card, CardContent, CardHeader, Grid, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { ReactElement, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import usePublicationService from '../../hooks/publications/usePublicationService';
import { PublicationDetailsEntity, PublicationIdentifierEntity, PublicationNameEntity } from '../../types/publications/entities.types';
import ItemDetailPageBase from '../../components/itemPage/ItemDetailPageBase';
import ItemDataSection from '../../components/itemPage/ItemDataSection';
import PersonPreview from '../../components/persons/PersonPreview';
import InstitutionPreview from '../../components/institutions/InstitutionPreview';
import ItemPreviewWithTitile from '../../components/itemPage/ItemPreviewWithTitile';
import ItemCardPreviewBase from '../../components/itemPage/ItemCardPreviewBase';
import PublicationPreview from '../../components/publications/PublicationPreview';

type Props = {}

const PublicationDetail = (props: Props) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { getPublicationDetails, deletePublication } = usePublicationService();
  const [isLoading, setIsLoading] = useState(false);
  const [publication, setPublication] = useState<PublicationDetailsEntity>(undefined!);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    if (id !== undefined) {
      setIsLoading(true);
      getPublicationDetails(id, {
        signal: controller.signal
      })
        .then((response) => {
          isMounted && setPublication(response.data);
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
    navigate(ROUTES.publicationEdit.replace(":id", publication.id ? publication.id.toString() : "-1"));
  }

  const handleClickDelete = () => {
    setOpen(true);
  }

  const handleConfirmDelete = () => {
    setOpen(false);
    if (id !== undefined) {
      deletePublication(id, {
        headers: { 'Content-type': 'application/json' }
      })
        .then((response) => {
          navigate(ROUTES.publications);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const formatPublicationName = (name: PublicationNameEntity): string => {
    return name.name ? name.name + (name.nameType ? " | " + name.nameType : "") : t('unknown');
  }

  const formatPublicationIdentifier = (identifier: PublicationIdentifierEntity): string => {
    let formatedIdentifier = identifier.identifierName ? identifier.identifierName + ":" : "";
    formatedIdentifier += identifier.identifierValue ? identifier.identifierValue : "";
    formatedIdentifier += identifier.iSForm ? ` (${identifier.iSForm})` : "";
    return formatedIdentifier;
  }

  const PublishYear = (): ReactElement => {
    return publication.publishYear ?
      <Typography component="p" variant="body1">
        <strong>{t('publishYear')}:</strong> {publication.publishYear}
      </Typography>
      : <></>;
  }

  const DocumentType = (): ReactElement => {
    return publication.documentType ?
      <Typography component="p" variant="body1">
        <strong>{t('documentType')}:</strong> {publication.documentType}
      </Typography>
      : <></>;
  }

  return (<ItemDetailPageBase
    isLoading={isLoading}
    title={`${t('publication')} (${id})`}
    dialogFullScreen={fullScreen}
    dialogIsOpen={open}
    dialogTitle={`${t('delete')}  ${t('publication')} (${id})`}
    onClickEdit={handleClickEdit}
    onClickDelete={handleClickDelete}
    onDialogClose={handleDialogClose}
    onDialogConfirm={handleConfirmDelete}
  >
    {publication &&
      <>
        <ItemDataSection title={`${t("basic")} ${t('informations').toLowerCase()}`} >
          {PublishYear()}
          {DocumentType()}
        </ItemDataSection>
        <ItemDataSection title={t("name")}>
          {publication.names &&
          <Grid container spacing={2} direction="column">
              {publication.names.map((x, i) =>
              <Grid item key={i} xs>
                  <ItemCardPreviewBase
                    title={
                      <Typography component="p" variant="body1">
                        {formatPublicationName(x)}
                      </Typography>}/>
                </Grid>
              )}
            </Grid>}
        </ItemDataSection>
        <ItemDataSection title={t("publicationIdentifier")}>
          {publication.identifiers &&
            <Grid container spacing={2} direction="column">
              {publication.identifiers.map((x, i) =>
                <Grid item key={i} xs>
                  <ItemCardPreviewBase
                    title={
                      <Typography component="p" variant="body1">
                        {formatPublicationIdentifier(x)}
                      </Typography>} />
                </Grid>
              )}
            </Grid>}
        </ItemDataSection>
        <ItemDataSection title={t("externDatabaseIds")}>
          {publication.externDatabaseIds &&
          <Grid container spacing={2} direction="column">
              {publication.externDatabaseIds.map((x, i) =>
              <Grid item key={i} xs>
                  <ItemCardPreviewBase
                    title={
                      <Typography component="p" variant="body1">
                        {x.externIdentifierValue}
                      </Typography>} />
                </Grid>
              )}
            </Grid>}
        </ItemDataSection>
        <ItemDataSection title={t("relatedPerson")}>
          {publication.authors &&
            <Grid container spacing={2} direction="column">
              {publication.authors.map((x, i) =>
                <Grid item key={i}>
                  <ItemCardPreviewBase
                    title={
                      <div>
                        <Typography component="h5" variant="h5">
                          {`${t('role')}: ${x.role ? x.role : t('unknown')}`}
                        </Typography>
                      </div>
                    }
                    subheader={x.contributionRatio ?
                      <Typography component="h6" variant="h6">
                        {`${t('contributionRatio')}: ${x.contributionRatio}%`}
                      </Typography> : <></>
                    }
                  >
                    <Grid container direction="column" spacing={2}>
                      {x.personPreview &&
                        <Grid item xs>
                          <ItemPreviewWithTitile title={t('person')}>
                            <PersonPreview person={x.personPreview} />
                          </ItemPreviewWithTitile>
                        </Grid>
                      }
                      {x.institutionPreview &&
                        <Grid item xs>
                          <ItemPreviewWithTitile title={t('affiliatedInstitution')}>
                            <InstitutionPreview institution={x.institutionPreview} />
                          </ItemPreviewWithTitile>
                        </Grid>
                      }
                    </Grid>
                  </ItemCardPreviewBase>
                </Grid>
              )}
            </Grid>}
        </ItemDataSection>
        <ItemDataSection title={t('relatedPublication')} >
          {publication.relatedPublications &&
            <Grid container spacing={2} direction="column">
              {publication.relatedPublications.map((x, i) =>
                <Grid item key={i}>
                  <ItemCardPreviewBase
                    title={
                      <div>
                        <Typography component="h5" variant="h5">
                          {`${t('relation')}: ${x.relationType ? x.relationType : t('unknown')}`}
                        </Typography>
                      </div>
                    }
                    subheader={x.citationCategory ?
                      <Typography component="h6" variant="h6">
                        {`${t('citationCategory')}: ${x.citationCategory}`}
                      </Typography> : <></>
                    }
                  >
                    {x.relatedPublication &&
                      <PublicationPreview publication={x.relatedPublication} />
                    }
                  </ItemCardPreviewBase>
                </Grid>
              )}
            </Grid>}
        </ItemDataSection>
      </>}
  </ItemDetailPageBase>);
}

export default PublicationDetail