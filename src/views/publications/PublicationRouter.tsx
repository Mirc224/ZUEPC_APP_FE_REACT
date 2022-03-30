import React from 'react'
import { Route, Routes } from 'react-router';
import ROUTES from "../../endpoints/routes.endpoints";
import ROLES from '../../constatns/roles.constants';
import Publications from './Publications';
import Missing from '../Missing';
import PublicationDetail from './PublicationDetail';

type Props = {}

const PublicationRouter = (props: Props) => {
    const getPath = (path: string): string => {
        let index = path.indexOf('/', 1);
        if (index === -1) return '';
        return path.substring(index);
    }
    return (
        <Routes>
            <Route path={getPath(ROUTES.publications)} element={<Publications />} />
            <Route path={getPath(ROUTES.publicationDetails)} element={<PublicationDetail />} />
            {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}>
                <Route path={getPath(ROUTES.publicationCreate)} element={<PublicationCreate />} />
                <Route path={getPath(ROUTES.publicationEdit)} element={<PublicationEdit />} />
            </Route> */}
            <Route path='*' element={<Missing />} />
        </Routes>
    )
}

export default PublicationRouter