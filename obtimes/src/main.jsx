import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './components/screens/auth/Login.jsx'
import Register from './components/screens/auth/Register.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Home from './components/screens/home/home.jsx'
import Router from './components/ui/Router.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
)
