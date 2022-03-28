
import { useState, useEffect} from 'react';
import useUserService from '../../hooks/users/useUserService';
import UserPreview from '../../components/users/UserPreview';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UserDetailEntity } from '../../types/auth/entities.types';
import PaginationPageHeader from '../../components/PaginationPageHeader';
import PaginationPageFooter from '../../components/PaginationPageFooter';
import { FormikFieldSchema, PaginationSearchBarField } from '../../types/common/component.types';
import PaginationPageSearchBar from '../../components/PaginationPageSearchBar';
import PaginationPageMain from '../../components/PaginationPageMain';

const rowsPerPageArray = [5, 10, 15];
type Props = {}

const Users = (props: Props) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { getUsers } = useUserService();
  const [users, setUsers] = useState<UserDetailEntity[]>();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageArray[0]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState({})

  const searchFields: PaginationSearchBarField[] = [
    {
      value: '',
      labelTranslationKey: 'nameAndSurnameSearch',
      type: "text",
      name: "name"
    },
    {
      value: '',
      labelTranslationKey: 'email',
      type: "text",
      name: "email"
    }
  ]
  
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
    const params = Object.assign({
      pageNumber: page,
      pageSize: rowsPerPage
    },
      {...searchQuery}
    )
    getUsers({
      params: params,
      signal: controller.signal
    })
      .then((response) => {
        isMounted && setUsers(response.data.data);
        setTotalRecords(response.data.totalRecords);
        setPage(response.data.pageNumber);
        setRowsPerPage(response.data.pageSize);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      })

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [page, rowsPerPage, searchQuery])


  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSearchSubmit = (values: any) => {
    setSearchQuery({ ...values })
    setPage(1);
  }

  const handleSearchReset = () => {
    setSearchQuery({})
    setPage(1);
  }

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

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item xs={12}>
        <PaginationPageHeader title={t('userList')}>
          <Grid item xs>
            <PaginationPageSearchBar
              onSearchSubmit={handleSearchSubmit}
              onSearchReset={handleSearchReset}
              searchFields={schema}
            />
          </Grid>
          {/* <Grid item xs>
            <SubmitResetForm onSubmit={handleSearchSubmit} onReset={handleSearchReset} fields={schema} formId="search-form" direction="row" />
          </Grid> */}
        </PaginationPageHeader>
      </Grid>
      <Grid item xs={12}>
        <PaginationPageMain
          isLoading={isLoading}
          noResultsMessage={t('noObjectsToDisplay', { what: t('users').toLowerCase() })}>
          {ShowObjects()}
        </PaginationPageMain>
      </Grid>
      <Grid item xs={12}>
        <PaginationPageFooter
          page={page}
          rowsPerPage={rowsPerPage}
          totalRecords={totalRecords}
          rowsPerPageArray={rowsPerPageArray}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage} />
      </Grid>
    </Grid>
  )
}

export default Users