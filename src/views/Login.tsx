import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Container, Grid, TextField } from '@mui/material';
import { LoginUserCommand } from '../types/auth/commands.types';
import { axiosClient } from '../utils/axios-utils';
import apiEndpoints from '../endpoints/api.endpoints';
import ROUTES from '../endpoints/routes.endpoints';
import useAuth from "../hooks/auth/useAuth";
import { Navigate, useLocation, useNavigate} from 'react-router-dom';
import {authHelper} from '../helpers/auth.helper';


type Props = {}

const initialValues = {
  email: '',
  password: ''
}

const Login = (props: Props) => {
  const { t } = useTranslation();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from.pathname || ROUTES.default;


  const validationSchema = yup.object({
    email: yup
      .string()
      .email('enterValid')
      .required('isRequiredHe'),
    password: yup
      .string()
      .required(t('isRequiredIt', { what: t('password') }))
  });
  const formik = useFormik({
    initialValues: {
      ...initialValues
    },
    validationSchema: validationSchema,
    onSubmit: onSubmitLogin
  });

 async function onSubmitLogin(values:LoginUserCommand) {
   try {
     const response = await axiosClient.post(apiEndpoints.login, values, {
       headers: { 'Content-type': 'application/json' }
     });
     const userAuthContent = authHelper.getUserAuthToken(response.data);
     authHelper.storeAccessToken(userAuthContent.token);
     authHelper.storeRefreshToken(userAuthContent.refreshToken);
     setAuth(userAuthContent);
     formik.resetForm({ values: {
       ...initialValues
     }});
     
     navigate(from, {replace: true});
   }
   catch (err: any) {
     if(err.response?.status === 401) {
       formik.setFieldError('email', 'invalidEmailOrPassword');
     }
   }
 }


  return (
    <>
      {auth?.id ? <Navigate to={from} replace /> :
        <Container maxWidth="sm">
          <h1>{t('login')}</h1>
          <form onSubmit={formik.handleSubmit}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label={t("email")}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={
                    formik.touched.email &&
                      formik.errors.email ?
                      t(formik.errors.email, { what: t('email') }) : null}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label={t("password")}
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={
                    formik.touched.password &&
                      formik.errors.password ?
                      t(formik.errors.password, { what: t('password')}) : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button color="primary" variant="contained" fullWidth type="submit">
                  {t("login")}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>}
    </>
    );
}

export default Login