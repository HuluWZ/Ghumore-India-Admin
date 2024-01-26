import axios from "axios";
const url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token") || "";


  export const getCategories = async () => {
    console.log(" Get All Review - ")
    const response = await axios.get(`${url}feedback/get`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(" Review api- " , response.data)
  
    return response.data;
};

export const createCategory = async (data: any) => {
    delete data.id
    console.log("  Feedback Data  ",data)
    const response = await axios.post(`${url}feedback/create`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    console.log(" feedback Upload response = ", response)
    return response.data;
};

//get category by id
export const getCategoryById = async (id: any) => {
    const response = await axios.get(`${url}feedback/get/${id}`, {
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

//update category
export const updateCategory = async (id: any, data: any) => {
    const response = await axios.put(`${url}feedback/update/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};


export const deleteCategory = async (id: any) => {
    console.log(" Delete Feedback ",id,url)
    const response = await axios.delete(`${url}feedback/delete/${id}`, {
        headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
        },
    });
    console.log(" Delete Feedback Response ", response);
    return response.data;
}








