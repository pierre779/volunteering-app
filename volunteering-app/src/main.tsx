import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Imports stylesheet & SignUp panel
import './stylesheets/sign-up.css'
import SignUp from './SignUp.tsx'
import SignIn from './SignIn.tsx'

const router = createBrowserRouter([
{path:"/", element:<SignUp />},
{path:"/signin", element:<SignIn />},
{path:"/dashboard", element: <p>Dashboard Placeholder</p>},
{path:"*", element:<h1>ERROR 404: PAGE NOT FOUND</h1>},
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
