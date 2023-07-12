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


const durationTypeList = ["days","hours","months","years"]

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
        id: selectedCategory ? selectedCategory.id : "",
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
        images: selectedCategory ? selectedCategory.images : "",
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
        images: Yup.mixed().required("Required"),
    });
 

    const [options, setOptions] = useState<Option[]>([{ name: '', description: '', unitPrice: '', time: [''] }]);
    const [content, setContent] = useState('');
    const [durationType, setDurationType] = useState('');

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
        console.log( " Name - ",event.target.name," Value - ",event.target.value);
        newOptions[index][name] = value;
        setOptions(newOptions);
    }
    const handleEditorChange = (value:string) => {
       setContent(value);
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    }


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title" sx={{
            }}>
                {selectedCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
            <DialogContent sx={{ marginTop: "2rem" }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        // console.log(values, " Form Data");
                        if (selectedCategory) {
                            handleEdit(values);
                            setSelectedCategory(null);
                        } else {
                            values.description = content;
                            values.options = options;
                            values.durationType = durationType
                            console.log(" Inserted Data - ",values);
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
                        setFieldValue,
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
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleOptionChange(event, index)}
          />
          <TextField
          id="description"
            label="Description"
            name="description"
            type="text"
            value={option.description}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleOptionChange(event, index)}
          />
                <TextField
                    id="unitPrice"
            label="Unit Price"
            name="unitPrice"
            type="number"
            value={option.unitPrice}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleOptionChange(event, index)}
                                    />
                                    
                <TextField
                id="time"
            label="Available Time"
            name="time"
            type="text"
            value={option.time}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => handleOptionChange(event, index)}
          />
        </div>
      ))}
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
                            <TextField
                                id="images"
                                label="Image"
                                type="file"
                                fullWidth
                                variant="standard"
                                onChange={(event: any) => {
                                    setFieldValue("images", event.currentTarget.files);
                                }}
                                InputLabelProps={{ shrink: true }}
                                onBlur={handleBlur}
                                // InputProps={{ multiple: true }}
                                error={Boolean(touched.images && errors.images)}
                                helperText={touched.images && errors.images}
                                sx={{
                                    marginBottom:4
                                }}
                              
                            />
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