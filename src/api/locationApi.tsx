import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const api = `${url}location/`;


const token = localStorage.getItem("token") || "";

//get all categories
export const getCustomers = async () => {
    console.log(" Get  Data Location ",`${api}get`)
    const response = await axios.get(`${api}get`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(" ALL Locations ", response.data)
    return response.data;
}

//create category
export const createCustomer = async (data: any) => {
    console.log(" Add Location : ", data,api)
    const response = await axios.post(`${api}create`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(" Response : ", response.data);

    return response.data;
}


//get category by id
export const getCustomerById = async (id: any) => {
    const response = await axios.get(`${api}get/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

//update category
export const updateCustomer = async (id: any, data: any) => {
    const response = await axios.put(`${api}update/${id}`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}


export const deleteCustomer = async (id: any) => {
    const response = await axios.delete(`${api}delete/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}

