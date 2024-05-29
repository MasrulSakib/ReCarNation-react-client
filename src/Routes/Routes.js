import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Shared/Home/Home';
import Blog from '../Shared/Blog/Blog';
import CategorizedCars from '../Shared/Home/CarsCategory/CategorizedCars';
import Login from '../UserValidation/Login/Login';
import SignUp from '../UserValidation/SignUp/SignUp';
import PrivateRoutes from './PrivateRoutes';
import DashboardLayout from '../DashBoardLayout/DashboardLayout';
import MyOrders from '../DashBoardLayout/MyOrders/MyOrders';
import NotFound from '../NotFound/NotFound';
import PrivateBuyer from './PrivateBuyer';
import PrivateAdmin from './PrivateAdmin';
import AllUsers from '../DashBoardLayout/AllUsers/AllUsers';
import AllBuyers from '../DashBoardLayout/AllUsers/AllBuyers';
import AllSellers from '../DashBoardLayout/AllUsers/AllSellers';
import AddProducts from '../DashBoardLayout/AddProducts/AddProducts';
import PrivateSeller from './PrivateSeller';
import MyProducts from '../DashBoardLayout/MyProducts/MyProducts';
import ReportedCars from '../DashBoardLayout/ReportedCars/ReportedCars';
// import CarData from '../Shared/Home/CarsCategory/CarData';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/categorizedcars/:company',
                element: <PrivateRoutes><CategorizedCars></CategorizedCars></PrivateRoutes>,
                loader: ({ params }) => fetch(`http://localhost:5000/cars/${params.company}`)
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
            {
                path: '/dashboard/myorders',
                element: <PrivateBuyer><MyOrders></MyOrders></PrivateBuyer>
            },
            {
                path: '/dashboard/allusers',
                element: <PrivateAdmin><AllUsers></AllUsers></PrivateAdmin>,
            },
            {
                path: '/dashboard/users/buyers',
                element: <PrivateAdmin><AllBuyers></AllBuyers></PrivateAdmin>
            },
            {
                path: '/dashboard/users/sellers',
                element: <PrivateAdmin><AllSellers></AllSellers></PrivateAdmin>
            },
            {
                path: '/dashboard/reportedcars/post',
                element: <PrivateAdmin><ReportedCars></ReportedCars></PrivateAdmin>
            },
            {
                path: '/dashboard/addproduct',
                element: <PrivateSeller><AddProducts></AddProducts></PrivateSeller>
            },
            {
                path: '/dashboard/myproducts',
                element: <PrivateSeller><MyProducts></MyProducts></PrivateSeller>
            },

        ]
    },

    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/signup',
        element: <SignUp></SignUp>
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    },

])