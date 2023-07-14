import axios from "axios";

// Base URL for the request
const api = import.meta.env.VITE_API_URL;
const url = `${api}auth`;

//Heders for the request
const token = localStorage.getItem("token");


export const getProducts = async () => {
    try {
        const response = await axios.get(`${url}/get`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(" All Products - ",response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getProduct = async (id: string) => {
    try {
        console.log(" Get Product -  ",id)
        const response = await axios.get(`${url}/get/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const createProduct = async (data: any) => {
    try {
        const response = await axios.post(`${url}/create`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(" Create Product -  ",response?.data,data)
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (id: string, data: any) => {
    try {

        const response = await axios.put(`${url}/update/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(" Data  - ", { id, data }, " Response - ", response);

        return response.data;

    } catch (error) {
        console.log(error)
        console.error(error);
    }
}


export const deleteProduct = async (id: string) => {
    try {
        console.log(`${url}/delete/${id}`, id)
        const response = await axios.delete(`${url}/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Delete Product Response ", response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


export const getStock = async () => {
    const response = await axios.get(`${url}/stock`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

