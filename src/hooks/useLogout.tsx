import useAuth from "./useAuth";
import apiEndoints from "../endpoints/api.endpoints";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
    const {auth} = useAuth();
    const axiosPrivateClient = useAxiosPrivate();
    const logout = async () => {
        if (!auth.token) {
            return;
        }
        try {
            const response = await axiosPrivateClient.post(apiEndoints.logout, {}, {
            });
        }
        catch (err) {
            console.error(err);
        }
    }
  return logout;
}

export default useLogout