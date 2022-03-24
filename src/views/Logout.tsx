import React, { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';
import routes from '../endpoints/routes.endpoints';
import useAuth from '../hooks/auth/useAuth';
import useLogout from '../hooks/auth/useLogout';

type Props = {}

const Logout = (props: Props) => {
    const { t } = useTranslation();
    const logout = useLogout();
    const { setAuth } = useAuth();
   
   useEffect(() => {
     logout();
     setAuth({});
     localStorage.clear();
   }, [])
   
  return (
    <>
      <p>{t('logoutMessage')}</p>
      <Navigate to={routes.login} replace />
    </>
  )
}

export default Logout