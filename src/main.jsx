import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
// import Home from './pages/Home';
import MainLayout from './MainLayout/MainLayout';
import Dashboard from './dashboard/Dashboard';
import AuthProvider from './providers/AuthProvider';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Goals from './pages/Goals';
import TaskManager from './components/TaskManager';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
    <BrowserRouter>
   <Routes>
       <Route path="/" element={<Dashboard />} >
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="/" element={<Dashboard />} /> */}
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/" element={<TaskManager />} />
      <Route path="/goals" element={<Goals />} />
       </Route>
    </Routes>
      </BrowserRouter>
      </AuthProvider>
      </QueryClientProvider>
  </StrictMode>
)
