import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";
import ROUTES  from '../endpoints/routes.endpoints';

type Props = {
    allowedRoles?: string[] | undefined
}

const RequireAuth = ({allowedRoles}: Props) => {
    const {auth} = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet/> 
            : auth?.id 
                ? <Navigate to={ROUTES.unauthorized} replace />
                : <Navigate to={ROUTES.login} replace/>
    );
}

export default RequireAuth;