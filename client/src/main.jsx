import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./reducer"
import { Toaster } from 'react-hot-toast';
const store = configureStore({
  reducer: rootReducer
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    <Toaster
  position="top-right"
  reverseOrder={false}
  gutter={12}
  containerStyle={{
    top: 20,
    right: 20,
  }}
  toastOptions={{
    duration: 3000,
    style: {
      background: "#1f2937", // dark gray
      color: "#fff",
      padding: "12px 16px",
      borderRadius: "12px",
      fontSize: "14px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    },

    success: {
      iconTheme: {
        primary: "#22c55e",
        secondary: "#fff",
      },
      style: {
        border: "1px solid #22c55e",
      },
    },

    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
      style: {
        border: "1px solid #ef4444",
      },
    },
  }}
/>
    </Provider>
  </StrictMode>,
)
