import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Imports stylesheet & SignUp panel
import './stylesheets/sign-up.css'
import SignUp from './SignUp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SignUp />
  </StrictMode>,
)
