import  { useState,useEffect } from 'react';
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import { ButtonGroup, Button } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input } from '@material-ui/core';
import { useDropzone } from "react-dropzone";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { Select,InputLabel } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { min } from 'moment';

const durationTypeList = ["days","hours","months","years"]
const api = import.meta.env.VITE_API_URL;

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3,4,5, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];
type FormDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleAdd: (values: any) => void;
    handleEdit: (values: any) => void;
    selectedCategory?: any;
    setSelectedCategory?: any;
};
interface Option {
      [key: string]: string | string[] | Option[] | undefined;
}



  
const formatData = (formData: any) => {
    const formDate = new FormData();
    formDate.append("name", formData.name)
    formDate.append("description", formData.description)
    formDate.append("price", formData.price)
    formDate.append("totalCapacity", formData.totalCapacity)
    formDate.append("duration", formData.duration)
    formDate.append("durationType", formData?.durationType)
    formDate.append("rating", formData?.rating)
    // formDate.append("location", formData.location)
    // formDate.append("category", formData.category)
    formDate.append("organizer", formData.organizer)
    formDate.append("startDate", formData.startDate)
    formDate.append("endDate", formData.endDate)
    formDate.append("lastBookingDate", formData.lastBookingDate)
    formDate.append("options", formData.options)
    formDate.append("include", formData?.include)
    formDate.append("exclude", formData?.exclude)

    const { images } = formData;
    console.log(" images ",images);
    images?.map((image:File) => {
        formDate.append("images", image);
    })

    return formDate;
  }
const FormDialog = ({
    open,
    handleClose,
    handleAdd,
    handleEdit,
    selectedCategory,
    setSelectedCategory,
}: FormDialogProps) => {
    const initialValues = {
        id: selectedCategory?.id || "",
        activity: selectedCategory ? selectedCategory.activity : "",
        message: selectedCategory ? selectedCategory.message : "",
        rating: selectedCategory ? selectedCategory.rating : "",
    };
    const [formData, setFormData] = useState({
        activity:  "",
        message: "",
        rating: "",
  })

    const validationSchema = Yup.object({
        rating: Yup.number().required("Required").min(1,"Rating can be minimum of 1").max(5,"Rating can  be maximum of 5"),
        message: Yup.string().required("Required"),
    });
    const [locations, setLocations] = useState([{ _id: '', name: '' }]);
    const [categories, setCategories] = useState([{ _id: '', name: '' }]);
    useEffect(() => {
        async function fetchLocations() {
            const response = await fetch(`${api}location/get`);
            const data = await response.json();
            console.log(" Get All Locations ", data?.location)
            setLocations(data?.location);
        }
        fetchLocations();
    }, []);
    
    useEffect(() => {
        async function fetchCategorys() {
            const response = await fetch(`${api}activity/get`);
            const data = await response.json();
            console.log(" Get All Activity ", data?.activity)
            setCategories(data?.activity);
        }
        fetchCategorys();
    }, []);
    const [options, setOptions] = useState<Option[]>([{ name: '', description: '', unitPrice: '', time: [''] }]);
    const [content, setContent] = useState('');
    const [description,setDescription] = useState("")
    const [durationType, setDurationType] = useState('');

    const [location, setLocation] = useState('')
    const [category, setCategory] = useState('')
    const [activity, setActivity] = useState('')

    // const [images, setImages] = useState<File[]>([]);
    // Drop Zone TODO
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [uploadStatus, setUploadStatus] = useState("");
  
    
    const handleDurationTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDurationType(event.target.value);
    }
    const handleLocationChange = (event: React.ChangeEvent<{ value?: string | unknown }>) => {
        setLocation(event.target.value as string);
    }
  
    const handleCategoryChange = (event: React.ChangeEvent<{ value?: string | unknown}>) => {
        setCategory(event.target.value as string);
    }
    const handleActivityChange = (event: React.ChangeEvent<{ value?: string | unknown}>) => {
        setActivity(event.target.value as string);
    }
     const handleDescChange = (event: React.ChangeEvent<{ value?: string | unknown}>) => {
        setDescription(event.target.value as string);
    }
    const handleAddOption = () => {
     const newOptions:Option[] = [...options, { name: '', description: '', unitPrice: '', time:[''] }];
     setOptions(newOptions);
    }
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = event.target;
        var newOptions:Option[] = [...options];
        // console.log( " Name - ",event.target.name," Value - ",event.target.value);
        if (name == 'time') {
            newOptions[index][name] = [value]
            setOptions(newOptions);
        } else {       
            newOptions[index][name] = value;
            setOptions(newOptions);
        }
    }
    const handleEditorChange = (value:string) => {
       setContent(value);
    }

 const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const selectedFilesArray = Array.from(files);
      setSelectedImages(selectedFilesArray);
    }
  };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title" sx={{
            }}>
                {selectedCategory ? "Edit Feedback" : "Add Feedback"}
            </DialogTitle>
            <DialogContent sx={{ marginTop: "2rem" }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        console.log(" Selected Category ", selectedCategory);
                        if (selectedCategory) {
                            if (activity) {
                                values.activity = activity
                            }
                            handleEdit(values);
                            setSelectedCategory(null);
                        } else {
                            values.activity = activity;
                            console.log(" Value Added : ", values)
                            setActivity('')
                            handleAdd(values);
                        }
                        resetForm();
                        setSubmitting(false);
                        handleClose();
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }: any) => (
                        <form onSubmit={handleSubmit}>

                    <FormControl margin='normal'  sx={{ m: 1, minWidth: 200 }}>
        <InputLabel> Select Activity</InputLabel>
        <Select value={activity}  onChange={handleActivityChange} label="Select Activity" required>
          {categories?.map((cat) => (
            <MenuItem key={cat?._id} value={cat?._id}>{cat?.name}</MenuItem>
          ))}
        </Select>
                            </FormControl>   

                             <TextField
                                autoFocus
                                id="message"
                                label="Message"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={values.message}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.message && errors.message)}
                                helperText={touched.message && errors.message}
                                sx={{
                                    marginBottom:2
                                }}
                            />
                        
                            <br></br>
                        
                            <br></br>
                            <TextField
                                autoFocus
                                id="rating"
                                label="Rating"
                                type="number"
                                variant="standard"
                                value={values.rating}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.rating && errors.rating)}
                                helperText={touched.rating && errors.rating}
                                sx={{
                                    marginBottom:2
                                }}
                            />
                           
                            <br></br>
                            <DialogActions>
                                <ButtonGroup>
                                    <Button onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <ThreeDots
                                                color="#fff"
                                                height={20}
                                                width={20}
                                            />
                                        ) : selectedCategory ? (
                                            "Edit"
                                        ) : (
                                            "Add"
                                        )}
                                    </Button>
                                </ButtonGroup>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default FormDialog;