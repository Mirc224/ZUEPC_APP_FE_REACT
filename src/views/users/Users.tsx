
import { useState, useEffect } from 'react';
import useUserService from '../../hooks/users/useUserService';
import UserPreview from '../../components/users/UserPreview';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UserDetailEntity } from '../../types/auth/entities.types';
import { FormikFieldSchema } from '../../types/common/component.types';
import PaginationPageBase from '../../components/pagination/PaginationPageBase';
import PaginationPageMain from '../../components/pagination/PaginationPageMain';
import { userSearchSchema } from '../../form-schemas/user.schema';

type Props = {}

const Users = (props: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { getUsers } = useUserService();
  const [users, setUsers] = useState<UserDetailEntity[]>();
  const [totalRecords, setTotalRecords] = useState(0);
  const [queryParams, setQueryParams] = useState({
    pageNumber: 1,
    pageSize: 5
  })

  const schema: FormikFieldSchema[] = userSearchSchema;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    setIsLoading(true);
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