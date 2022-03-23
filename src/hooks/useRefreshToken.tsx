import { axiosClient } from '../utils/axios-utils';
import useAuth from './useAuth';
import apiEndpoints from '../endpoints/api.endpoints';
import { UserAuthContent } from '../contexts/AuthContext';
import { authHelper } from '../helpers/auth.helper';


const useRefreshToken = () => {
    const {auth, setAuth} = useAuth();

    const refresh = async () => {
        const response = await axiosClient.post(apiEndpoints.refreshToken, 
            {
                token: authHelper.getAccessToken(),
                refreshToken: authHelper.getRefreshToken()
            },
            { headers: { 'Content-type': 'application/json' }});
        
        setAuth((prev: UserAuthContent) => {
            const userAuthContent = authHelper.getUserAuthToken(response.data);
            authHelper.storeAccessToken(userAuthContent.token);
            authHelper.storeRefreshToken(userAuthContent.refreshToken);
            return { ...userAuthContent};
        });
        return response.data.token;
    }
  return refresh;
}

export default useRefreshToken