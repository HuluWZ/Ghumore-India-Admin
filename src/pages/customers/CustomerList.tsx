import {
    DataGrid,
    GridColDef,
    GridToolbar,
} from "@mui/x-data-grid";
import {
    DeleteForeverRounded,
    EditRounded,
    VisibilityRounded,
} from "@mui/icons-material";
import {
    Box,
    IconButton,
    Container,
    Typography,
    Avatar,
    Paper,
} from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import moment from "moment";
import { useTheme } from "@mui/material";


const CustomersView = ({
    customers,
    setSelectedCustomer,
    setOpen,
    setOpenConfirm,
}: any) => {
    const theme = useTheme();
    console.log(" All Coupons ", customers);
    const columns: GridColDef[] = [
       {
            field: "id",
            headerName: "ID",
            minWidth: 100
        },
        {
            field: "code",
            headerName: "Coupon Code",
            minWidth: 150
        },
        {
            field: "rate",
            headerName: "Rate",
            minWidth: 100,
        },
        {
            field: "startDate",
            headerName: "Start Date",
            minWidth: 100,
            renderCell: (params: any) => {
                const { row } = params;
                const { startDate } = row;
                return (
                    <>
                        <Typography variant="body1">
                            {moment(startDate).format("DD MMM YYYY")}
                        </Typography>
                    </>
                );
            },
        },
        {
            field: "endDate",
            headerName: "End Date",
            minWidth: 150,
            renderCell: (params: any) => {
                const { row } = params;
                const { endDate } = row;
                return (
                    <>
                        <Typography variant="body1">
                            {moment(endDate).format("DD MMM YYYY")}
                        </Typography>
                    </>
                );
            },
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            minWidth: 100,
            renderCell: (params: any) => {
                const { row } = params;
                const { createdAt } = row;
                return (
                    <>
                        <Typography variant="body1">
                            {moment(createdAt).format("DD MMM YYYY")}
                        </Typography>
                    </>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            renderCell: (params: any) => {
                const { row } = params;
                return (
                    <>
                        <IconButton
                            onClick={() => {
                                row.startDate =row?.startDate.split("T")[0] 
                                row.endDate =row?.endDate.split("T")[0] 
                                setSelectedCustomer(row);
                                setOpen(true);
                            }}
                        >
                            <EditRounded />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setSelectedCustomer(row);
                                setOpenConfirm(true);
                            }}
                        >
                            <DeleteForeverRounded />
                        </IconButton>
                    </>
                );
            },
        },
    ];


    const rows = customers?.discounts?.map((item: any) => {
        return {
            id: item?._id,
            code: item?.code,
            rate: item?.rate,
            startDate: item?.startDate,
            endDate: item?.endDate,
            status: item?.status,
            createdAt: item?.createdAt,
        };
    });
    return (
        <Container maxWidth="lg">
            <Paper sx={{ background: theme.palette.background.paper }} variant="outlined">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    autoHeight
                    checkboxSelection
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </Paper>
        </Container>
    );
};


export default CustomersView;
