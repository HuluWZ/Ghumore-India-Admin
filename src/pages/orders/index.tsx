import React from 'react'
import PageView from '../../components/PageView'
import { useOrder } from '../../hooks/useOrder'
import LoadingComponent from "../../components/LoadingComponent";
import OrdersView from "./OrderList";
import { AddCircleRounded } from "@mui/icons-material";
import ConfirmModal from "../../components/ConfirmModal";
import { Alert } from "@mui/material";
import FormDialog from "./OrdersModal";

const Orders = () => {
    const { orders, isLoading, isError, deleteOrderMutation, createOrderMutation, updateOrderMutation, approveOrderMutation } = useOrder();
    const [selectedOrder, setSelectedOrder] = React.useState<any>(null);
    const [open, setOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);

    if (isLoading) return (
        <PageView
            title="Booking"
            backPath="/app/dashboard"
            actions={[
                {
                    icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
                    label: "Add Booking",
                    handler: () => {
                        setOpen(true)
                        setSelectedOrder(null)
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
            title="Booking"
            backPath="/app/dashboard"
            actions={[
                {
                    icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
                    label: "Add Booking",
                    handler: () => {
                        setOpen(true)
                        setSelectedOrder(null)
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
            <Alert severity="error">{isError.message}</Alert>
        </PageView>
    )

    return (
        <PageView
            title="Booking"
            backPath="/app/dashboard"
            actions={[
                {
                    icon: <AddCircleRounded style={{ fontSize: "1rem" }} />,
                    label: "Add Booking",
                    handler: () => {
                        setOpen(true)
                        setSelectedOrder(null)
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
            <OrdersView
                orders={orders}
                setSelectedOrder={setSelectedOrder}
                setOpen={setOpen}
                setOpenConfirm={setOpenConfirm}
                approveOrderMutation={approveOrderMutation}
            />


            <FormDialog
                open={open}
                handleClose={() => setOpen(false)}
                handleAdd={createOrderMutation}
                order={selectedOrder}
                handleEdit={updateOrderMutation}
                selectedOrder={selectedOrder}
                setSelectedOrder={setSelectedOrder}
            />


            <ConfirmModal
                open={openConfirm}
                handleClose={() => setOpenConfirm(false)}
                handleConfirm={() => {
                    deleteOrderMutation(selectedOrder.id)
                    setOpenConfirm(false)
                }}
                title="Delete Booking"
                description="Are you sure you want to delete this booking?"
                confirmText="Delete"
                cancelText='Cancel'
            />
        </PageView>

    )
}

export default Orders