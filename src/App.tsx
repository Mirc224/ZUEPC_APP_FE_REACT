import './App.css';
import "./i18n/i18next";
import Publications from './views/publications/Publications';
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
import PersonRoutes from './views/persons/PersonRouter';
import { ThemeProvider } from '@emotion/react';
import { Container, createTheme, Grid, TextField } from '@mui/material';
import {Formik, Form, yupToFormErrors} from 'formik';
import * as yup from 'yup';
import TextFieldWrapper from './components/TextFieldWrapper';
import { useTranslation } from 'react-i18next';

function App() {
  const {t} = useTranslation();
  // const INITIAL_FORM_STATE = {
  //     firstName: 'asss',
  //     lastName: 'ddd'
  // };
  // const FORM_VALIDATION = yup.object().shape({
  //   firstName: yup.string().required('isRequiredHe'),
  //   lastName: yup.string().required(t('isRequiredHe', {what: t('firstName')})),
  // });


  const theme = createTheme();
  return (
    // <Grid container>
    //   <Grid item xs={12}>
    //     <Grid item xs={12}>
    //       <Container maxWidth="md">
    //         <Formik
    //         initialValues={{...INITIAL_FORM_STATE}}
    //         validationSchema={FORM_VALIDATION}
    //         onSubmit={values => console.log(values)}
    //         >
    //           <Form>
    //             <Grid item xs={6}>
    //               <TextFieldWrapper
    //               label={t("firstName")}
    //               name="firstName"/>
    //               <TextFieldWrapper
    //               label={t("firstName")}
    //               name="lastName"
    //               />
    //             </Grid>
    //           </Form>
    //         </Formik>
    //       </Container>
    //     </Grid>
    //   </Grid>
    // </Grid>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path='/' element={<Layout />}>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.logout} element={<Logout />} />
            <Route path={routes.unauthorized} element={<Unauthorized />} />
            <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Editor]} />}>
              <Route path={routes.publications} element={<Publications />} />
              <Route path={'/person/*'} element={<PersonRoutes />} />
              <Route path={routes.institutions} element={<Institutions />} />
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path='/user/*' element={<UserRoutes />} />
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
