import React from 'react'
import apiEndpoints from '../../endpoints/api.endpoints';
import { CreatePublicationWithDetailsCommand, UpdatePublicationWithDetailsCommand } from '../../types/publications/commands.types';
import useAxiosPrivate from '../useAxiosPrivate';

const usePublicationService = () => {
    const axiosPrivateClient = useAxiosPrivate();

    const getPublicationPreviews = async (params: any) => {
        return axiosPrivateClient.get(apiEndpoints.publications, {
            ...params
        });
    }
    const getPublicationDetails = async (id: string, params: any) => {
        return axiosPrivateClient.get(apiEndpoints.publicationDetail.replace(":id", id.toString()), {
            ...params
        });
    }

    const createPublication = async (createPublicationCommand: CreatePublicationWithDetailsCommand, params: any) => {
        return axiosPrivateClient.post(apiEndpoints.publicationCreate, { ...createPublicationCommand }, { ...params });
    }

    const updatePublication = async (updatePublicationCommand: UpdatePublicationWithDetailsCommand, params: any) => {
        return axiosPrivateClient
            .put(apiEndpoints.publicationEdit.replace(":id", updatePublicationCommand.id ? updatePublicationCommand.id?.toString() : "0"),
                { ...updatePublicationCommand },
                { ...params });
    }

    const deletePublication = async (id: string, params: any) => {
        return axiosPrivateClient.delete(apiEndpoints.publicationDelete.replace(":id", id.toString()), {
            ...params
        });
    }

    return { getPublicationPreviews, getPublicationDetails, createPublication, updatePublication, deletePublication };
}

export default usePublicationService