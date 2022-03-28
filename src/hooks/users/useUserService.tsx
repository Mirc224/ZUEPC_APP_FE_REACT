import useAxiosPrivate from "../useAxiosPrivate";
import apiEndpoints from "../../endpoints/api.endpoints";
import { UpdateUserCommand, UpdateUserRolesCommand } from "../../types/user/commands.types";

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

    const updateUser = async (id: string, updateUserCommand: UpdateUserCommand, params: any) => {
        return axiosPrivateClient.put(apiEndpoints.userEdit.replace(":id", id), { ...updateUserCommand }, { ...params });
    }

    const updateUserRoles = async (id: string, updateUserRoles: UpdateUserRolesCommand, params: any) => {
        return axiosPrivateClient.put(apiEndpoints.userRoleEdit.replace(":id", id), { ...updateUserRoles }, {...params});
    }

    return { getUsers, getUser, updateUser, updateUserRoles};
}

export default useUserService;