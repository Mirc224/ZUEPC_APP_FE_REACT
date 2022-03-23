import apiEndoints from "../endpoints/api.endpoints";
import useAxiosPrivate from "./useAxiosPrivate";
import apiEndpoints from "../endpoints/api.endpoints";

const useUserService = () => {
    const axiosPrivateClient = useAxiosPrivate();

    const getUsers = async (params: any) => {
        return axiosPrivateClient.get(apiEndpoints.users, {
            ...params
        });
    }
    const getUser = async (id: string, params: any) => {
        return axiosPrivateClient.get(apiEndpoints.userDetail.replace(":id", id.toString()), {
            ...params
        });
    }
    return { getUsers, getUser };
}

export default useUserService;