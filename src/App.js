import { Toaster } from 'react-hot-toast';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './route/Routes/Routes';

function App() {

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
