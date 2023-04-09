import { axiosInstance } from "./axios-config";

const uploadFile = async (formData) => {
    const response = await axiosInstance.post(
        "/upload-file", 
        formData
    )
    return response.data;
}

const downloadFile = async (data) => {
    const response = await axiosInstance.post(
        "/download-file", 
        data
    )
    return response.data;
}

export {uploadFile, downloadFile};