import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import usePersonService from '../../hooks/persons/usePersonService';
import routes from '../../endpoints/routes.endpoints';
import { FormikFieldSchema } from '../../types/common/component.types';
import { PersonPreviewEntity } from '../../types/persons/entities.types';
import PersonPreview from '../../components/persons/PersonPreview';import roles from '../../constatns/roles.constants';
import PaginationPageBase from '../../components/pagination/PaginationPageBase';
import PaginationPageMain from '../../components/pagination/PaginationPageMain';
;

const rowsPerPageArray = [5, 10, 15];
type Props = {}

const Users = (props: Props) => {
  const canEditRoles = [roles.Admin, roles.Editor]
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { getPersons } = usePersonService();
  const [persons, setPersons] = useState<PersonPreviewEntity[]>();
  const [totalRecords, setTotalRecords] = useState(0);
  const [queryParams, setQueryParams] = useState({})
  const navigate = useNavigate();

  const schema: FormikFieldSchema[] = [
    {
      name: "name",
      labelTranslationKey: 'nameAndSurnameSearch',
      type: "text",
      initValue: ""
    },
    {
      name: "externIdentifierValue",
      labelTranslationKey: 'externId',
      type: "text",
      initValue: ""
    },
  ]

  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;
    const controller = new AbortController();
    getPersons({
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
    navigate(routes.personCreate);
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
        rowsPerPageList={rowsPerPageArray}
        searchBarFormSchema={schema}
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