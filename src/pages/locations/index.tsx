import React from 'react'
import PageView from '../../components/PageView'
import ConfirmModal from "../../components/ConfirmModal";
import LoadingComponent from "../../components/LoadingComponent";
import { useLocation } from '../../hooks/useLocation';
import { AddCircleRounded } from "@mui/icons-material";

import LocationsView from "./CustomerList";
import FormDialog from "./CustomerModal";
import { Alert } from '@mui/material';



const Locations = () => {
    const { customers, isLoading, isError, deleteCustomerMutation, createCustomerMutation, updateCustomerMutation } = useLocation();
    const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null);
    const [open, setOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    console.log(" Loc ",customers)
    if (isLoading) return (
        <PageView
            title="Location"
            backPath="/app/dashboard"
            actions={[
                {
                    icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
                    label: "Add Location",
                    handler: () => {
                        setOpen(true)
                        setSelectedCustomer(null)
                    },
                    // otherProps: {
                    //     sx: {
                    //         ml: "auto",
                    //         fontSize: "10px",
                    //     },
                    //     variant: "contained",
                    // },
                },
            ]}
        >
            <LoadingComponent />
        </PageView>
    )

    if (isError) return (
        <PageView
            title="Location"
            backPath="/app/dashboard"
            actions={[
                {
                    icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
                    label: "Add Location",
                    handler: () => {
                        setOpen(true)
                        setSelectedCustomer(null)
                    },
                    otherProps: {
                        sx: {
                            ml: "auto",
                            fontSize: "10px",
                        },
                        variant: "contained",
                    },
                },
            ]}
        >
            <Alert severity="error">Something went wrong</Alert>
        </PageView>
    )

    return (
        <PageView
            title="Location"
            backPath="/app/dashboard"
            actions={[
                {
                    icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
                    label: "Add Location",
                    handler: () => {
                        setOpen(true)
                        setSelectedCustomer(null)
                    },
                    otherProps: {
                        sx: {
                            ml: "auto",
                            fontSize: "10px",
                        },
                        variant: "contained",
                    },
                },
            ]}
        >
            <LocationsView
                customers={customers}
                setSelectedCustomer={setSelectedCustomer}
                setOpen={setOpen}
                setOpenConfirm={setOpenConfirm}
            />
            <FormDialog
                open={open}
                handleClose={() => setOpen(false)}
                selectedCustomer={selectedCustomer}
                handleAdd={createCustomerMutation}
                handleUpdate={updateCustomerMutation}
                setCustomer={setSelectedCustomer}
            />
            <ConfirmModal
                open={openConfirm}
                handleClose={() => setOpenConfirm(false)}
                handleConfirm={() => {
                    deleteCustomerMutation(selectedCustomer.id)
                    setOpenConfirm(false)
                }}
                title="Delete Location"
                description="Are you sure you want to delete this location?"
                confirmText="Delete"
                cancelText="Cancel"
            />
        </PageView>
    )
}


export default Locations
