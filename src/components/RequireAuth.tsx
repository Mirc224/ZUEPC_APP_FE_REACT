import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import routes  from '../endpoints/routes.endpoints';

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
                ? <Navigate to={routes.unauthorized} replace />
                : <Navigate to={routes.login} replace/>
    );
}

export default RequireAuth;