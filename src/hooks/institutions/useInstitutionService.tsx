import apiEndpoints from '../../endpoints/api.endpoints';
import { CreateInstitutionWithDetailsCommand, UpdateInstitutionWithDetailsCommand } from '../../types/institutions/commands.types';
import useAxiosPrivate from '../useAxiosPrivate';

const useInstitutionService = () => {
    const axiosPrivateClient = useAxiosPrivate();

    const getInstitutionsPreviews = async (params: any) => {
        return axiosPrivateClient.get(apiEndpoints.institutions, {
            ...params
        });
    }
    const getInstitutionDetails = async (id: string, params: any) => {
        return axiosPrivateClient.get(apiEndpoints.institutionDetail.replace(":id", id.toString()), {
            ...params
        });
    }

    const createInstitution = 
    async (createInstitutionCommand: CreateInstitutionWithDetailsCommand, params: any) => {
        return axiosPrivateClient.post(apiEndpoints.institutionCreate, { ...createInstitutionCommand }, { ...params });
    }

    const updateInstitution = 
    async (updateInstitutionCommand: UpdateInstitutionWithDetailsCommand, params: any) => {
        return axiosPrivateClient
            .put(apiEndpoints.institutionEdit.replace(":id", updateInstitutionCommand.id ? updateInstitutionCommand.id?.toString() : "0"),
                { ...updateInstitutionCommand },
                { ...params });
    }

    const deleteInstitution = async (id: string, params: any) => {
        return axiosPrivateClient.delete(apiEndpoints.institutionDelete.replace(":id", id.toString()), {
            ...params
        });
    }

    return { getInstitutionsPreviews, getInstitutionDetails, createInstitution,  updateInstitution, deleteInstitution };
}

export default useInstitutionService