import { Checkbox,FormControl, FormControlLabel, FormGroup, Grid} from '@mui/material';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import useUserService from '../../hooks/users/useUserService';
import { UserDetailEntity } from '../../types/auth/entities.types';
import { permissionHelper } from '../../helpers/permission.helper';
import roles from '../../constatns/roles.constants';
import useAuth from '../../hooks/auth/useAuth';
import ROUTES from '../../endpoints/routes.endpoints';
import { UserRole } from '../../enums/role.enum';
import SubmitResetForm from '../../components/SubmitResetForm';
import { FormikFieldSchema } from '../../types/common/component.types';
import { userBasicInfoSchema } from '../../form-schemas/user.schema';
import ItemDataSection from '../../components/itemPage/ItemDataSection';
import CRUDItemPageBase from '../../components/itemPage/CRUDItemPageBase';

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
    const [basicInfoSchema, setBasicInfoSchema] = useState<FormikFieldSchema[]>([])
    const navigate = useNavigate();
    const formName = 'whole-form';


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
                    const resBasicInfoSchema = userBasicInfoSchema;
                    if (isMounted) {
                        setUser(editedUser);
                        isMounted && setBasicInfoSchema([
                            ...resBasicInfoSchema.map(x => {
                                return { ...x, initValue: editedUser[x.name as keyof UserDetailEntity] }
                            })
                        ])
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

    async function onSubmitEdit(values: any, dirty: boolean) {
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
            navigate(ROUTES.userDetails.replace(":id", id));
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

    return (
        <CRUDItemPageBase
            title={`${t('editPage')}: ${t('user')}(${id})`}
            wholeFormId={formName}
            isLoading={isLoading}
        >
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <ItemDataSection title={`${t("basic")} ${t('informations').toLowerCase()}`} >
                        <SubmitResetForm
                            direction="column"
                            formId={formName}
                            onSubmit={onSubmitEdit}
                            fields={basicInfoSchema}
                        />
                    </ItemDataSection>
                </Grid>
                <Grid item xs={12}>
                    <ItemDataSection title={t("roles")} >
                        <FormControl component="fieldset" style={{ display: "flex" }}>
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
                    </ItemDataSection>
                </Grid>
            </Grid>
        </CRUDItemPageBase>)
}

export default UserEdit