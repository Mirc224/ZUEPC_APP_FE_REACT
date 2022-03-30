import { Route, Routes } from "react-router";
import ROUTES from "../../endpoints/routes.endpoints";
import ROLES from '../../constatns/roles.constants';
import Persons from "./Persons";
import RequireAuth from "../../components/RequireAuth";
import PersonCreate from "./PersonCreate";
import PersonDetail from "./PersonDetail";
import PersonEdit from "./PersonEdit";
import Missing from "../Missing";

type Props = {}

const PersonRouter = (props: Props) => {
    const getPath = (path: string): string => {
        let index = path.indexOf('/', 1);
        if (index === -1) return '';
        return path.substring(index);
    }
    return (
        <Routes>
            <Route path={getPath(ROUTES.persons)} element={<Persons />} />
            <Route path={getPath(ROUTES.personDetails)} element={<PersonDetail />} />
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}>
                <Route path={getPath(ROUTES.personCreate)} element={<PersonCreate />} />
                <Route path={getPath(ROUTES.personEdit)} element={<PersonEdit />} />
            </Route>
            <Route path='*' element={<Missing />} />
        </Routes>
    )
}

export default PersonRouter;