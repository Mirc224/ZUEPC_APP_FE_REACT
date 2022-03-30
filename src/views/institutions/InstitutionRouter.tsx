import React from 'react'
import { Route, Routes } from 'react-router';
import RequireAuth from '../../components/RequireAuth';
import ROUTES from '../../endpoints/routes.endpoints';
import ROLES from '../../constatns/roles.constants';
import Institutions from './Institutions';
import InstitutionDetail from './InstitutionDetail';
import InstitutionCreate from './InstitutionCreate';
import InstitutionEdit from './InstitutionEdit';
import Missing from '../Missing';

type Props = {}

const InstitutionRouter = (props: Props) => {
    const getPath = (path: string): string => {
        let index = path.indexOf('/', 1);
        if (index === -1) return '';
        return path.substring(index);
    }
    return (
        <Routes>
            <Route path={getPath(ROUTES.institutions)} element={<Institutions />} />
            <Route path={getPath(ROUTES.institutionDetails)} element={<InstitutionDetail />} />
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}>
                <Route path={getPath(ROUTES.institutionCreate)} element={<InstitutionCreate />} />
                <Route path={getPath(ROUTES.institutionEdit)} element={<InstitutionEdit />} />
            </Route>
            <Route path='*' element={<Missing />} />
        </Routes>
    )
}

export default InstitutionRouter