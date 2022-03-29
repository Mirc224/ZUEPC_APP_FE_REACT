import React from 'react'
import { Route, Routes } from 'react-router';
import RequireAuth from '../../components/RequireAuth';
import routes from '../../endpoints/routes.endpoints';
import ROLES from '../../constatns/roles.constants';
import Institutions from './Institutions';
import InstitutionDetail from './InstitutionDetail';
import InstitutionCreate from './InstitutionCreate';
import InstitutionEdit from './InstitutionEdit';

type Props = {}

const InstitutionRouter = (props: Props) => {
    const getPath = (path: string): string => {
        let index = path.indexOf('/', 1);
        if (index === -1) return '';
        return path.substring(index);
    }
    return (
        <Routes>
            <Route path={getPath(routes.institutions)} element={<Institutions />} />
            <Route path={getPath(routes.institutionDetails)} element={<InstitutionDetail />} />
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}>
                <Route path={getPath(routes.institutionCreate)} element={<InstitutionCreate />} />
                <Route path={getPath(routes.institutionEdit)} element={<InstitutionEdit />} />
            </Route>
        </Routes>
    )
}

export default InstitutionRouter