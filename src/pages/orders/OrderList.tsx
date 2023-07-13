import React, { useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  DeleteForeverRounded,
  EditRounded,
  Money,
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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import moment from "moment";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { CssVarsProvider } from '@mui/joy/styles';
import Chip from '@mui/joy/Chip';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { HourglassBottomRounded } from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;

const OrdersView = ({
  orders,
  setSelectedOrder,
  setOpen,
  setOpenConfirm,
  approveOrderMutation,
}: any) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns: GridColDef[] = [
    
    {
      field: "activity",
      headerName: "Activity",
      minWidth: 150,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      minWidth: 150
    },
    {
      field: "time",
      headerName: "Time",
      minWidth: 150
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 150,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      minWidth: 150,
    },
    {
      field: "date",
      headerName: "Date",
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 50,
      renderCell: (params: any) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  background: theme.palette.background.paper,
                  boxShadow: theme.shadows[0],
                  opacity: 0.9,
                },
              }}
            >
              <MenuItem>
                <Link to={`${params.row.id}`}>
                  <VisibilityRounded sx={{ color: "primary.main" }} />
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOpen(true);
                  setSelectedOrder(params.row);
                }}
              >
                <EditRounded sx={{ color: "secondary.main" }} />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOpenConfirm(true);
                  setSelectedOrder(params.row);
                }}
              >
                <DeleteForeverRounded sx={{ color: "error.main" }} />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  approveOrderMutation(params.row.id);
                }}
              >
                <CheckCircleOutlineIcon sx={{ color: "success.main" }} />
              </MenuItem>
            </Menu>

          </Box>
        );
      },
    },
  ];

  const rows: GridRowsProp = orders?.booking?.map((item: any) => {
    return {
      id: item._id,
      name: item.option?.name,
      unitPrice: item.option?.unitPrice,
      time: item.option?.time,
      email: item.email,
      quantity: item.quantity,
      date: item.date,
      status: item.status,
      totalPrice: item.totalPrice
    };
  });

  return (
    <Container maxWidth="lg">
      <Paper sx={{ background: theme.palette.background.paper }} variant="outlined">
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20]}
          autoHeight
          pagination
          components={{
            Toolbar: GridToolbar,
          }}
          initialState={{
            pagination: {
              pageSize: 10,
            },

          }}
          checkboxSelection
        />
      </Paper>
    </Container>
  );
};

export default OrdersView;
