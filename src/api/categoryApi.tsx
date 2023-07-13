import axios from "axios";
const url = import.meta.env.VITE_API_URL;

const token = localStorage.getItem("token") || "";


//impliment crud operations
export const getCategories = async () => {
    const response = await axios.get(`${url}activity/get`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
        console.log(" Category  = " , response.data)

    return response.data;
};

export const createCategory = async (data: any) => {
    console.log(" Activity data = "+ data,JSON.parse(JSON.stringify(data)))
    const response = await axios.post(`${url}activity/create`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(" Activity response = ", response)
    return response.data;
};

//get category by id
export const getCategoryById = async (id: any) => {
    const response = await axios.get(`${url}activity/get/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

//update category
export const updateCategory = async (id: any, data: any) => {
    const response = await axios.put(`${url}activity/update/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};


export const deleteCategory = async (id: any) => {
    const response = await axios.delete(`${url}activity/delete/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
}








