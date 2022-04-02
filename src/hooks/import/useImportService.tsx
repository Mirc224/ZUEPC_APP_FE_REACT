import useAxiosPrivate from '../useAxiosPrivate';
import apiEndpoints from '../../endpoints/api.endpoints';

const useImportService = () => {
    const axiosPrivateClient = useAxiosPrivate();

    const uploadFile = async (source: string, formData: FormData, params: any) => {
        return axiosPrivateClient
            .post(apiEndpoints
                .import
                .replace(":importSystem", source),
                formData, 
                { ...params });
    }
    return { uploadFile }
}

export default useImportService
