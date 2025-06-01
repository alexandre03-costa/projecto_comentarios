import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Comentarios from './Comentarios.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Comentarios/>
  </StrictMode>,
)
