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
// import styles from "../styles/Home.module.css";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { Select,InputLabel } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';

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
        // id: selectedCategory ? selectedCategory.id : "",
        name: selectedCategory ? selectedCategory.name : "",
        description: selectedCategory ? selectedCategory.description : "",
        price: selectedCategory ? selectedCategory.price : "",
        totalCapacity: selectedCategory ? selectedCategory.totalCapacity : "",
        duration: selectedCategory ? selectedCategory.duration : "",
        durationType: selectedCategory ? selectedCategory.durationType : "",
        rating: selectedCategory ? selectedCategory.rating : 4.6,
        location: selectedCategory ? selectedCategory.location : "",
        category: selectedCategory ? selectedCategory.category : "",
        organizer: selectedCategory ? selectedCategory.organizer : "",
        startDate: selectedCategory ? selectedCategory.startDate : '',
        endDate: selectedCategory ? selectedCategory.endDate : '',
        lastBookingDate: selectedCategory ? selectedCategory.lastBookingDate : "",
        images: selectedCategory ? selectedCategory.images : '',
        options: selectedCategory ? selectedCategory.options : [{ name: '', description: '', unitPrice: '', time: [''] }],
    };
    const [formData, setFormData] = useState({
        name:  "",
        description: "",
        price: "",
        totalCapacity:  "",
        duration:  "",
        durationType:  "",
        rating:  '',
        location:  "",
        category: "",
        organizer:   "",
        startDate:  '',
        endDate:  '',
        lastBookingDate: "",
        images: '',
        options: ''
  })

    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        price: Yup.string().required("Required"),
        totalCapacity: Yup.string().required("Required"),
        duration: Yup.string().required("Required"),
        // location: Yup.string().required("Required"),
        // category: Yup.string().required("Required"),
        organizer: Yup.string().required("Required"),
        startDate: Yup.date().required("Required"),
        endDate: Yup.date().required("Required"),
        lastBookingDate: Yup.date().required("Required"),
        // images: Yup.mixed().required("Required"),
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
            const response = await fetch(`${api}category/get`);
            const data = await response.json();
            console.log(" Get All Category ", data?.category)
            setCategories(data?.category);
        }
        fetchCategorys();
    }, []);
    const [options, setOptions] = useState<Option[]>([{ name: '', description: '', unitPrice: '', time: [''] }]);
    const [content, setContent] = useState('');
    const [durationType, setDurationType] = useState('');

    const [location, setLocation] = useState('')
    const [category, setCategory] = useState('')

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
                {selectedCategory ? "Edit Activity" : "Add Activity"}
            </DialogTitle>
            <DialogContent sx={{ marginTop: "2rem" }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        if (selectedCategory) {
                            handleEdit(values);
                            setSelectedCategory(null);
                        } else {
                            // values.location = location;
                            // values.category = category;
                            values.images = selectedImages;
                            values.description = content;
                            values.options = options;
                            values.durationType = durationType
                            const data = formatData(values);
                            console.log(" Value Added : ",values,data)
                            handleAdd(data);
                            setSelectedImages([])
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
                            <TextField
                                autoFocus
                                id="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.name && errors.name)}
                                helperText={touched.name && errors.name}
                                sx={{
                                    marginBottom:2
                                }}
                            />
                            <br></br>
                            <h4>Description</h4>
                            <ReactQuill theme="snow"  id="content" value={content} onChange={handleEditorChange}  modules={modules} formats={formats} />
                            <br></br>
                            

        <FormControl   sx={{ m: 1, minWidth: 200 }} margin='normal'>
                    
       <InputLabel> Select Location </InputLabel>
        <Select value={location} onChange={handleLocationChange} label="Select Location">
          {locations.map((location) => (
            <MenuItem key={location._id} value={location._id}>{location.name}</MenuItem>
          ))}
        </Select>
        </FormControl>

 <FormControl margin='normal'  sx={{ m: 1, minWidth: 200 }}>
        <InputLabel> Select Category</InputLabel>
        <Select value={category}  onChange={handleCategoryChange} label="Select Category">
          {categories?.map((cat) => (
            <MenuItem key={cat?._id} value={cat?._id}>{cat?.name}</MenuItem>
          ))}
        </Select>
                            </FormControl>   
                            <br></br>
                            <TextField
                                autoFocus
                                id="price"
                                label="Price"
                                type="number"
                                variant="standard"
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.price && errors.price)}
                                helperText={touched.price && errors.price}
                                sx={{
                                    marginBottom:2
                                }}
                            />
                            <TextField
                                autoFocus
                                id="duration"
                                label="Duration"
                                type="number"
                                variant="standard"
                                value={values.duration}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.duration && errors.duration)}
                                helperText={touched.duration && errors.duration}
                                sx={{
                                    marginBottom:2
                                }}
                            />
                           
                            <TextField
                                autoFocus
                                id="outlined-select-currency"
                                label="DurationType"
                                name="durationType"
                                select
                                variant="standard"
                                value={durationType}
                                defaultValue="days"
                                onChange={handleDurationTypeChange}
                                // onBlur={handleBlur}
                                error={Boolean(touched.durationType && errors.durationType)}
                                helperText={touched.durationType && errors.durationType}
                                sx={{
                                    marginBottom:2
                                }}>
                                {durationTypeList.map((option) => (
                                    <MenuItem  key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                                </TextField>
                            

        {options.map((option, index) => (
        <div key={index} >
            <TextField
            id="name-"
            label="Name"
            name="name"
            type="text"
                    value={option.name}
                    variant="standard"
                    required={true}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleOptionChange(event, index)}
          />
          <TextField
          id="description"
            label="Description"
            name="description"
            type="text"
                    value={option.description}
                    variant="standard"
                    required={true}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleOptionChange(event, index)}
                />
                <br></br>
            <TextField
            id="unitPrice"
            label="Unit Price"
            name="unitPrice"
            type="number"
                    value={option.unitPrice}
                    required={true}
                    variant="standard"
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleOptionChange(event, index)}
                />                                    
           <TextField
            id="availableTime"
            label="Available Time"
            name="time"
            type="time"
            value={option.time}
                    required={true}
                    variant="standard"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOptionChange(event, index)}
                    InputProps={{
          inputProps: {
            multiple: true,
          },
        }}
         />
        <br></br>
        </div>
      ))}

    <br></br>
      <Button variant="contained" color="primary" onClick={handleAddOption}>
        Add Option
     </Button>
                            <br></br>
                            <br></br>
                            <TextField
                                autoFocus
                                id="totalCapacity"
                                label="TotalCapacity"
                                type="number"
                                variant="standard"
                                value={values.totalCapacity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.totalCapacity && errors.totalCapacity)}
                                helperText={touched.totalCapacity && errors.totalCapacity}
                                sx={{
                                    marginBottom:2
                                }}
                            />
                              <TextField
                                autoFocus
                                id="organizer"
                                label="Organizer"
                                type="text"
                                variant="standard"
                                value={values.organizer}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.organizer && errors.organizer)}
                                helperText={touched.organizer && errors.organizer}
                                sx={{
                                    marginBottom:2
                                }}
                            />
              
              <br></br>
                    
        <TextField
            id="startDate"
            label="Start Date"
            type="date"
            value={values.startDate}
            required={true}
            // variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.startDate && errors.startDate)}
            helperText={touched.startDate && errors.startDate}
            sx={{
                    marginBottom:2
                }}
        />
                                

        <TextField
            id="endDate"
            label="End Date"
            type="date"
            value={values.endDate}
           required={true}
                                // variant="filled"
                                onChange={handleChange}
                                 onBlur={handleBlur}
                                error={Boolean(touched.endDate && errors.endDate)}
                                helperText={touched.endDate && errors.endDate}
                                sx={{
                                    marginBottom:2
                                }}
         /><TextField
            id="lastBookingDate"
            label="Last Booking Date"
            type="date"
            value={values.lastBookingDate}
           required={true}
                                // variant="standard"
                                onChange={handleChange}
         />
                            <Button variant="contained" component="label">  Upload Images
                                <Input type="file" style={{ display: 'none' }}  inputProps={{ multiple: true,required:true }} onChange={handleFileSelect}   />
                            </Button>
                            <div >
      <div>
        {selectedImages?.map((file) => (
        <img key={file?.name} src={URL.createObjectURL(file)} alt={file?.name} width="200" />
      ))}
      </div>
      
    </div>
                            
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