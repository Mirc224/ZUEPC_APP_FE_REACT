import useAxiosPrivate from "../useAxiosPrivate";
import apiEndpoints from "../../endpoints/api.endpoints";
import { CreatePersonWithDetailsCommand, UpdatePersonWithDetailsCommand } from "../../types/persons/commands.types";

const usePersonService = () => {
    const axiosPrivateClient = useAxiosPrivate();

    const getPersonsPreviews = async (params: any) => {
        return axiosPrivateClient.get(apiEndpoints.persons, {
            ...params
        });
    }
    
    const getPersonDetails = async (id: string, params: any) => {
        return axiosPrivateClient.get(apiEndpoints.personDetail.replace(":id", id.toString()), {
            ...params
        });
    }

    const getPersonPreview = async (id: string, params: any) => {
        return axiosPrivateClient.get(apiEndpoints.personPreview.replace(":id", id.toString()), {
            ...params
        });
    }

    const createPerson = async (createPersonCommand: CreatePersonWithDetailsCommand, params: any) => {
        return axiosPrivateClient.post(apiEndpoints.personCreate, { ...createPersonCommand }, { ...params });
    }

    const updatePerson = async (updatePersonCommand: UpdatePersonWithDetailsCommand, params: any) => {
        return axiosPrivateClient
        .put(apiEndpoints.personEdit.replace(":id", updatePersonCommand.id ? updatePersonCommand.id?.toString() : "0" ), 
        { ...updatePersonCommand },
        { ...params });
    }

    const deletePerson = async (id: string, params: any) => {
        return axiosPrivateClient.delete(apiEndpoints.personDelete.replace(":id", id.toString()), {
            ...params
        });
    }

    const getPersonNames = async (params: any) => {
        return axiosPrivateClient.get(apiEndpoints.personNames, {
            ...params
        });
    }
    
    return { getPersonPreview, getPersonNames, getPersonsPreviews, getPersonDetails, createPerson, updatePerson, deletePerson };
}

export default usePersonService;