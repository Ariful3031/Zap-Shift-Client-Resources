
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import { router } from './Routes/Router';
import AuthProvider from './Components/Contexts/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
