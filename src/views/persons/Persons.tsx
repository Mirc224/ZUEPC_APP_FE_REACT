import ROUTES from '../../endpoints/routes.endpoints';
import ROLES from '../../constatns/roles.constants';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import usePersonService from '../../hooks/persons/usePersonService';
import { FormikFieldSchema } from '../../types/common/component.types';
import { PersonPreviewEntity } from '../../types/persons/entities.types';
import PersonPreview from '../../components/persons/PersonPreview';
import PaginationPageBase from '../../components/pagination/PaginationPageBase';
import PaginationPageMain from '../../components/pagination/PaginationPageMain';
import { personSearchSchema } from '../../form-schemas/person.schema';
;

type Props = {}

const Users = (props: Props) => {
  const canEditRoles = [ROLES.Admin, ROLES.Editor]
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { getPersonsPreviews } = usePersonService();
  const [persons, setPersons] = useState<PersonPreviewEntity[]>();
  const [totalRecords, setTotalRecords] = useState(0);
  const [queryParams, setQueryParams] = useState({
    pageNumber: 1,
    pageSize: 5
  })
  const navigate = useNavigate();

  const searchSchema: FormikFieldSchema[] = personSearchSchema;


  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;
    const controller = new AbortController();
    getPersonsPreviews({
      params: queryParams,
      signal: controller.signal
    })
      .then((response) => {
        isMounted && setPersons(response.data.data);
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
    navigate(ROUTES.personCreate);
  }

  const ShowObjects = () => {
    return (
      persons?.length ?
        <Grid container spacing={2}>
          {
            persons.map((person) =>
              <Grid item key={person.id} xs={12}>
                <PersonPreview person={person} />
              </Grid>)
          }
        </Grid >
        : false
    )
  }

  return (
      <PaginationPageBase
        title={t('personList')}
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
          noResultsMessage={t('noObjectsToDisplay', { what: t('persons').toLowerCase() })}>
          {ShowObjects()}
        </PaginationPageMain>
      </PaginationPageBase>
  )
}

export default Users