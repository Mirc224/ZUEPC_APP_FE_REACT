import { Outlet } from 'react-router-dom';
import { useState, useEffect} from 'react';
import useRefreshToken from '../hooks/auth/useRefreshToken';
import useAuth from '../hooks/auth/useAuth';
import { authHelper } from '../helpers/auth.helper';
import LoadingScreen from './LoadingScreen';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                const accessToken = authHelper.getAccessToken();
                const refreshToken = authHelper.getRefreshToken();
                if(accessToken && refreshToken)
                {
                    await refresh();
                }
            }
            catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        }
        !auth?.token ? verifyRefreshToken() : setIsLoading(false);

        return () => {
            isMounted = false;
        }
    }, []);
    
    
    return (<>
        {isLoading 
            ? <LoadingScreen isLoading={isLoading}/>
            : <Outlet/>}
    </>)
}
export default PersistLogin;