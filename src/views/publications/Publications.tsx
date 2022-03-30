import ROUTES from '../../endpoints/routes.endpoints';
import ROLES from '../../constatns/roles.constants';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import usePublicationService from '../../hooks/publications/usePublicationService';
import { PublicationPreviewEntity } from '../../types/publications/entities.types';
import { useNavigate } from 'react-router';
import { FormikFieldSchema } from '../../types/common/component.types';
import { publicationSearchSchema } from '../../form-schemas/publication.schema';
import { Grid } from '@mui/material';
import PaginationPageBase from '../../components/pagination/PaginationPageBase';
import PaginationPageMain from '../../components/pagination/PaginationPageMain';
import PublicationPreview from '../../components/publications/PublicationPreview';

type Props = {}

const Publications = (props: Props) => {
  const canEditRoles = [ROLES.Admin, ROLES.Editor]
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { getPublicationPreviews } = usePublicationService();
  const [publications, setPublications] = useState<PublicationPreviewEntity[]>();
  const [totalRecords, setTotalRecords] = useState(0);
  const [queryParams, setQueryParams] = useState({
    pageNumber: 1,
    pageSize: 5
  })
  const navigate = useNavigate();

  const searchSchema: FormikFieldSchema[] = publicationSearchSchema;

  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;
    const controller = new AbortController();
    getPublicationPreviews({
      params: queryParams,
      signal: controller.signal
    })
      .then((response) => {
        isMounted && setPublications(response.data.data);
        setTotalRecords(response.data.totalRecords);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [queryParams])

  const handleQueryParamsChange = (queryParams: any) => {
    setQueryParams(queryParams);
  }

  const handleAddClick = () => {
    navigate(ROUTES.publicationCreate);
  }

  const ShowObjects = () => {
    return (
      publications?.length ?
        <Grid container spacing={2}>
          {
            publications.map((publication) =>
              <Grid item key={publication.id} xs={12}>
                <PublicationPreview publication={publication}/>
              </Grid>)
          }
        </Grid >
        : false
    )
  }

  return (
    <PaginationPageBase
      title={t('publicationList')}
      canEditRoles={canEditRoles}
      searchBarFormSchema={searchSchema}
      totalRecords={totalRecords}
      onAddNewClick={handleAddClick}
      onQueryParameterChange={handleQueryParamsChange}
      onSearchSubmit={handleQueryParamsChange}
      onSearchReset={handleQueryParamsChange}
    >
      <PaginationPageMain
        isLoading={isLoading}
        noResultsMessage={t('noObjectsToDisplay', { what: t('publications').toLowerCase() })}>
        {ShowObjects()}
      </PaginationPageMain>
    </PaginationPageBase>
  )
}

export default Publications