import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axioslnstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try{
        const response = await axiosInstance.post (API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // set header for file upload
            },
        });
        return response.data; //Return response data
    } catch (error) {
        console.error("Image upload failed:", error);
        throw error;//Rethrow error for handling
    }
};

export default uploadImage;