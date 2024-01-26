import axios from "axios";
import { log } from "console";

const api = import.meta.env.VITE_API_URL;
const url = `${api}category`;

const token = localStorage.getItem("token");

export const getSales = async () => {
    const response = await axios.get(`${url}/get`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(" All sales ", response?.data);
    return response.data;
};

export const createSale = async (data: any) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image);
    if (data.parent) {
        formData.append("parent",data.parent);
    }
    console.log(" Category Values ",data)
    const response = await axios.post(`${url}/create`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(" Category Response ",response)
    return response.data;
}

export const updateSale = async (id: string, data: any) => {
    const formData = new FormData();
    var isImage = ""
    if (data.parent.length > 4) {
        formData.append("parent",data.parent);
    }

        if (data.name) {
        formData.append("name",data.name);
    }

        if (data.image) {
            formData.append("image", data.image);
            isImage = "Image"
    }
    
    console.log(" Category Data :",formData,isImage)

    const response = await axios.put(`${url}/update/${id}`, formData, {
        headers: {
            "Content-Type": isImage ? "multipart/form-data" :"application/json",
            Authorization: `Bearer ${token}`,
        },
    });
        console.log(" Category Response ",response)
    return response.data;
}

export const deleteSale = async (id: string) => {
    const response = await axios.delete(`${url}/delete/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}


export const getAllReport = async () => {
    const response = await axios.get(`${url}/report`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}


export const getReportByWeek = async () => {
    try {
                console.log(" Weekly Report  Before",`${api}booking/week/`)
        const response = await axios.get(`${api}booking/week/`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(" Weekly Report ",response.data)
        return response.data;
    } catch (error) {
        console.error(error)

    }
}


export const getSalesDetails = async (id: string) => {
    try {
        const response = await axios.get(`${url}/get/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error(error)
    }
};
