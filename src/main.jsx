import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
// import Home from './pages/Home';
import MainLayout from './MainLayout/MainLayout';
import Dashboard from './dashboard/Dashboard';
import AuthProvider from './providers/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
    <BrowserRouter>
   <Routes>
       {/* <Route  element={<MainLayout />} > */}
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Dashboard />} />
       {/* </Route> */}
    </Routes>
  </BrowserRouter>
      </AuthProvider>
  </StrictMode>,
)
