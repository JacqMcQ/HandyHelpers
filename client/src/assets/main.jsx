import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bulma/css/bulma.css';

import App from './App.jsx'
import Home from './pages/Home';
import User from './pages/User';
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
        path: '/User',
        element: <User />
      }, {
        path: '/job-center',
        element: <JobCenter />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />  {/* Wrap the app with RouterProvider */}
  </StrictMode>,
)
