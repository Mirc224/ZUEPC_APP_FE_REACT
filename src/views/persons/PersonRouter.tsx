import { Route, Routes } from "react-router";
import routes from "../../endpoints/routes.endpoints";
import Persons from "./Persons";
import ROLES from '../../constatns/roles.constants';
import RequireAuth from "../../components/RequireAuth";
import PersonCreate from "./PersonCreate";

type Props = {}

const PersonRoutes = (props: Props) => {
    const getPath = (path: string): string => {
        let index = path.indexOf('/', 1);
        if (index === -1) return '';
        return path.substring(index);
    }
    return (
        <Routes>
            <Route path={getPath(routes.persons)} element={<Persons />} />
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}>
                <Route path={getPath(routes.personCreate)} element={<PersonCreate />} />
            </Route>
        </Routes>
    )
}

export default PersonRoutes;