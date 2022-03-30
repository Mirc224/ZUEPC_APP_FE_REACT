import { Grid } from '@mui/material';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import InstitutionPreview from '../../components/institutions/InstitutionPreview';
import PaginationPageBase from '../../components/pagination/PaginationPageBase';
import PaginationPageMain from '../../components/pagination/PaginationPageMain';
import ROLES from '../../constatns/roles.constants';
import ROUTES from '../../endpoints/routes.endpoints';
import useInstitutionService from '../../hooks/institutions/useInstitutionService';
import { FormikFieldSchema } from '../../types/common/component.types';
import { InstitutionPreviewEntity } from '../../types/institutions/entities.types';
import { institutionSearchSchema } from '../../form-schemas/institution.schema';

type Props = {}

const Institutions = (props: Props) => {
  const canEditRoles = [ROLES.Admin, ROLES.Editor]
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { getInstitutionsPreviews } = useInstitutionService();
  const [institutions, setInstitutions] = useState<InstitutionPreviewEntity[]>();
  const [totalRecords, setTotalRecords] = useState(0);
  const [queryParams, setQueryParams] = useState({
    pageNumber: 1,
    pageSize: 5
  });
  const navigate = useNavigate();

  const schema: FormikFieldSchema[] = institutionSearchSchema;

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const controller = new AbortController();
    getInstitutionsPreviews({
      params: queryParams,
      signal: controller.signal
    })
      .then((response) => {
        isMounted && setInstitutions(response.data.data);
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
    navigate(ROUTES.institutionCreate);
  }

  const ShowObjects = () => {
    return (
      institutions?.length ?
        <Grid container spacing={2}>
          {
            institutions.map((institution) =>
              <Grid item key={institution.id} xs={12}>
                <InstitutionPreview institution={institution} />
              </Grid>)
          }
        </Grid >
        : false
    )
  }

  return (
    <PaginationPageBase
      title={t('institutionList')}
      canEditRoles={canEditRoles}
      searchBarFormSchema={schema}
      totalRecords={totalRecords}
      onAddNewClick={handleAddClick}
      onQueryParameterChange={handleQueryParamsChange}
      onSearchSubmit={handleQueryParamsChange}
      onSearchReset={handleQueryParamsChange}
    >
      <PaginationPageMain
        isLoading={isLoading}
        noResultsMessage={t('noObjectsToDisplay', { what: t('institutions').toLowerCase() })}>
        {ShowObjects()}
      </PaginationPageMain>
    </PaginationPageBase>
  )
}

export default Institutions