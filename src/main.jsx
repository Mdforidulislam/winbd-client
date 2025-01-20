import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes.jsx';
import AuthContext from './Authentication/Authentication.jsx';
import { Toaster } from 'react-hot-toast';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <AuthContext>
          <Toaster />
          <div className='bg-[#111014]'>
            <RouterProvider router={router} />
          </div>
        </AuthContext>
  </React.StrictMode>,
)
