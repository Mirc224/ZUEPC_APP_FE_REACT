
import { useState, useEffect } from 'react';
import useUserService from '../../hooks/users/useUserService';
import UserPreview from '../../components/users/UserPreview';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UserDetailEntity } from '../../types/auth/entities.types';
import { FormikFieldSchema, PaginationSearchBarField } from '../../types/common/component.types';
import PaginationPageSearchBar from '../../components/pagination/PaginationPageSearchBar';
import PaginationPageHeader from '../../components/pagination/PaginationPageHeader';
import PaginationPageMain from '../../components/pagination/PaginationPageMain';
import PaginationPageFooter from '../../components/pagination/PaginationPageFooter';
import PaginationPageBase from '../../components/pagination/PaginationPageBase';

const rowsPerPageArray = [5, 10, 15];
type Props = {}

const Users = (props: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { getUsers } = useUserService();
  const [users, setUsers] = useState<UserDetailEntity[]>();
  const [totalRecords, setTotalRecords] = useState(0);
  const [queryParams, setQueryParams] = useState({})

  const schema: FormikFieldSchema[] = [
    {
      name: "name",
      labelTranslationKey: 'nameAndSurnameSearch',
      initValue: "",
      type: "text",
    },
    {
      initValue: '',
      labelTranslationKey: 'email',
      type: "text",
      name: "email"
    },
  ]


  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;
    const controller = new AbortController();
    getUsers({
      params: queryParams,
      signal: controller.signal
    })
      .then((response) => {
        isMounted && setUsers(response.data.data);
        setTotalRecords(response.data.totalRecords);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      })

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [queryParams])

  const ShowObjects = () => {
    return (
      users?.length ?
        <Grid container spacing={2}>
          {users.map((user) =>
            <Grid item key={user.id} xs={12}>
              <UserPreview user={user} />
            </Grid>)}
        </Grid>
        : false
    )
  }

  const handleQueryParamsChange = (queryParams: any) => {
    setQueryParams(queryParams);
  }

  return (
      <PaginationPageBase
        title={t('userList')}
        canEditRoles={[]}
        rowsPerPageList={rowsPerPageArray}
        searchBarFormSchema={schema}
        totalRecords={totalRecords}
        onQueryParameterChange={handleQueryParamsChange}
        onSearchSubmit={handleQueryParamsChange}
        onSearchReset={handleQueryParamsChange}
      >
        <PaginationPageMain
          isLoading={isLoading}
          noResultsMessage={t('noObjectsToDisplay', { what: t('users').toLowerCase() })}>
          {ShowObjects()}
        </PaginationPageMain>
      </PaginationPageBase>
  )
}

export default Users