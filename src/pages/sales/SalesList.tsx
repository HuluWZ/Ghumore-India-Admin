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
    CardMedia,
} from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import moment from "moment";
import { useTheme } from "@mui/material";


const SalesView = ({
    sales,
    setSelectedSales,
    setOpen,
    setOpenConfirm,
}: any) => {
    console.log(" All Sales ", sales);
    const theme = useTheme();
       const columns: GridColDef[] = [

        {
           field: "id",
           headerName: "ID",
           minWidth:100
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
        },
        {
            field: "parent",
            headerName: "Parent",
            minWidth: 150
        },
        {
            field: "image",
            headerName: "Image",
            minWidth: 300,
            renderCell: (params: any) => {
                const { row } = params;
                return <>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                     <CardMedia
                        component="img"
                        height="200"
                        image={row?.image}
                        alt="green iguana"
                     />
        
                 </Box>
                </>
            }
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
                                setSelectedSales(row);
                                setOpen(true);
                            }}
                        >
                            <EditRounded />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setSelectedSales(row);
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

const rows = sales?.category?.map((item: any) => {
        return {
            id: item?._id,
            name: item?.name,
            parent: item?.parent?item?.parent:"-",
            image: item?.image,
            createdAt: item?.createdAt
        };
    });

    return (
        <Container maxWidth="lg">
            <Paper sx={{ background: theme.palette.background.paper }} variant="outlined">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    pagination
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    initialState={{
                        pagination: {
                            pageSize: 10,
                        },
                    }
                    }
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </Paper>
        </Container>
    );
};

export default SalesView;