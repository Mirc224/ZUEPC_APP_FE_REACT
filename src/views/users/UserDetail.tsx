import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router';
import routes from '../../endpoints/routes.endpoints';
import useAuth from '../../hooks/auth/useAuth';
import useUserService from '../../hooks/users/useUserService';
import { Container } from '@mui/material';
import LoadingScreen from '../../components/LoadingScreen';
import ItemPageHeader from '../../components/ItemPageHeader';
import { UserRole } from '../../enums/role.enum';
import { UserDetailEntity } from '../../types/auth/entities.types';

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


    const handleOnClickEdit = () => {
        navigate(routes.userEdit.replace(":id", user.id.toString()));
    }

    return (
        <article>
            {isLoading || user === undefined
                ?
                <LoadingScreen isLoading={isLoading} />
                :
                <Container>
                    <ItemPageHeader
                        title={`${t('user')} (${user.id})`}
                        onClickEdit={handleOnClickEdit}
                    />
                    <main>
                        <h2>{user.email}</h2>
                        <h3>{`${user.firstName} ${user.lastName}`}</h3>
                        <h4>{t('roles')}</h4>
                        {user.userRoles?.length > 0 ?
                            <ul>
                                {user.userRoles.map((role: UserRole) => <li key={role} >{t(UserRole[role])}</li>)}
                            </ul>
                            :
                            <></>}
                    </main>
                </Container>}
        </article>
    )
}

export default UserDetail