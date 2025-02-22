import React from 'react'
import { createRoot } from 'react-dom/client'
import './scss/index.scss'
import App from './App'

// Get the root element and ensure it exists
const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Failed to find the root element')
}

// Create a root using React 19's createRoot API
const root = createRoot(rootElement)

// Render the app
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
