import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashbordIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import GroupIcon from '@mui/icons-material/Group';
import DiscountIcon from '@mui/icons-material/Discount';
import CategoryIcon from '@mui/icons-material/Category';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { NavLink } from 'react-router-dom';
import { listItemClasses } from "@mui/material/ListItem";
import List from "@mui/material/List";
import { Typography, colors } from "@mui/material";
import ExploreIcon from '@mui/icons-material/Explore';
import ParaglidingIcon from '@mui/icons-material/Paragliding';
const listAdminItems = [
    {
        name: 'Dashboard',
        icon: <DashbordIcon />,
        path: '/app/dashboard',
    },
    {
        name: 'Activity',
        icon: <CategoryIcon />,
        path: '/app/categories',
    },
    {
        name: 'Users',
        icon: <PeopleIcon />,
        path: '/app/products',
    },
    {
        name: 'Bookings',
        icon: <AddShoppingCartIcon />,
        path: '/app/orders',
    },
    {
        name: 'Location',
        icon: <ExploreIcon />,
        path: '/app/location',
    },
    {
        name: 'Category',
        icon: <ParaglidingIcon />,
        path: '/app/category',
    }
];

const listReportItems = [
    {
        name: 'Reports',
        icon: <AssessmentIcon />,
        path: '/app/reports',
        color: colors.red[500],
    },
];

export const mainListItems = (
    <React.Fragment>
        <ListSubheader inset sx={{ fontFamily: 'Montserrat' }}>
            Admin
        </ListSubheader>
        <List
            sx={{
                [`& .active, & .${listItemClasses.root}:hover`]: {
                    "& .MuiListItemIcon-root": {
                        color: colors.blue[500],
                    },
                },
            }}

        >
            {listAdminItems.map((item, index) => (
                <ListItemButton key={index} component={NavLink} to={item.path}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name.toUpperCase()} />
                </ListItemButton>
            ))}
        </List>


    </React.Fragment >
);


//Secondary Nav Items
export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader inset sx={{ fontFamily: 'Montserrat' }}>
            Reports
        </ListSubheader>
        <List sx={{
            [`& .active, & .${listItemClasses.root}:hover`]: {
                "& .MuiListItemIcon-root": {
                    color: colors.blue[500],
                },
            },
        }}>
            {listReportItems.map((item, index) => (
                <ListItemButton key={index} component={NavLink} to={item.path}>
                    <ListItemIcon sx={{ color: item.color }}>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name.toUpperCase()} />
                </ListItemButton>))}
        </List>
    </React.Fragment>
);
