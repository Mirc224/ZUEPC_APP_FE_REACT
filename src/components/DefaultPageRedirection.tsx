import React from 'react'
import useAuth from '../hooks/auth/useAuth'
import { Navigate } from 'react-router-dom'
import ROUTES from '../endpoints/routes.endpoints'

type Props = {}

const DefaultPageRedirection = (props: Props) => {
    const { auth } = useAuth();
    return (
        <>
            {auth.token ?
                <Navigate to={ROUTES.publications} />
                :
                <Navigate to={ROUTES.login} />
            }
        </>
    )
}

export default DefaultPageRedirection