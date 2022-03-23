import { Outlet } from 'react-router-dom';
import { useState, useEffect} from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { authHelper } from '../helpers/auth.helper';
import ClipLoader from "react-spinners/ClipLoader";

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
            ? <div className='spinner'>
                <ClipLoader loading={isLoading} size={100} />
              </div>
            : <Outlet/>}
    </>)
}
export default PersistLogin;