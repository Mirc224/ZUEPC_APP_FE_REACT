import useAxiosPrivate from "../useAxiosPrivate";
import apiEndpoints from "../../endpoints/api.endpoints";
import { CreatePersonWithDetailsCommand, UpdatePersonWithDetailsCommand } from "../../types/api/persons/commands.types";

const usePersonService = () => {
    const axiosPrivateClient = useAxiosPrivate();

    const getPersons = async (params: any) => {
        return axiosPrivateClient.get(apiEndpoints.persons, {
            ...params
        });
    }
    const getPerson = async (id: string, params: any) => {
        return axiosPrivateClient.get(apiEndpoints.personDetail.replace(":id", id.toString()), {
            ...params
        });
    }

    const updatePerson = async (id: string, updateUserCommand: UpdatePersonWithDetailsCommand, params: any) => {
        return axiosPrivateClient.put(apiEndpoints.personEdit.replace(":id", id), { ...updateUserCommand }, { ...params });
    }

    const createPerson = async (createUserCommand: CreatePersonWithDetailsCommand, params: any) => {
        return axiosPrivateClient.post(apiEndpoints.personCreate, { ...createUserCommand }, { ...params });
    }

    const deletePerson = async (id: string, params: any) => {
        return axiosPrivateClient.delete(apiEndpoints.personDelete.replace(":id", id.toString()), {
            ...params
        });
    }

    return { getPersons, getPerson };
}

export default usePersonService;