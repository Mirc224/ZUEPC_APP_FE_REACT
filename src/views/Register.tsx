import { Backdrop, Button, CircularProgress, Container, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from "react-i18next";
import { RegisterUserCommand } from '../types/auth/commands.types';
import { axiosClient } from '../utils/axios-utils';
import apiEndpoints from '../endpoints/api.endpoints';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ROUTES from '../endpoints/routes.endpoints';


type Props = {}

const Register = (props: Props) => {
    const pwLen = 6;
    const { t } = useTranslation();
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const validationSchema = yup.object({
        firstName: yup
            .string()
            .required('isRequiredIt'),
        lastName: yup
            .string()
            .required('isRequiredIt'),
        email: yup
            .string()
            .email('enterValid')
            .required('isRequiredHe'),
        password: yup
            .string()
            .min(pwLen, 'minLength')
            .required(t('isRequiredIt', { what: t('password') })),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref('password'), null], 'passwordMatch')
    });
    useEffect(() => {
        document.title = t('register')

        return () => {
        }
    }, [t])

    const onSubmitRegister = (values: RegisterUserCommand) => {
        setIsProcessing(true);
        axiosClient.post(apiEndpoints.register, values, {
            headers: { 'Content-type': 'application/json' }
        })
            .then((res) => {
                setIsProcessing(false);
                navigate(ROUTES.login);
            })
            .catch((err: any) => {
                setIsProcessing(false);
                if (err.response?.status === 400 && err.response?.data.errors.Email) {
                    formik.setFieldError('email', 'emailAlreadyUsed');
                }
            })
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        },
        validationSchema: validationSchema,
        onSubmit: onSubmitRegister
    });

    return (
        <Container maxWidth="sm">
            <h1>{t('registration')}</h1>
            <form onSubmit={formik.handleSubmit}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label={t("firstName")}
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={
                                formik.touched.firstName &&
                                    formik.errors.firstName ?
                                    t(formik.errors.firstName, { what: t('firstName') }) : null}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label={t("lastName")}
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={
                                formik.touched.lastName &&
                                    formik.errors.lastName ?
                                    t(formik.errors.lastName, { what: t('lastName') }) : null}
                        />
                    </Grid>
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
                                    t(formik.errors.password, { what: t('password'), len: pwLen }) : null
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            label={t("passwordConfirmation")}
                            type="password"
                            value={formik.values.passwordConfirmation}
                            onChange={formik.handleChange}
                            error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                            helperText={
                                formik.touched.passwordConfirmation &&
                                    formik.errors.passwordConfirmation ?
                                    t(formik.errors.passwordConfirmation) : null
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            {t("submit")}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {isProcessing &&
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isProcessing}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>}
        </Container>);
}

export default Register