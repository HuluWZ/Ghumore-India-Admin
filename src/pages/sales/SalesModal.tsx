import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, ButtonGroup, MenuItem } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from 'react';
const api = import.meta.env.VITE_API_URL;
import { Select,InputLabel,Input } from '@material-ui/core';

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Location Name is required"),
    // image: Yup.string().required("Location image is required"),
});


type FormDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleAdd: (values: any) => void;
    handleUpdate: (values: any) => void;
    selectedSales: any;
    setSelectedSales: any;
}



const FormDialog = (props: FormDialogProps) => {
    const { open, handleClose, handleAdd, handleUpdate, selectedSales, setSelectedSales } = props;
       const [locations, setLocations] = useState([{ _id: '', name: '' }]);
       useEffect(() => {
        async function fetchCategorys() {
            const response = await fetch(`${api}category/get`);
            const data = await response.json();
            console.log(" Get All Category : ", data?.category)
            setLocations(data?.category);
        }
        fetchCategorys();
       }, []);
    const [parent, SetParent] = useState('');
    const [file, SetFile] = useState<File | null>(null);
     const handleParent = (event: React.ChangeEvent<{ value?: string | unknown}>) => {
        SetParent(event.target.value as string);
    }
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
        SetFile(file)
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                {selectedSales ? "Update Category" : "Add Category"}
            </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        id: selectedSales?.id || "",
                        name: selectedSales?.name || "",
                        parent: selectedSales?.parent || "",
                        image: selectedSales?.image || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (selectedSales) {
                            handleUpdate(values);
                        } else {
                            values.image = file
                            parent ?? values.parent;
                            console.log(" Submited Values ",values)
                            handleAdd(values);
                            SetFile(null)
                        }
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
                        /* and other goodies */
                    }: any) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Category Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />
                            <br></br>
            <FormControl margin='normal'  sx={{ m: 1, minWidth: 200 }}>
                 <InputLabel> Select Parent Category</InputLabel>
                 <Select value={parent} id="parent" onChange={handleParent} label="Select Category">
                   {locations?.map((loc) => (
                    <MenuItem key={loc?._id} value={loc?._id}>{loc?.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

                            <br></br>
                            <Button variant="contained" component="label">  Upload Image
                                <Input type="file"  style={{ display: 'none' }}  inputProps={{ required:true }} onChange={handleFileSelect}   />
                            </Button>
                            <div >
      <div>
                                    {file &&
                                        (<img key={file?.name} src={URL.createObjectURL(file)} alt={file?.name} width="200" />)}
      </div>
      
    </div>
                       
                           
                            <DialogActions>
                                <ButtonGroup>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary" disabled={isSubmitting} variant="contained">
                                        {selectedSales ? "Update" : "Add"}
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
