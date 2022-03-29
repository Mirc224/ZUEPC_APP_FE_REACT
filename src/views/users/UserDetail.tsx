import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router';
import routes from '../../endpoints/routes.endpoints';
import useAuth from '../../hooks/auth/useAuth';
import useUserService from '../../hooks/users/useUserService';
import { Container, Typography } from '@mui/material';
import LoadingScreen from '../../components/common/LoadingScreen';
import ItemPageHeader from '../../components/itemPage/ItemPageHeader';
import { UserRole } from '../../enums/role.enum';
import { UserDetailEntity } from '../../types/auth/entities.types';
import ItemDetailPageBase from '../../components/itemPage/ItemDetailPageBase';
import ItemDataSection from '../../components/itemPage/ItemDataSection';

type Props = {}

const UserDetail = (props: Props) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const { getUser } = useUserService();
    const { auth, setAuth } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<UserDetailEntity>(undefined!);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        if (id !== undefined) {
            setIsLoading(true);
            getUser(id, {
                signal: controller.signal
            })
                .then((response) => {
                    isMounted && setUser(response.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setAuth({});
                    navigate(routes.login, { state: { from: location }, replace: true });
                })
        }

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])


    const handleClickEdit = () => {
        navigate(routes.userEdit.replace(":id", user.id.toString()));
    }

    return (
        <ItemDetailPageBase
            isLoading={isLoading}
            title={`${t('user')} (${id})`}
            onClickEdit={handleClickEdit}
        >
            {user &&
                <Container>
                    <ItemDataSection title={`${t("basic")} ${t('informations').toLowerCase()}`} >
                            <Typography component="p" variant="body2">
                                <strong>{t('email')}:</strong> {user.email}
                            </Typography>
                    </ItemDataSection>
                    <ItemDataSection title={`${t("firstName")}/${t("lastName")}`}>
                        <Typography component="p" variant="body2">
                            {`${user.firstName} ${user.lastName}`}
                        </Typography>
                    </ItemDataSection>
                    <ItemDataSection title={t("roles")}>
                        {user.userRoles?.length > 0 &&
                            <ul>
                                {user.userRoles.map((role: UserRole) => <li key={role} >{t(UserRole[role])}</li>)}
                            </ul>}
                    </ItemDataSection>
                </Container>}
        </ItemDetailPageBase>
    )
}

export default UserDetail