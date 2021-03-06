import API_ENDPOINTS from "../../endpoints/api.endpoints";
import useAxiosPrivate from "../useAxiosPrivate";
import useAuth from "./useAuth";

const useLogout = () => {
    const {auth} = useAuth();
    const axiosPrivateClient = useAxiosPrivate();
    const logout = async () => {
        if (!auth.token) {
            return;
        }
        try {
            const response = await axiosPrivateClient.post(API_ENDPOINTS.logout, {}, {
            });
        }
        catch (err) {
            console.error(err);
        }
    }
  return logout;
}

export default useLogout