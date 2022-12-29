import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AddTask from './components/AddTask/AddTask';
import Comments from './components/CompletedTasks/Comments/Comments';
import CompletedTasks from './components/CompletedTasks/CompletedTasks';
import EditTask from './components/EditTask/EditTask';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import MyTasks from './components/MyTasks/MyTasks';
import TaskDetails from './components/MyTasks/TaskDetails/TaskDetails';
import Register from './components/Register/Register';
import Main from './layouts/Main';

function App() {
  const router = createBrowserRouter([
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
          element: <AddTask></AddTask>
        },
        {
          path: '/myTasks',
          element: <MyTasks></MyTasks>
        },
        {
          path: '/myTask/:id',
          loader: ({ params }) => fetch(`http://localhost:5000/tasks/${params.id}`),
          element: <TaskDetails></TaskDetails>
        },
        {
          path: '/editTask/:id',
          loader: ({ params }) => fetch(`http://localhost:5000/tasks/${params.id}`),
          element: <EditTask></EditTask>
        },
        {
          path: '/completedTasks',
          element: <CompletedTasks></CompletedTasks>
        },
        {
          path: '/completedTask/comments/:id',
          loader: ({ params }) => fetch(`http://localhost:5000/completedTask/comments/${params.id}`),
          element: <Comments></Comments>
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
    }
  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
