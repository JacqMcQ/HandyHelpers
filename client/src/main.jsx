import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'
import 'bulma/css/bulma.css';

import App from './App.jsx'
import Home from './pages/Home';
import Profile from './pages/Profile';
import CleaningServices from './pages/CleaningServices';
import RepairServices from './pages/RepairServices';
import Login from './pages/Login';
import Signup from './pages/Signup';
import JobCenter from './pages/JobCenter';
import Error from './pages/Error';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/Profile',
        element: <Profile />
      }, {
        path: '/job-center',
        element: <JobCenter />
      }, {
        path: '/cleaning-services',
        element: <CleaningServices />
      }, {
        path: '/repair-services',
        element: <RepairServices />
      }

    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
  );
  