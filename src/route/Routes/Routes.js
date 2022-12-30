import { createBrowserRouter } from 'react-router-dom';
import AddTask from '../../components/AddTask/AddTask';
import Route404 from '../../components/Route404/Route404';
import Main from '../../layouts/Main';
import Comments from '../../components/CompletedTasks/Comments/Comments';
import CompletedTasks from '../../components/CompletedTasks/CompletedTasks';
import EditTask from '../../components/EditTask/EditTask';
import Home from '../../components/Home/Home';
import Login from '../../components/Login/Login';
import MyTasks from '../../components/MyTasks/MyTasks';
import Register from '../../components/Register/Register';
import TaskDetails from '../../components/MyTasks/TaskDetails/TaskDetails';
import PrivateRoutes from '../PrivateRoutes/PrivateRoutes';
import Media from '../../components/Media/Media';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/addTask',
                element: <PrivateRoutes><AddTask></AddTask></PrivateRoutes>
            },
            {
                path: '/myTasks',
                element: <PrivateRoutes><MyTasks></MyTasks></PrivateRoutes>
            },
            {
                path: '/myTask/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/tasks/${params.id}`),
                element: <PrivateRoutes><TaskDetails></TaskDetails></PrivateRoutes>
            },
            {
                path: '/editTask/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/tasks/${params.id}`),
                element: <PrivateRoutes><EditTask></EditTask></PrivateRoutes>
            },
            {
                path: '/completedTasks',
                element: <PrivateRoutes><CompletedTasks></CompletedTasks></PrivateRoutes>
            },
            {
                path: '/myComment/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/tasks/${params.id}`),
                element: <PrivateRoutes><Comments></Comments></PrivateRoutes>
            },
            {
                path: '/media',
                element: <PrivateRoutes><Media></Media></PrivateRoutes>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: '*',
        element: <Route404></Route404>
    }
])