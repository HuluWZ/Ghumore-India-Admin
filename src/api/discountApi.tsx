import axios from "axios";

// Base URL for the request
const api = import.meta.env.VITE_API_URL;
const url = `${api}location`;

//Heders for the request
const token = localStorage.getItem("token");

export const getDiscounts = async () => {
    try {
        const response = await axios.get(`${url}/get`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getDiscount = async (id: string) => {
    try {
        const response = await axios.get(`${url}/get/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(" Get All Location from Discount ", response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const createDiscount = async (data: any) => {
    try {
    const formData = new FormData();
    console.log(" Data  ",data.parent)
    formData.append("name", data.name)
    formData.append("image", data.image)
    formData.append("url", data.url)
    if (data.parent) {
        formData.append("parent",data.parent)
    }

        console.log(" Location Values ",formData)
        const response = await axios.post(`${url}/create/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(" Create Location ", response);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const updateDiscount = async (id: string, data: any) => {
    try {
        var isImage = ""
        const formData = new FormData();
        if (data.name) {
            formData.append("name", data.name)
        }
        if (data.image) {
            formData.append("image", data.image)
            isImage = "image"
        }
        if (data.url) {
            formData.append("url", data.url)
        }
        if (data.parent.length > 4) {
        formData.append("parent",data.parent)
    }

        console.log(" Data  ", formData)

        const response = await axios.put(`${url}/update/${id}`, formData, {
            headers: {
               "Content-Type": isImage ? "multipart/form-data" :"application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(" Update Location ", response);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const deleteDiscount = async (id: string) => {
    try {
        const response = await axios.delete(`${url}/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}   