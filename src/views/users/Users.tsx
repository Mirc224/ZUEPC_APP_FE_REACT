
import {useState, useEffect} from 'react';
import { ApiUser } from '../../types/auth/types';
import { useLocation, useNavigate } from 'react-router';
import routes from '../../endpoints/routes.endpoints';
import useAuth from '../../hooks/useAuth';
import ClipLoader from "react-spinners/ClipLoader";
import useUserService from '../../hooks/useUserService';
import UserPreview from '../../components/users/UserPreview';
import { Grid, TablePagination } from '@mui/material';
import { useTranslation } from 'react-i18next';
import roles from '../../constatns/roles.constants';

const rowsPerPageArray = [5, 10, 15];
type Props = {}

const Users = (props: Props) => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const {getUsers} = useUserService();
  const [users, setUsers] = useState<ApiUser[]>();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageArray[0]);
  const [totalRecords, setTotalRecords] = useState(0);
  const {auth, setAuth} = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const controller = new AbortController();
    getUsers({
      params: {
        pageNumber: page,
        pageSize: rowsPerPage
      },
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
  }, [page, rowsPerPage])
  
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

  return (
    <article>
      {isLoading 
      ?
        <div className='spinner'>
          <ClipLoader loading={isLoading} size={100} />
        </div>
      :
          <>
            <h1>{t('userList')}</h1>
            {users?.length
          ? <Grid container spacing={2}>
              {users.map((user) => 
              <Grid item key={user.id} xs={12}>
                <UserPreview user={user}/>
              </Grid>)}
            </Grid>  
          : <p>No users to display</p>}
          </>}
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
    </article>
  )
}

export default Users