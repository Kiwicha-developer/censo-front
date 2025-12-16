import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import Usuarios from './Pages/Usuarios.jsx'
import Login from './Pages/Login.jsx'
import ProtectedRoute from './Routes/ProtectedRoute.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import './index.css'
import HeaderLayout from './Components/Static/HeaderLayout.jsx'
import Censos from './Pages/Censos.jsx'
import Datos from './Pages/Datos.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>

          <Route path="/" element={<Login />} />
          <Route element={<HeaderLayout />}>
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/censos" element={<Censos />} />
            <Route path="/datos" element={<Datos />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
