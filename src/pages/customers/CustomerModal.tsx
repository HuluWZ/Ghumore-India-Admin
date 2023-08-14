import React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, ButtonGroup, MenuItem } from "@mui/material";
import DatePicker from '@mui/lab/DatePicker';
import { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const validationSchema = Yup.object().shape({
    code: Yup.string().required("Coupon Code is required"),
    rate: Yup.number().required("Coupon Rate is required"),
    // startDate: Yup.date().required("Start Date is required"),
    // endDate: Yup.date().required("End Date is required"),
});


type FormDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleAdd: (values: any) => void;
    handleUpdate: (values: any) => void;
    selectedCustomer: any;
    setCustomer: any;
}
  
const FormDialog = (props: FormDialogProps) => {
    const { open, handleClose, handleAdd, handleUpdate, selectedCustomer, setCustomer } = props;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (date:any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date:any) => {
    setEndDate(date);
  };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                {selectedCustomer ? "Update Coupon" : "Add Coupon"}
            </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        id: selectedCustomer?.id || "",
                        code: selectedCustomer?.code || "",
                        rate: selectedCustomer?.rate || "",
                        startDate: selectedCustomer?.startDate || "",
                        endDate: selectedCustomer?.endDate || "",
                        status: selectedCustomer?.status || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(" Selected ",selectedCustomer)
                        if (selectedCustomer) {
                            handleUpdate(values);
                        } else {
                            // values.startDate = startDate;
                            // values.endDate = endDate;
                            console.log(" Discount Data = ",values)
                            handleAdd(values);
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
                                id="code"
                                name="code"
                                label="Coupon Code"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={values.code}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.code && Boolean(errors.code)}
                                helperText={touched.code && errors.code}
                            />
                            <TextField
                                margin="dense"
                                id="rate"
                                name="rate"
                                label="Coupon Rate"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={values.rate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.rate && Boolean(errors.rate)}
                                helperText={touched.rate && errors.rate}
                            /><br></br>
                            <TextField
            id="startDate"
            label="Start Date"
            type="date"
            value={values.startDate}
            required={true}
            variant="filled"
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.startDate && errors.startDate)}
            helperText={touched.startDate && errors.startDate}
            sx={{
                    marginBottom:2
                }}
        />
                          <br></br>      

        <TextField
            id="endDate"
            label="End Date"
            type="date"
            value={values.endDate}
           required={true}
                                variant="filled"
                                onChange={handleChange}
                                 onBlur={handleBlur}
                                error={Boolean(touched.endDate && errors.endDate)}
                                helperText={touched.endDate && errors.endDate}
                                sx={{
                                    marginBottom:2
                                }}
         />
                       

                            <TextField
                                margin="dense"
                                id="status"
                                name="status"
                                label="Status"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={values.status}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.status && Boolean(errors.status)}
                                helperText={touched.status && errors.status}
                                select
                            >
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Approved">Approved</MenuItem>
                                <MenuItem value="Suspended">Suspended</MenuItem>
                            </TextField>
                            <DialogActions>
                                <ButtonGroup>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary" disabled={isSubmitting} variant="contained">
                                        {selectedCustomer ? "Update" : "Add"}
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
