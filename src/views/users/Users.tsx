
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import routes from '../../endpoints/routes.endpoints';
import useAuth from '../../hooks/useAuth';
import ClipLoader from "react-spinners/ClipLoader";
import useUserService from '../../hooks/useUserService';
import UserPreview from '../../components/users/UserPreview';
import { Box, Button, Grid, TablePagination, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ApiUserDetail } from '../../types/api/auth/entities.types';

const rowsPerPageArray = [5, 10, 15];
type Props = {}

const Users = (props: Props) => {
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { getUsers } = useUserService();
  const [users, setUsers] = useState<ApiUserDetail[]>();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageArray[0]);
  const [totalRecords, setTotalRecords] = useState(0);
  const { setAuth } = useAuth();
  const [searchQuery, setSearchQuery] = useState({
    name: '',
    email: ''
  })

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;
    const controller = new AbortController();
    const params = Object.assign({
      pageNumber: page,
      pageSize: rowsPerPage
    }, 
      searchQuery.name && { name: searchQuery.name},
      searchQuery.email && { email: searchQuery.email }
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
        setAuth({});
        navigate(routes.login, { state: { from: location }, replace: true });
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

  const handleSearchSubmit = () => {
    setSearchQuery({
      name: searchName,
      email: searchEmail
    })
    setPage(1);
  }

  return (
    <article>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>{t('userList')}</h1>
        </Grid>
        <Grid item xs={12}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  label={t("nameAndSurnameSearch")}
                  type="text"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  name="email"
                  label={t("email")}
                  type="text"
                />
              </Grid>
              <Grid item display="flex" justifyContent="flex-end">
                <Button onClick={handleSearchSubmit} variant="text">{t('search')}</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        {isLoading
          ?
          <Grid item xl={12}>
            <div className='spinner'>
              <ClipLoader loading={isLoading} size={100} />
            </div>
          </Grid>
          :
          <Grid item xl={12}>
            {users?.length
              ? <Grid container spacing={2}>
                {users.map((user) =>
                  <Grid item key={user.id} xs={12}>
                    <UserPreview user={user} />
                  </Grid>)}
              </Grid>
              : <p>No users to display</p>}
          </Grid>}
        <Grid item xs={12}>
          <TablePagination
            showFirstButton
            showLastButton
            component='div'
            count={totalRecords}
            page={page - 1}
            rowsPerPageOptions={rowsPerPageArray}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={t('rowsPerPage')}
          />
        </Grid>
      </Grid>
    </article>
  )
}

export default Users