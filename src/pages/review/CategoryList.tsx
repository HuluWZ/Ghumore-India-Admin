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
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/system";
import moment from "moment";

const CategoriesView = ({
  categories,
  setSelectedCategory,
  setOpen,
  setOpenConfirm,
}: any) => {
  const theme = useTheme();

  const navigate = useNavigate();
  console.log(" Feedback Data ", categories);
  const cat = {
    "totalFeedback": 5,
    "feedback": [
        {
            "_id": "64db2e63c9d3060668f08793",
            "user": {
                "_id": "64bf8563741a6b2f69ae24dd",
                "fullName": "Hakim Sha",
                "phoneNumber": "9183",
                "email": "hakimh1shaikh@gmail.com",
                "role": "USER",
                "__v": 0
            },
            "activity": {
                "reviews": [],
                "totalReview": 0,
                "_id": "64a426c43091349347f6af95",
                "name": "Four-Day Private Luxury Golden Triangle Tour to Agra and Jaipur From New Delhi",
                "description": "See some of India's most iconic cities on this comprehensive 4-day Golden Triangle tour. Relax in the comfort of a private air-conditioned vehicle and make your way between Delhi, Agra, and Jaipur. Your driver shares details, insight, and the history of historic landmarks along the way. See the sunrise over the Taj Mahal—a UNESCO World Heritage Site—head up to Amber Fort, and explore the Maharaja’s City Palace, with guides provided at each sight.",
                "price": 15959.84,
                "images": [
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484125/Image%20%281%29.png",
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484621/Image%20%282%29.png",
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484847/Image%20%283%29.png",
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484127/Image.png"
                ],
                "__v": 1
            },
            "rating": 4,
            "message": "The safari had its moments, especially when we spotted rare animals in their natural habitat. However, the vehicle seemed a bit outdated, and at times, it was hard to hear the guide's explanations. The wildlife was incredible, but there's room for improvement in terms of the overall experience",
            "createdAt": "2023-08-15T07:50:59.753Z",
            "updatedAt": "2023-08-15T08:35:09.703Z",
            "__v": 0
        },
        {
            "_id": "64db2e01c9d3060668f0878f",
            "user": {
                "_id": "64bf8563741a6b2f69ae24dd",
                "fullName": "Hakim Sha",
                "phoneNumber": "9183",
                "email": "hakimh1shaikh@gmail.com",
                "role": "USER",
                "__v": 0
            },
            "activity": {
                "reviews": [],
                "totalReview": 0,
                "_id": "64a426c43091349347f6af95",
                "name": "Four-Day Private Luxury Golden Triangle Tour to Agra and Jaipur From New Delhi",
                "description": "See some of India's most iconic cities on this comprehensive 4-day Golden Triangle tour. Relax in the comfort of a private air-conditioned vehicle and make your way between Delhi, Agra, and Jaipur. Your driver shares details, insight, and the history of historic landmarks along the way. See the sunrise over the Taj Mahal—a UNESCO World Heritage Site—head up to Amber Fort, and explore the Maharaja’s City Palace, with guides provided at each sight.",
                "price": 15959.84,
                "images": [
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484125/Image%20%281%29.png",
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484621/Image%20%282%29.png",
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484847/Image%20%283%29.png",
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484127/Image.png"
                ],
                "__v": 1
            },
            "rating": 4,
            "message": "The historical landmarks tour was a great way to learn about the city's past. The guide was well-versed in history, and I appreciated the convenience of the bus. Some stops felt a bit rushed, but I understand the need to cover a lot in one day",
            "createdAt": "2023-08-15T07:49:21.881Z",
            "updatedAt": "2023-08-15T07:49:21.881Z",
            "__v": 0
        },
        {
            "_id": "64db2ddac9d3060668f0878b",
            "user": {
                "_id": "64bf8563741a6b2f69ae24dd",
                "fullName": "Hakim Sha",
                "phoneNumber": "9183",
                "email": "hakimh1shaikh@gmail.com",
                "role": "USER",
                "__v": 0
            },
            "activity": {
                "reviews": [],
                "totalReview": 0,
                "_id": "64a426c43091349347f6af95",
                "name": "Four-Day Private Luxury Golden Triangle Tour to Agra and Jaipur From New Delhi",
                "description": "See some of India's most iconic cities on this comprehensive 4-day Golden Triangle tour. Relax in the comfort of a private air-conditioned vehicle and make your way between Delhi, Agra, and Jaipur. Your driver shares details, insight, and the history of historic landmarks along the way. See the sunrise over the Taj Mahal—a UNESCO World Heritage Site—head up to Amber Fort, and explore the Maharaja’s City Palace, with guides provided at each sight.",
                "price": 15959.84,
                "images": [
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484125/Image%20%281%29.png",
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484621/Image%20%282%29.png",
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484847/Image%20%283%29.png",
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484127/Image.png"
                ],
                "__v": 1
            },
            "rating": 4,
            "message": "I had an amazing time exploring the city with this tour. Our guide was so knowledgeable about the history and hidden gems. The itinerary was well-planned, and I got to see parts of the city I never would've found on my own. Highly recommended",
            "createdAt": "2023-08-15T07:48:42.615Z",
            "updatedAt": "2023-08-15T07:48:42.615Z",
            "__v": 0
        },
        {
            "_id": "64db2db2c9d3060668f08787",
            "user": {
                "_id": "64bf8563741a6b2f69ae24dd",
                "fullName": "Hakim Sha",
                "phoneNumber": "9183",
                "email": "hakimh1shaikh@gmail.com",
                "role": "USER",
                "__v": 0
            },
            "activity": {
                "reviews": [],
                "totalReview": 0,
                "_id": "64a43718cce770e615e62157",
                "name": "Private Full Day New and Old Mumbai City Tour",
                "description": "First-time visitors to Delhi will love touring the most beautiful and interesting sites in both Old and New Delhi on a private tour. Customize the tour to suit your interests or trust your experienced driver, who can...",
                "price": 2554.65,
                "images": [
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688478903/Image.png",
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688479023/Image1.png",
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688479028/image3.png"
                ],
                "__v": 1
            },
            "rating": 5,
            "message": "The trekking experience was exhilarating! The landscapes were breathtaking, and the guides were friendly and supportive. The only downside was that the trail was a bit more challenging than I expected, so make sure you're prepared physically. Overall, a great adventure",
            "createdAt": "2023-08-15T07:48:02.308Z",
            "updatedAt": "2023-08-15T07:48:02.308Z",
            "__v": 0
        },
        {
            "_id": "64db2d0ec9d3060668f08780",
            "user": {
                "_id": "64ad33e79d7a6dc15f84ee69",
                "fullName": "Admin Ghumore",
                "phoneNumber": "+1 (989) 955-9728",
                "email": "admin@ghumore.com",
                "role": "ADMIN",
                "__v": 0
            },
            "activity": {
                "reviews": [],
                "totalReview": 0,
                "_id": "64a426c43091349347f6af95",
                "name": "Four-Day Private Luxury Golden Triangle Tour to Agra and Jaipur From New Delhi",
                "description": "See some of India's most iconic cities on this comprehensive 4-day Golden Triangle tour. Relax in the comfort of a private air-conditioned vehicle and make your way between Delhi, Agra, and Jaipur. Your driver shares details, insight, and the history of historic landmarks along the way. See the sunrise over the Taj Mahal—a UNESCO World Heritage Site—head up to Amber Fort, and explore the Maharaja’s City Palace, with guides provided at each sight.",
                "price": 15959.84,
                "images": [
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484125/Image%20%281%29.png",
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484621/Image%20%282%29.png",
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484847/Image%20%283%29.png",
                    "https://res.cloudinary.com/dqednriao/image/upload/v1688484127/Image.png"
                ],
                "__v": 1
            },
            "rating": 5,
            "message": "A food lover's dream come true! This tour introduced me to the most delicious local dishes and flavors. Each stop was carefully selected, and the guide shared fascinating insights about the culinary culture. Don't miss this if you're a foodie!",
            "createdAt": "2023-08-15T07:45:18.226Z",
            "updatedAt": "2023-08-15T07:45:18.226Z",
            "__v": 0
        }
    ],
    "success": true
}
  const rows: GridRowsProp = cat?.feedback?.map((item: any) => {
    return {
          id: item._id,
          fullName: item.user?.fullName,
          phone: item.user?.phoneNumber,
          // email: item.user?.email,
          activity: item.activity?.name,
          rating: item.rating,
          message: item.message,
          createdAt: item.createdAt,
        };
  });

  const columns: GridColDef[] = [
           {
            field: "fullName",
            headerName: "FullName",
            width: 130,
        },
        {
            field: "message",
            headerName: "Review",
            width: 300,
        },
        // {
        //     field: "email",
        //     headerName: "Email",
        //     width: 150,
        // },
        {
            field: "phone",
            headerName: "Phone",
            width: 150,
        },
        {
            field: "activity",
            headerName: "Activity",
            width: 150,
        },
        {
            field: "rating",
            headerName: "Rating",
            width: 50,
        },
        {
            field: "createdAt",
            headerName: "Date",
            width: 150,
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
      width: 100,
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
