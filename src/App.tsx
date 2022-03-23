import './App.css';
import "./i18n/i18next";
import Publications from './views/publications/Publications';
import Persons from './views/persons/Persons';
import Register from './views/Register';
import Institutions from './views/institutions/Institutions';
import Logout from './views/Logout';
import Login from './views/Login';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import routes from './endpoints/routes.endpoints';
import { Route, Routes } from 'react-router';
import Unauthorized from './views/Unauthorized';
import ROLES from './constatns/roles.constants';
import UserRoutes from './views/users/UserRouter';
import PersistLogin from './components/PersistLogin';
import Missing from './views/Missing';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route element={<PersistLogin />}>
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.register} element={<Register />} />
          <Route path={routes.logout} element={<Logout />} />
          <Route path={routes.unauthorized} element={<Unauthorized />} />
            <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Editor]}/>}>
              <Route path={routes.publications} element={<Publications />} />
              <Route path={routes.persons} element={<Persons />} />
              <Route path={routes.institutions} element={<Institutions />} />
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path='/user/*' element={<UserRoutes />} />
              </Route>
            </Route>
          <Route path='*' element={<Missing/>}/>
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
