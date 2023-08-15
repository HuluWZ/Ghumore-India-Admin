// import react-router-dom components
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// import layout components
import MainLayout from '../pages/layout/MainLayout';
import PrivateRoute from './PrivateRoute';
import NotFound from '../components/404';

// import pages
import SignIn from '../pages/auth/Login';
import SignUp from '../pages/auth/Register';

import Dashboard from '../pages/dashboard';
import DashboardContent from '../pages/layout/DashboardLayout/Dashboard';

import CustomerList from '../pages/customers';

import CategoriesList from '../pages/categories';

import ProductList from '../pages/products';
import ProductsDetail from '../pages/products/ProductDetail';

import ReviewList from '../pages/review';

import OrderList from '../pages/orders';
import OrderDetail from '../pages/orders/OrderDetail';

import LocationList from '../pages/locations';
import DestinationList from '../pages/destination';

import SaleList from '../pages/sales';
import DiscountList from '../pages/discounts';

import ReportList from '../pages/report';
import OrderReport from '../pages/report/OrderReport';
import SalesReport from '../pages/report/SalesReport';
import StokeAlert from '../pages/report/StokeAlert';

import Settings from '../pages/settings';

import Profile from '../pages/profile';
import Sales from '../pages/sales';


const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/auth" element={<MainLayout />}>
                <Route path="login" element={<SignIn />} />
                <Route path="register" element={<SignUp />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Navigate to="/app/dashboard" />} />
                <Route path="app" element={<DashboardContent />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="activity" element={<CategoriesList />} />
                    <Route path="users" element={<Outlet />}>
                        <Route index element={<ProductList />} />
                        <Route path=":id" element={<ProductsDetail />} />
                    </Route>
                    <Route path="bookings" element={<Outlet />}>
                        <Route index element={<OrderList />} />
                        <Route path=":id" element={<OrderDetail />} />
                    </Route>
                    <Route path="locations" element={<DiscountList />} />
                    <Route path="category" element={<SaleList />} />
                    <Route path="discount" element={<CustomerList />} />
                    <Route path="review" element={<ReviewList />} />

                    <Route path="reports" element={<Outlet />}>
                        <Route index element={<ReportList />} />
                        <Route path="order" element={<OrderReport />} />
                        <Route path="sales" element={<SalesReport />} />
                        <Route path="stoke" element={<StokeAlert />} />
                    </Route>
                    <Route path="settings" element={<Settings />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};


export default RoutesComponent;