import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './stylesheets/sign-in.css'
// import App from './App.tsx'
import SignIn from './SignIn.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SignIn />
  </StrictMode>,
)
