import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router';
import routes from '../../endpoints/routes.endpoints';
import useAuth from '../../hooks/useAuth';
import useUserService from '../../hooks/useUserService';
import { ApiUser } from '../../types/auth/types';
import ClipLoader from "react-spinners/ClipLoader";
import { Paper } from '@mui/material';
import roles from '../../constatns/roles.constants';

type Props = {}

const UserDetail = (props: Props) => {
    const { id } = useParams();
    const { t } = useTranslation();
    const { getUser } = useUserService();
    const {auth, setAuth} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<ApiUser>(undefined!);
    const [canEdit, setCanEdit] = useState(auth.roles?.includes(roles.Admin));

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        if (id !== undefined)
        {
            setIsLoading(true);
            getUser(id, {
                signal: controller.signal
            })
            .then((response) => {
                    isMounted && setUser(response.data);
                    setIsLoading(false);
            })
            .catch((err) => {
                setAuth({});
                navigate(routes.login, { state: { from: location }, replace: true });
            })
        }

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

  return (
      <article>
          {isLoading
              ?
              <div className="spinner">
                  <ClipLoader loading={isLoading} size={100} />
              </div>
              :
              <Paper>
                <header>
                    <h1>{t('user')} ({id})</h1>
                </header>
              </Paper>}
      </article>
  )
}

export default UserDetail