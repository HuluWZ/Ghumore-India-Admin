import  { useState } from 'react';
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

const durationTypeList = ["days","hours","months","years"]
const url = import.meta.env.VITE_API_URL;

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
        area: selectedCategory ? selectedCategory.area : "",
        price: selectedCategory ? selectedCategory.price : "",
        totalCapacity: selectedCategory ? selectedCategory.totalCapacity : "",
        duration: selectedCategory ? selectedCategory.duration : "",
        durationType: selectedCategory ? selectedCategory.durationType : "",
        rating: selectedCategory ? selectedCategory.rating : 4.6,
        location: selectedCategory ? selectedCategory.location : "",
        organizer: selectedCategory ? selectedCategory.organizer : "",
        images: selectedCategory ? selectedCategory.images : [File],
        options: selectedCategory ? selectedCategory.options : [{ name: '', description: '', unitPrice: '', time: [''] }],
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Required"),
        area: Yup.string().required("Required"),
        price: Yup.string().required("Required"),
        totalCapacity: Yup.string().required("Required"),
        duration: Yup.string().required("Required"),
        location: Yup.string().required("Required"),
        organizer:Yup.string().required("Required"),
        // images: Yup.mixed().required("Required"),
    });
 

    const [options, setOptions] = useState<Option[]>([{ name: '', description: '', unitPrice: '', time: [''] }]);
    const [content, setContent] = useState('');
    const [durationType, setDurationType] = useState('');
    // const [images, setImages] = useState<File[]>([]);
      // Drop Zone TODO
   const [selectedImages, setSelectedImages] = useState<File[]>([]);
   const [uploadStatus, setUploadStatus] = useState("");
   const onDrop = useCallback((acceptedFiles: File[],rejectedFiles:File[]) => {
    acceptedFiles.forEach((file: File) => {
      setSelectedImages((prevState:File[]) => [...prevState, file]);
    });
   }, []);
    
     const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop,maxFiles:4});

    const onUpload = async () => {
        try {
            console.log(" Selected Images ",selectedImages);
            setUploadStatus(" Uploading Started...");
            var formData = new FormData();
            var prom = selectedImages.map(async (image, index) => {
                const newData = {"images":image}
                console.log(" new Data ", newData);
                // formData.append(`images${index}`, image, image.name);
                // console.log(" Formdata ", formData);
                const response = await axios.post(`${url}/activity/one`, newData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    // console.log(" Response ", response);
                    
                console.log(" Response  ", response);
                    // formData.push(obj);
                // console.log("  Image with name ", image,image.name)
                // formData.append(`images${index}`, image,image.name);
                // console.log(" Formdata ", formData);
                return response
            });
              // const resn = await Promise.all(prom);
             // console.log(" Final Response ", resn);
            // console.log(" Upload Image ", formData);
           // return response?.dat
           
         // const uploadResult = Promise.all(uploadImg);
        // console.log(" Images  to Upload ",uploadImg,uploadResult);

     // console.log(" Upload Response - ",response);
      setUploadStatus("Upload Successful");
    } catch (error) {
        console.log(" image Upload Error " + error);
        setUploadStatus("Upload failed..Try Again");
    }
    };

    const style = useMemo(
    () => ({
      ...(isDragAccept ? { borderColor: "#00e676" } : {}),
      ...(isDragReject ? { borderColor: "#ff1744" } : {}),
    }),
    [isDragAccept, isDragReject]
  );
  const handleDurationTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDurationType(event.target.value);
    }
  


    const handleAddOption = () => {
     const newOptions:Option[] = [...options, { name: '', description: '', unitPrice: '', time:[''] }];
     setOptions(newOptions);
    }
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {

        const { name, value } = event.target;
        var newOptions:Option[] = [...options];
        // console.log( " Name - ",event.target.name," Value - ",event.target.value);
        newOptions[index][name] = value;
        setOptions(newOptions);
    }
    const handleEditorChange = (value:string) => {
       setContent(value);
    }



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
                            // values.images = selectedImages;
                            values.description = content;
                            values.options = options;
                            values.durationType = durationType
                            console.log(" Value Added : ",values)
                            handleAdd(values);
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
                            <TextField
                                autoFocus
                                id="area"
                                label="Area"
                                type="text"
                                variant="standard"
                                value={values.area}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.area && errors.area)}
                                helperText={touched.area && errors.area}
                                sx={{
                                    marginBottom:2
                                }}
                            />
                            <TextField
                                autoFocus
                                id="location"
                                label="Location"
                                fullWidth
                                type="text"
                                variant="standard"
                                value={values.location}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(touched.location && errors.location)}
                                helperText={touched.location && errors.location}
                                sx={{
                                    marginBottom:2
                                }}
                            />
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
                                value={values.durationType}
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
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleOptionChange(event, index)}
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

                            {/* <Button variant="contained" component="label">  Upload Images
                                <Input type="file" style={{ display: 'none' }}  inputProps={{ multiple: true,required:true }} onChange={handleUploadImages}   />
                            </Button> */}
                            <div >
      <div  {...getRootProps({ style })}>
        <input {...getInputProps()}  required={true} multiple/>
        {isDragActive ? (
          <p>Drop file(s) here ...</p>
        ) : (
          <p>Drag and drop file(s) here, or click to select files</p>
        )}
      </div>
      <div >
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <img src={`${URL.createObjectURL(image)}`} key={index} alt=""  width="200" height="200"/>
          ))}
      </div>
      {selectedImages.length > 0 && (
        <div>
          <Button type="submit" variant="contained" onClick={onUpload} >Upload To Cloud</Button>
          <p>{uploadStatus}</p>
        </div>
      )}
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