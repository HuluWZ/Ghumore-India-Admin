import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik } from "formik";
import * as Yup from "yup";
import { ButtonGroup, Button } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { useCategory } from "../../hooks/useCategory";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from "@mui/material/FormHelperText";
import { Grid } from "@mui/material";
import * as React from 'react';
type FormDialogProps = {
    open: boolean;
    handleClose: () => void;
    handleAdd: (values: any) => void;
    handleEdit: (values: any) => void;
    selectedProduct?: any;
    setSelectedProduct?: any;
};

const FormDialog = ({
    open,
    handleClose,
    handleAdd,
    handleEdit,
    selectedProduct,
    setSelectedProduct,
}: FormDialogProps) => {
    const { categories } = useCategory();
    const initialValues = {
        id: selectedProduct ? selectedProduct.id : "",
        fullName: selectedProduct ? selectedProduct.fullName : "",
        email: selectedProduct ? selectedProduct.email : "",
        password: selectedProduct ? selectedProduct.password : "",
        phoneNumber: selectedProduct ? selectedProduct.phoneNumber : "",
        role: selectedProduct ? selectedProduct.role : "",
        city: selectedProduct ? selectedProduct.city : "",
        address: selectedProduct ? selectedProduct.address : ""
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full Name is required"),
        email: Yup.string().required(" Email is required"),
        password: Yup.string(),
        phoneNumber: Yup.string().required(" Phone number is required"),
        city: Yup.string(),
        address: Yup.string(),
        role: Yup.string()
    });
    const RoleList = ["ADMIN", "USER"]
    const [Role, setRole] = React.useState('');
    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole(event.target.value);
      };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                id="form-dialog-title"
            >
                {selectedProduct ? "Edit User" : "Add User"}
            </DialogTitle>
            <DialogContent sx={{ marginTop: "1rem" }}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        values.role = Role
                        // console.log(" Data ", values," Selected Product ",selectedProduct);
                        if (selectedProduct) {
                            setSubmitting(true);
                            handleEdit({
                                ...values
                            });
                            setSelectedProduct(null);
                            setSubmitting(false);
                            resetForm();
                            handleClose();
                        } else {
                            setSubmitting(true);
                            handleAdd({
                                ...values
                            });
                            setSelectedProduct(null);
                            setSubmitting(false);
                            resetForm();
                            handleClose();
                        }
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
                            <Grid container spacing={2} mt={1}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoFocus
                                        id="fullName"
                                        label="Full Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={values.fullName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.fullName && Boolean(errors.fullName)}
                                        helperText={touched.fullName && errors.fullName}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="email"
                                        label="Email"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                        minRows={4}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="password"
                                        label="Password"
                                        type="string"
                                        fullWidth
                                        variant="standard"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="phoneNumber"
                                        label="Phone Number"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                                        helperText={touched.phoneNumber && errors.phoneNumber}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="city"
                                        label="City"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                            touched.city && Boolean(errors.city)
                                        }
                                        helperText={
                                            touched.city && errors.city
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        id="address"
                                        label="Address"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.address && Boolean(errors.address)}
                                        helperText={touched.address && errors.address}
                                    />
                                </Grid>

    
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoFocus
                                        id="outlined-select-currency"
                                        label="Role"
                                        name="role"
                                        select
                                        variant="standard"
                                        value={values.role}
                                        onChange={handleRoleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(touched.role && errors.role)}
                                        helperText={touched.role && errors.role}
                                        sx={{
                                           marginBottom:2
                                       }}>
                                    {RoleList.map((role) => (
                                         <MenuItem  key={role} value={role}>
                                             {role}
                                         </MenuItem>
                                    ))}
                                    </TextField>
                                </Grid> 
            

                                <Grid item xs={12} sm={12}>
                                    <DialogActions>
                                        <ButtonGroup>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                variant="contained"
                                            >
                                                {isSubmitting ? (
                                                    <ThreeDots color="#fff" height={20} width={20} />
                                                ) : selectedProduct ? (
                                                    "Update"
                                                ) : (
                                                    "Add"
                                                )}
                                            </Button>
                                        </ButtonGroup>
                                    </DialogActions>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default FormDialog;
