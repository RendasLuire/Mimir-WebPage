import React from 'react'
import ReactDOM from 'react-dom/client'
import MimirApp from './MimirApp'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <MimirApp />
    </React.StrictMode>,
  </BrowserRouter>
)
