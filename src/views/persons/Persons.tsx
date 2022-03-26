import { useState, useEffect, ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Button, Grid} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ApiPersonPreview } from '../../types/api/persons/entities.types';
import usePersonService from '../../hooks/persons/usePersonService';
import PersonPreview from '../../components/persons/PersonPreview';
import AddIcon from '@mui/icons-material/Add';
import roles from '../../constatns/roles.constants';
import { permissionHelper } from '../../helpers/permission.helper';
import useAuth from '../../hooks/auth/useAuth';
import routes from '../../endpoints/routes.endpoints';
import PaginationPageFooter from '../../components/PaginationPageFooter';
import PaginationPageHeader from '../../components/PaginationPageHeader';
import PaginationPageSearchBar from '../../components/PaginationPageSearchBar';
import { FormikFieldSchema } from '../../types/entities/component.typs';
import PaginationPageMain from '../../components/PaginationPageMain';

const rowsPerPageArray = [5, 10, 15];
type Props = {}

const Users = (props: Props) => {
  const canEditRoles = [roles.Editor, roles.Admin];
  const { auth } = useAuth();
  const [canEdit, setCanEdit] = useState(permissionHelper.hasRole(auth.roles, canEditRoles));
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { getPersons } = usePersonService();
  const [persons, setPersons] = useState<ApiPersonPreview[]>();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageArray[0]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState({})
  const navigate = useNavigate();

  const schema: FormikFieldSchema[] = [
    {
      name: "name",
      labelTranslationKey: 'nameAndSurnameSearch',
      type: "text",
      initValue: ""
    },
    {
      name: "externId",
      labelTranslationKey: 'externId',
      type: "text",
      initValue: ""
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
      { ...searchQuery }
    )
    getPersons({
      params: params,
      signal: controller.signal
    })
      .then((response) => {
        isMounted && setPersons(response.data.data);
        setTotalRecords(response.data.totalRecords);
        setPage(response.data.pageNumber);
        setRowsPerPage(response.data.pageSize);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [page, rowsPerPage, searchQuery])

  useEffect(() => {
    setCanEdit(permissionHelper.hasRole(auth.roles, canEditRoles));
  }, [auth])


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

  const handleAddClick = () => {
    navigate(routes.personCreate);
  }

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
    <Grid container direction='column' spacing={2}>
      <Grid item xs={12}>
        <PaginationPageHeader title={t('personList')}>
          {canEdit &&
            <Grid item alignContent='center' xs={12}>
              <Button variant="contained" color='success' onClick={handleAddClick} startIcon={<AddIcon />}>{t('add')}</Button>
            </Grid>}
          <Grid item xs={12}>
            <PaginationPageSearchBar
              onSearchSubmit={handleSearchSubmit}
              onSearchReset={handleSearchReset}
              searchFields={schema}
            />
          </Grid>
        </PaginationPageHeader>
      </Grid>
      <Grid item xs={12}>
        <PaginationPageMain
          isLoading={isLoading}
          noResultsMessage={t('noObjectsToDisplay', { what: t('persons').toLowerCase() })}>
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