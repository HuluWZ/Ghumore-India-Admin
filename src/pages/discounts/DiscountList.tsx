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


const DiscountView=({
    discounts,
    setSelectedDiscount,
    setOpen,
    setOpenConfirm,
    selectedDiscount
}: any) => {

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
            minWidth: 200
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
                        height="100"
                        image={row?.image}
                        alt="green iguana"
                        
                     />
        
                 </Box>
                </>
            }
        },
        {
            field: "url",
            headerName: "URL",
            minWidth: 200,
            renderCell: (params: any) => {
                const { row } = params;
                return <>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <a href={row?.url} target="_blank">View On Map</a>
                         {/* <iframe src={row?.url}  width="400" height="300" loading="lazy"> 
                        </iframe>  */}
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
                                setSelectedDiscount(row);
                                setOpen(true);
                            }}
                        >
                            <EditRounded />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setSelectedDiscount(row);
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
   
 const rows = discounts?.location?.map((item: any) => {
        return {
            id: item?._id,
            name: item?.name,
            parent: item?.parent?item?.parent:"-",
            image: item?.image,
            url: item?.url,
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
}
export default DiscountView;