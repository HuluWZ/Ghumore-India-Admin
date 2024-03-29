import axios from "axios";
const url = import.meta.env.VITE_API_URL;
const token = localStorage.getItem("token") || "";

  //impliment crud operations
  export const getCategories = async () => {
    console.log(" Get All Category - ")
    const response = await axios.get(`${url}activity/get`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(" Category - " , response.data)

    return response.data;
};

export const createCategory = async (data: any) => {
    const formData = new FormData();
    console.log(" Data  ",data)
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("overview",data.overview)
    formData.append("category",data.category)
    formData.append("location",data.location)
    formData.append("duration",data.duration)
    formData.append("durationType",data.durationType)
    formData.append("startDate",data.startDate)
    formData.append("endDate",data.endDate)
    formData.append("lastBookingDate",data.lastBookingDate)
    formData.append("organizer",data.organizer)
    formData.append("price",data.price)
    formData.append("rating",data.rating)
    formData.append("totalCapacity", data.totalCapacity)
    data?.images?.map((image:any) => {
        formData.append("images", image);
    })
    data?.options.forEach((option:any, index:number) => {
      formData.append(`options[${index}][name]`, option.name);
      formData.append(`options[${index}][description]`, option.description);
      formData.append(`options[${index}][unitPrice]`, option.unitPrice);
      
      option.time.forEach((time:any, timeIndex:number) => {
        formData.append(`options[${index}][time][${timeIndex}]`, time);
      });
    });


    console.log(" Activity data = ", formData)
    // console.log(" Options ",data.options)
    const response = await axios.post(`${url}activity/create`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        },
    });
    console.log(" Activity Upload response = ", response)
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
    const formData = new FormData();
    var isImage = ""
    console.log(" Data  ", data)
    if (data.name) {
        formData.append("name", data.name)
    }
    if (data.description) {
        formData.append("description", data.description)
    }
        if (data.overview) {
        formData.append("overview", data.overview)
    }
    if (data.category) {
        formData.append("category", data.category)
    }
        if (data.location) {
        formData.append("location", data.location)
    }
    if (data.duration) {
        formData.append("duration", data.duration)
    }
    if (data.durationType) {
        formData.append("durationType", data.durationType)
    }
    if (data.startDate) {
        formData.append("startDate", data.startDate)
    }
    if (data.endDate) {
        formData.append("endDate", data.endDate)
    }

    if (data.lastBookingDate) {
        formData.append("lastBookingDate", data.lastBookingDate)
    }
        if (data.organizer) {
        formData.append("organizer", data.organizer)
    }
    if (data.price) {
        formData.append("price", data.price)
    }
        if (data.rating) {
        formData.append("rating", data.rating)
    }

    if (data.totalCapacity) {
        formData.append("totalCapacity", data.totalCapacity)
    }

    if (data.images.length > 0) {
        isImage ="image"
        data?.images?.map((image:any) => {
            formData.append("images", image);
        })
    }

    const response = await axios.put(`${url}activity/update/${id}`, formData, {
        headers: {
            "Content-Type":isImage? "multipart/form-data":"application/json",
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

