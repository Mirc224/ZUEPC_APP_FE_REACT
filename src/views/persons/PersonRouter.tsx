import { Route, Routes } from "react-router";
import routes from "../../endpoints/routes.endpoints";
import Persons from "./Persons";

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
        </Routes>
    )
}

export default PersonRoutes;