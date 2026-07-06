import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import HeaderUI from './components/HeaderUI.tsx'
import AlertUI from './components/AlertUI.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeaderUI />
    <App />
  </StrictMode>,
)
