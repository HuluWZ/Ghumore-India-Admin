import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const api = `${url}auth/`;


const token = localStorage.getItem("token") || "";

//get all categories
export const getCustomers = async () => {
    // console.log(" Get  Data Customer ",`${api}get`)

    const response = await axios.get(`${api}get`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(" Customers ", response.data)
    return response.data;
}

//create category
export const createCustomer = async (data: any) => {
    const response = await axios.post(`${api}create`, data, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

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


export const register = async (data: any) => {
    try {
        const response = await axios.post(`${api}create`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (data: any) => {
    try {
        console.log(" Login  Data Customer ",`${api}login`,data)
        const response = await axios.post(`${api}login`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(" Login Response ",response)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await axios.get(`${api}/logout`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}