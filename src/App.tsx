import './App.css';
import "./i18n/i18next";
import Register from './views/Register';
import Logout from './views/Logout';
import Login from './views/Login';
import Layout from './components/common/Layout';
import ROUTES from './endpoints/routes.endpoints';
import { Route, Routes } from 'react-router';
import Unauthorized from './views/Unauthorized';
import ROLES from './constatns/roles.constants';
import UserRoutes from './views/users/UserRouter';
import PersistLogin from './components/common/PersistLogin';
import Missing from './views/Missing';
import PersonRouter from './views/persons/PersonRouter';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import InstitutionRouter from './views/institutions/InstitutionRouter';
import PublicationRouter from './views/publications/PublicationRouter';
import DefaultPageRedirection from './components/common/DefaultPageRedirection';
import Import from './views/import/Import';
import RequireAuth from './components/common/RequireAuth';

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path='/' element={<Layout />}>
            <Route path='' element={<DefaultPageRedirection/>}/>
            <Route path={ROUTES.login} element={<Login />} />
            <Route path={ROUTES.register} element={<Register />} />
            <Route path={ROUTES.logout} element={<Logout />} />
            <Route path={ROUTES.unauthorized} element={<Unauthorized />} />
            <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Editor]} />}>
              <Route path={ROUTES.publicationRoutes} element={<PublicationRouter />} />
              <Route path={ROUTES.personRoutes} element={<PersonRouter />} />
              <Route path={ROUTES.institutionRoutes} element={<InstitutionRouter />} />
              <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
                <Route path={ROUTES.import} element={<Import />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path={ROUTES.userRoutes} element={<UserRoutes />} />
              </Route>
            </Route>
            <Route path='*' element={<Missing />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
export default App;
