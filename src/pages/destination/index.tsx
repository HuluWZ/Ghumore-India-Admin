import React from 'react'
import PageView from '../../components/PageView'
import ConfirmModal from "../../components/ConfirmModal";
import LoadingComponent from "../../components/LoadingComponent";
import { useDestination } from '../../hooks/useDestination';
import { AddCircleRounded } from "@mui/icons-material";

import LocationsView from "./CustomerList";
import FormDialog from "./CustomerModal";
import { Alert } from '@mui/material';



const Locations = () => {
    const { customers, isLoading, isError, deleteCustomerMutation, createCustomerMutation, updateCustomerMutation } = useDestination();
    const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null);
    const [open, setOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    console.log(" Category : ",customers)
    if (isLoading) return (
        <PageView
            title="Category"
            backPath="/app/dashboard"
            actions={[
                {
                    icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
                    label: "Add Category",
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
            <LoadingComponent />
        </PageView>
    )

    if (isError) return (
        <PageView
            title="Category"
            backPath="/app/dashboard"
            actions={[
                {
                    icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
                    label: "Add Category",
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
            title="Category"
            backPath="/app/dashboard"
            actions={[
                {
                    icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
                    label: "Add Category",
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
                title="Delete Category"
                description="Are you sure you want to delete this category?"
                confirmText="Delete"
                cancelText="Cancel"
            />
        </PageView>
    )
}


export default Locations
