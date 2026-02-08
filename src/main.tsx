import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// HashRouter for static hosting (Porkbun) where server-side rewrites aren't available.
// Routes become rlv.lol/stullv2/#/calc instead of rlv.lol/stullv2/calc — but they survive refresh.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
