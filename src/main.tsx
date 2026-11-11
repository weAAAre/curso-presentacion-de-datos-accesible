import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'

const root = document.getElementById('root')

if (!root) {
  throw new Error('The application root was not found.')
}

createRoot(root).render(
  <StrictMode>
    <App pathname={window.location.pathname} />
  </StrictMode>,
)
