import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridToolbar,
} from "@mui/x-data-grid";
import {
    DeleteForeverRounded,
    EditRounded,
    VisibilityRounded,
} from "@mui/icons-material";
import { Box, IconButton, Container, Grid, Paper } from "@mui/material";
import { useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const ProductsView = ({
    products,
    setSelectedProduct,
    setOpen,
    setOpenConfirm,
}: any) => {

    // console.log("   products", products)
    const theme = useTheme();

    const columns: GridColDef[] = [
        {
            field: "fullName",
            headerName: "Full Name",
            width: 150,
        },
        {
            field: "email",
            headerName: "Email",
            width: 150,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            width: 150,
        },
        {
            field: "city",
            headerName: "City",
            width: 150,
        },
        {
            field: "address",
            headerName: "Address",
            width: 150,
        },
        {
            field: "role",
            headerName: "Role",
            width: 150,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params: any) => {
                return (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            onClick={() => {
                                setSelectedProduct(params.row);
                                setOpen(true);
                            }}
                        >
                            <EditRounded />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setSelectedProduct(params.row);
                                setOpenConfirm(true);
                            }}
                        >
                            <DeleteForeverRounded />
                        </IconButton>
                        <IconButton component={Link} to={`${params.row.id}`}>
                            <VisibilityRounded />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];

    const rows: GridRowsProp = products?.users?.map((product: any) => {
        // console.log(" User = ", product)
        return {
            id: product._id,
            fullName: product.fullName,
            email: product.email,
            phoneNumber: product.phoneNumber,
            password: product?.plainPassword,
            city: product?.city,
            address: product?.address,
            role: product?.role,
        };
    });

    return (
        <Container maxWidth="lg">
            <Paper sx={{ background: theme.palette.background.paper }} variant="outlined">

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pagination
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    autoHeight
                    initialState={{
                        pagination: {
                            pageSize: 10,
                        },
                    }}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    sx={{
                        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.05)",
                    }}
                />
            </Paper>
        </Container>
    );
};

export default ProductsView;
