import { Toaster } from 'react-hot-toast';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './route/Routes/Routes';
import { useContext } from 'react';
import { AuthContext } from './context/AuthProvider';

function App() {
  const { theme } = useContext(AuthContext);
  const bgTheme = theme ? 'bgDark' : 'bgLight';
  return (
    <div className={bgTheme}>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
