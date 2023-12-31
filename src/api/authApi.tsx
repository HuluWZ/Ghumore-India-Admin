import axios from "axios";

const api = import.meta.env.VITE_API_URL;
const url = `${api}auth`;
const token = localStorage.getItem("token") || "";

export const register = async (data: any) => {
    try {
        const response = await axios.post(`${url}/create`, data)
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (data: any) => {
    try {
        console.log(" Login ",data,`${url}/login`)
        const response = await axios.post(`${url}/login`, data);
        console.log(" Login ",response,data)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await axios.get(`${url}/logout`, {
            headers: {
                "Authorization": `${token}`,
                "Content-Type":"application/json"
        }});
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


