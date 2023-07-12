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
  console.log(" Categories ", categories);
  const rows: GridRowsProp = categories?.activity?.map((item: any) => {
    return {
          id: item._id,
          name: item.name,
          description: item.description,
          area: item.area,
          price: item.price,
          totalCapacity: item.totalCapacity,
          duration: item.duration,
          durationType: item.durationType,
          location: item.location,
          organizer: item.organizer,
          rating: item.rating,
          images: item.images,
        };
  });

  const columns: GridColDef[] = [
    {
            field: "name",
            headerName: "Name",
            width: 150,
        },
        {
            field: "description",
            headerName: "Description",
            width: 150,
        },
        {
            field: "area",
            headerName: "Area",
            width: 150,
        },
        {
            field: "price",
            headerName: "Price",
            width: 150,
        },
        {
            field: "totalCapacity",
            headerName: "Capacity",
            width: 150,
        },
        {
            field: "duration",
            headerName: "Duration",
            width: 150,
            valueGetter: (params) =>  `${params.row.duration}  ${params.row.durationType || ''}`,
        },
        {
            field: "location",
            headerName: "Location",
            width: 150,
        },
         {
            field: "organizer",
            headerName: "Organizer",
            width: 150,
        },
         {
            field: "rating",
            headerName: "Rating",
            width: 150,
        },
    {
      field: "images",
      headerName: "Image",
      width: 400,
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {params.row.images.map((current: any) => (
          <CardMedia
            component="img"
            height="100"
            image={current}
            alt="green iguana"
          />
          ))}
        </Box>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            onClick={() => {
              setSelectedCategory(params.row);
              setOpen(true);
            }}
          >
            <EditRounded />
          </IconButton>
          <IconButton
            onClick={() => {
              setSelectedCategory(params.row);
              setOpenConfirm(true);
            }}
          >
            <DeleteForeverRounded />
          </IconButton>
        </Box>
      ),
    },
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
