import React from "react";
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
import {
  Box,
  IconButton,
  Container,
  Grid,
  colors,
  Paper,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/system";
const CategoriesView = ({
  categories,
  setSelectedCategory,
  setOpen,
  setOpenConfirm,
}: any) => {
  const theme = useTheme();

  const navigate = useNavigate();
  
  const rows: GridRowsProp = categories?.feedback?.map((item: any) => {
    return {
          id: item._id,
          name: item.user.fullName,
           rating: item.rating,
           message: item.message,
          // startDate: item.startDate,
          // endDate: item.endDate,
          // lastBookingDate: item.lastBookingDate,
          // category: item.category.name,
          // price: item.price,
          // totalCapacity: item.totalCapacity,
          // duration: item.duration,
          // durationType: item.durationType,
          // location: item.location,
          // organizer: item.organizer,
          // rating: item.averageRating || 0,
          // totalReview : item.totalReview || 0,
          // images: item.images,
        };
  });

  const columns: GridColDef[] = [
           {
            field: "id",
            headerName: "ID",
            width: 150,
        },
         {
             field: "name",
             headerName: "Name",
             width: 150,
        },
         {
             field: "rating",
             headerName: "Rating",
             width: 150,
         },
         {
             field: "message",
             headerName: "Message",
             width: 150,
         },
    //     {
    //         field: "totalCapacity",
    //         headerName: "Capacity",
    //         width: 150,
    //     },
    //      {
    //         field: "organizer",
    //         headerName: "Organizer",
    //         width: 150,
    //     },
    //      {
    //         field: "rating",
    //         headerName: "AVG Rating",
    //         width: 150,
    // },
    //     {
    //         field: "totalReview",
    //         headerName: "Total Review",
    //         width: 150,
    //     },
    // {
    //   field: "images",
    //   headerName: "Image",
    //   width: 400,
    //   renderCell: (params: any) => (
    //     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    //       {params?.row?.images.map((current: any) => (
    //       <CardMedia
    //         component="img"
    //         height="100"
    //         image={current}
    //         alt="green iguana"
    //       />
    //       ))}
    //     </Box>
    //   ),
    // },

    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 100,
    //   renderCell: (params: any) => (
    //     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    //       <IconButton
    //         onClick={() => {
    //           setSelectedCategory(params.row);
    //           setOpen(true);
    //         }}
    //       >
    //         <EditRounded />
    //       </IconButton>
    //       <IconButton
    //         onClick={() => {
    //           setSelectedCategory(params.row);
    //           setOpenConfirm(true);
    //         }}
    //       >
    //         <DeleteForeverRounded />
    //       </IconButton>
    //     </Box>
    //   ),
    // },
  ];

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
              pageSize: 5,
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

export default CategoriesView;
