import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Shared/Home/Home';
import Blog from '../Shared/Blog/Blog';
import CategorizedCars from '../Shared/Home/CarsCategory/CategorizedCars';
import Login from '../UserValidation/Login/Login';
import SignUp from '../UserValidation/SignUp/SignUp';


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
                element: <CategorizedCars></CategorizedCars>,
                loader: ({ params }) => fetch(`http://localhost:5000/cars/${params.company}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    }
])