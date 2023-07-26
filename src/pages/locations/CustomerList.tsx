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
    const customer = [{"_id":"64ba28abe1350d9d1c706a8e","name":"Ahmedabad","image":"https://res.cloudinary.com/dqednriao/image/upload/v1689921707/2023-01-24.png","url":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.7484269774!2d72.41492735942712!3d23.020474102702952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2z4Yqg4YiF4YiY4Yu14Yqj4Ymj4Yu1LCDhjInhjIDhiKvhibUsIOGIheGKleGLtQ!5e0!3m2!1sam!2set!4v1689921482780!5m2!1sam!2set","createdAt":"2023-07-21T06:41:47.914Z","updatedAt":"2023-07-21T06:41:47.914Z","__v":0},{"_id":"64ba2792e1350d9d1c706a86","name":"Rishikesh","image":"https://res.cloudinary.com/dqednriao/image/upload/v1689921425/2022-10-16.jpg","url":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220944.21811583586!2d78.2676115918164!3d30.086928067392858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39093e67cf93f111%3A0xcc78804a6f941bfe!2zUmlzaGlrZXNoLCDhiqHhibPhiKvhiqjhiIPhipXhi7UsIOGIheGKleGLtQ!5e0!3m2!1sam!2set!4v1689921400470!5m2!1sam!2set","createdAt":"2023-07-21T06:37:06.102Z","updatedAt":"2023-07-21T06:37:06.102Z","__v":0},{"_id":"64ba2685e1350d9d1c706a82","name":"Shimla","image":"https://res.cloudinary.com/dqednriao/image/upload/v1689921157/unsplash_BgF8HUIg2JY%20%289%29.png","url":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54674.0939923595!2d77.11782133504737!3d31.078286363926324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390578e3e35d6e67%3A0x1f7e7ff6ff9f54b7!2zU2hpbWxhLCDhiILhiJvhibvhiI0g4Y2V4Yir4Yu04Yi9LCDhiIXhipXhi7U!5e0!3m2!1sam!2set!4v1689921114862!5m2!1sam!2set","createdAt":"2023-07-21T06:32:37.997Z","updatedAt":"2023-07-21T06:32:37.997Z","__v":0},{"_id":"64ba263ce1350d9d1c706a7f","name":"Bengaluru","image":"https://res.cloudinary.com/dqednriao/image/upload/v1689921083/unsplash_BgF8HUIg2JY%20%288%29.png","url":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497698.7749192471!2d77.3012632998092!3d12.95445953625408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2z4Ymg4YqV4YyL4YiJ4YipLCDhiqvhiKvhipPhibPhiqssIOGIheGKleGLtQ!5e0!3m2!1sam!2set!4v1689921035990!5m2!1sam!2set","createdAt":"2023-07-21T06:31:24.354Z","updatedAt":"2023-07-21T06:31:24.354Z","__v":0},{"_id":"64ba25f2e1350d9d1c706a7c","name":"Jaipur","image":"https://res.cloudinary.com/dqednriao/image/upload/v1689921009/unsplash_BgF8HUIg2JY%20%287%29.png","url":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.43602179879!2d75.6257431967345!3d26.885421391770393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2z4YyE4Yqi4Y2R4YitLCDhiKvhjIPhiLXhibPhiIPhipUsIOGIheGKleGLtQ!5e0!3m2!1sam!2set!4v1689920971050!5m2!1sam!2set","createdAt":"2023-07-21T06:30:10.801Z","updatedAt":"2023-07-21T06:30:10.801Z","__v":0},{"_id":"64ba25b1e1350d9d1c706a79","name":"Agra","image":"https://res.cloudinary.com/dqednriao/image/upload/v1689920944/unsplash_BgF8HUIg2JY%20%286%29.png","url":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113579.63882736632!2d77.89761057942921!3d27.176303144067827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39740d857c2f41d9%3A0x784aef38a9523b42!2z4Yqg4YyN4YirLCDhiqHhibPhiK0g4Y2V4Yis4Yuy4Yi9LCDhiIXhipXhi7U!5e0!3m2!1sam!2set!4v1689920912488!5m2!1sam!2set","createdAt":"2023-07-21T06:29:05.529Z","updatedAt":"2023-07-21T06:29:05.529Z","__v":0},{"_id":"64ba2573e1350d9d1c706a76","name":"Kolkata","image":"https://res.cloudinary.com/dqednriao/image/upload/v1689920882/unsplash_BgF8HUIg2JY%20%285%29.png","url":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.2168965095!2d88.26495020916566!3d22.53556493749997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2z4Yqu4YiN4Yqr4YmzLCDhiJ3hi5XhiKvhiaUg4Ymk4YqV4YyL4YiNLCDhiIXhipXhi7U!5e0!3m2!1sam!2set!4v1689920846630!5m2!1sam!2set","createdAt":"2023-07-21T06:28:03.774Z","updatedAt":"2023-07-21T06:28:03.774Z","__v":0},{"_id":"64ba2504e1350d9d1c706a73","name":"Mumbai","image":"https://res.cloudinary.com/dqednriao/image/upload/v1689920771/unsplash_BgF8HUIg2JY%20%284%29.png","url":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.67292409847!2d72.71637040996286!3d19.082502007519654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2z4YiZ4Yid4Ymj4YutLCDhiJvhiIPhiKvhiL3hibXhiKssIOGIheGKleGLtQ!5e0!3m2!1sam!2set!4v1689920730719!5m2!1sam!2set","createdAt":"2023-07-21T06:26:12.740Z","updatedAt":"2023-07-21T06:26:12.740Z","__v":0},{"_id":"64ba24bee1350d9d1c706a70","name":"Chennai","image":"https://res.cloudinary.com/dqednriao/image/upload/v1689920701/unsplash_BgF8HUIg2JY%20%283%29.png","url":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.23106714064!2d79.87933557907066!3d13.047985942475682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2z4Ym44YqT4YutLCDhibPhiJrhiI0g4YqT4YuxLCDhiIXhipXhi7U!5e0!3m2!1sam!2set!4v1689920655351!5m2!1sam!2set","createdAt":"2023-07-21T06:25:02.688Z","updatedAt":"2023-07-21T06:25:02.688Z","__v":0},{"_id":"64ba2472e1350d9d1c706a6d","name":"Port Blair","image":"https://res.cloudinary.com/dqednriao/image/upload/v1689920625/unsplash_BgF8HUIg2JY%20%282%29.png","url":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125058.26971056532!2d92.64006119438201!3d11.618293566140597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3088946c176b5971%3A0x5bfa43a5e9a5ed30!2zUG9ydCBCbGFpciwg4Yqg4YqQ4Yuz4Yib4YqVIOGKpeGKkyDhipLhiq7hiaPhiK0g4Yuw4Yi04Ym24Ym9LCDhiIXhipXhi7U!5e0!3m2!1sam!2set!4v1689920554914!5m2!1sam!2set","createdAt":"2023-07-21T06:23:46.449Z","updatedAt":"2023-07-21T06:23:46.449Z","__v":0},{"_id":"64ba2403e1350d9d1c706a6a","name":"Delhi","image":"https://res.cloudinary.com/dqednriao/image/upload/v1689920514/unsplash_BgF8HUIg2JY%20%281%29.png","url":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448193.9510443858!2d76.76356337306456!3d28.64428735019557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2z4Yu04YiKLCDhiIXhipXhi7U!5e0!3m2!1sam!2set!4v1689920480480!5m2!1sam!2set","createdAt":"2023-07-21T06:21:55.965Z","updatedAt":"2023-07-21T06:21:55.965Z","__v":0},{"_id":"64ba23c6e1350d9d1c706a67","name":"Hyderabad","image":"https://res.cloudinary.com/dqednriao/image/upload/v1689920454/unsplash_BgF8HUIg2JY.png","url":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d974600.6069751087!2d77.22504964774673!3d17.410174091522254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2z4YiD4Yut4Yuw4Yio4Ymj4Yu1LCDhibThiIvhipDhjIvhipMsIOGIheGKleGLtQ!5e0!3m2!1sam!2set!4v1689920351358!5m2!1sam!2set","createdAt":"2023-07-21T06:20:54.868Z","updatedAt":"2023-07-21T06:20:54.868Z","__v":0},{"_id":"64ba22e5e1350d9d1c706a64","name":"Paris","image":"https://res.cloudinary.com/dqednriao/image/upload/v1689920227/swox6wjsl5ndvkv5jvum.jpg","url":"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.77824454755!2d2.2646338334598903!3d48.858938435321804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2z4Y2T4Yiq4Yi1LCDhjYjhiKjhipXhiLPhi60!5e0!3m2!1sam!2set!4v1689920072610!5m2!1sam!2set","createdAt":"2023-07-21T06:17:09.420Z","updatedAt":"2023-07-21T06:17:09.420Z","__v":0}]
    console.log(" All Location ",customer,"Welcome")
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
};


export default LocationsView;
