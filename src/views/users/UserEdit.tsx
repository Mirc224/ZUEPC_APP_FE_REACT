import * as yup from 'yup';
import { Button, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import useUserService from '../../hooks/users/useUserService';
import { UserDetailEntity } from '../../types/auth/entities.types';
import { permissionHelper } from '../../helpers/permission.helper';
import roles from '../../constatns/roles.constants';
import useAuth from '../../hooks/auth/useAuth';
import routes from '../../endpoints/routes.endpoints';
import { authHelper } from '../../helpers/auth.helper';
import { UserRole } from '../../enums/role.enum';
import LoadingScreen from '../../components/LoadingScreen';


type Props = {}
type RoleObject = {
    role: UserRole,
    checked: boolean,
    props?: any
}

const UserEdit = (props: Props) => {
    const [userRoles, setUserRoles] = useState<RoleObject[]>([
        {
            role: UserRole.admin,
            checked: false
        },
        {
            role: UserRole.editor,
            checked: false
        },
        {
            role: UserRole.user,
            checked: false,
            props: { disabled: true }
        }
    ]);
    const { auth } = useAuth();
    const [user, setUser] = useState<UserDetailEntity>(undefined!);
    const { id } = useParams();
    const { t } = useTranslation();
    const { getUser, updateUser, updateUserRoles } = useUserService();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validationSchema = yup.object({
        firstName: yup
            .string()
            .required('isRequiredIt'),
        lastName: yup
            .string()
            .required('isRequiredIt'),
    });
    const formik = useFormik({
        initialValues: {
            id: '',
            firstName: '',
            lastName: '',
            email: ''
        },
        validationSchema: validationSchema,
        onSubmit: onSubmitEdit
    });

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        if (id !== undefined) {
            setIsLoading(true);
            getUser(id, {
                signal: controller.signal
            })
                .then((response) => {
                    const editedUser = response.data as UserDetailEntity;
                    setUser(editedUser);
                    if (isMounted) {
                        formik.setValues({ ...response.data });
                        let currentRoles = [...userRoles];
                        editedUser.userRoles.forEach((role) => {
                            const index = getUserRoleCheckboxIndex(role);
                            currentRoles[index] = { ...userRoles[index], checked: true };
                        })
                        setUserRoles([...currentRoles]);
                    }
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                })
        }

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    async function onSubmitEdit(values: any) {
        if (id !== undefined) {
            setIsLoading(true);
            try {
                await updateUser(id,
                    {
                        firstName: values.firstName,
                        lastName: values.lastName
                    },
                    {
                        headers: { 'Content-type': 'application/json' }
                    });

                if (auth.roles && permissionHelper.hasRole(auth.roles, [roles.Admin])) {
                    const appliedRoles = userRoles.filter(x => x.checked).map(x => x.role);
                    const rolesToInsert = appliedRoles.filter(x => !user.userRoles.includes(x));
                    const rolesToDelete = user.userRoles.filter(x => !appliedRoles.includes(x));
                    await updateUserRoles(id,
                        {
                            rolesToInsert,
                            rolesToDelete
                        },
                        {
                            headers: { 'Content-type': 'application/json' }
                        });
                }
            }
            catch (err: any) {
                console.error(err);
            }
            finally {
                setIsLoading(false);
            }
            navigate(routes.userDetails.replace(":id", id));
        }
    }

    const handleCheckboxChange = (roleObj: RoleObject, value: boolean) => {
        let currentRoles = [...userRoles];
        const index = getUserRoleCheckboxIndex(roleObj.role);
        currentRoles[index] = { ...roleObj, checked: value };
        setUserRoles([...currentRoles]);
    }

    function getUserRoleCheckboxIndex(role: UserRole): number {
        const foundObj = userRoles.find((obj) => {
            return obj.role === role;
        });
        if (foundObj === undefined) {
            return -1;
        }
        return userRoles.indexOf(foundObj);
    }

return (isLoading ? <LoadingScreen isLoading={isLoading} />
        :
        <Container maxWidth="sm">
            <header>
                <h1>{t('editPage')}: {t('user')}</h1>
            </header>
            <form onSubmit={formik.handleSubmit}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            disabled
                            id="id"
                            name="id"
                            label="Id"
                            value={formik.values.id}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            disabled
                            id="email"
                            name="email"
                            label={t("email")}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </Grid>
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
                        <FormControl component="fieldset" style={{ display: "flex" }}>
                            <FormLabel component="legend">{t('roles')}</FormLabel>
                            <FormGroup>
                                {userRoles.map((roleObj) =>
                                    <FormControlLabel key={roleObj.role} control={
                                        <Checkbox
                                            {...roleObj?.props}
                                            checked={roleObj.checked ? true : false}
                                            onChange={(ev, value) => { handleCheckboxChange(roleObj, value) }} />}
                                        label={t<string>(UserRole[roleObj.role])} />
                                )}
                            </FormGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            {t("submit")}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>)
}

export default UserEdit