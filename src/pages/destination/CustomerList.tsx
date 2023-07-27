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


const LocationsView = ({
    customers,
    setSelectedCustomer,
    setOpen,
    setOpenConfirm,
}: any) => {
    const customer = [
{
_id: "64ba2d41ebc1d209d18fc078",
name: "Flyboarding",
image: "https://res.cloudinary.com/dqednriao/image/upload/v1689922880/DubaiFlyboardAdventure-Klook.jpg",
createdAt: "2023-07-21T07:01:21.688Z",
updatedAt: "2023-07-21T07:01:21.688Z",
__v: 0
},
{
_id: "64ba2befebc1d209d18fc073",
name: "Jet  Ski",
image: "https://res.cloudinary.com/dqednriao/image/upload/v1689922543/146.jpg",
createdAt: "2023-07-21T06:55:43.836Z",
updatedAt: "2023-07-21T06:55:43.836Z",
__v: 0
},
{
_id: "64ba2bb4ebc1d209d18fc070",
name: "Bungee Jumping",
image: "https://res.cloudinary.com/dqednriao/image/upload/v1689922484/download%20%282%29.jpg",
createdAt: "2023-07-21T06:54:44.853Z",
updatedAt: "2023-07-21T06:54:44.853Z",
__v: 0
},
{
_id: "64ba2b3debc1d209d18fc06d",
name: "Rafting",
image: "https://res.cloudinary.com/dqednriao/image/upload/v1689922364/download%20%281%29.jpg",
createdAt: "2023-07-21T06:52:45.247Z",
updatedAt: "2023-07-21T06:52:45.247Z",
__v: 0
},
{
_id: "64ba2b02ebc1d209d18fc06a",
name: "Sightseeing",
image: "https://res.cloudinary.com/dqednriao/image/upload/v1689922305/download.jpg",
createdAt: "2023-07-21T06:51:46.876Z",
updatedAt: "2023-07-21T06:51:46.876Z",
__v: 0
},
{
_id: "64ba2a75ebc1d209d18fc066",
name: "Skydiving",
image: "https://res.cloudinary.com/dqednriao/image/upload/v1689922164/IMAGE%20%2810%29.png",
createdAt: "2023-07-21T06:49:25.017Z",
updatedAt: "2023-07-21T06:49:25.017Z",
__v: 0
},
{
_id: "64ba2a32ebc1d209d18fc063",
name: "Trekking",
image: "https://res.cloudinary.com/dqednriao/image/upload/v1689922097/IMAGE%20%288%29.png",
createdAt: "2023-07-21T06:48:18.586Z",
updatedAt: "2023-07-21T06:48:18.586Z",
__v: 0
},
{
_id: "64ba2a13ebc1d209d18fc060",
name: "Paragliding",
image: "https://res.cloudinary.com/dqednriao/image/upload/v1689922066/IMAGE%20%287%29.png",
createdAt: "2023-07-21T06:47:47.253Z",
updatedAt: "2023-07-21T06:47:47.253Z",
__v: 0
},
{
_id: "64ba29e0ebc1d209d18fc05d",
name: "Rainforest Tours",
image: "https://res.cloudinary.com/dqednriao/image/upload/v1689922015/IMAGE%20%286%29.png",
createdAt: "2023-07-21T06:46:56.083Z",
updatedAt: "2023-07-21T06:46:56.083Z",
__v: 0
},
{
_id: "64ba29c8ebc1d209d18fc05a",
name: "Multi-Day Experiences",
image: "https://res.cloudinary.com/dqednriao/image/upload/v1689921991/IMAGE%20%285%29.png",
createdAt: "2023-07-21T06:46:32.374Z",
updatedAt: "2023-07-21T06:46:32.374Z",
__v: 0
},
{
_id: "64ba299aebc1d209d18fc057",
name: "Tree Ziplining",
image: "https://res.cloudinary.com/dqednriao/image/upload/v1689921893/IMAGE%20%284%29.png",
createdAt: "2023-07-21T06:45:46.900Z",
updatedAt: "2023-07-21T06:45:46.900Z",
__v: 0
}
]
    console.log(" All Category ",customer,"Welcome")
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


    const rows = customer?.map((item: any) => {
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


export default LocationsView;
