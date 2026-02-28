/**
 * Application entry point.
 * Mounts the React tree into the DOM and wraps it with:
 *  - StrictMode  – highlights potential problems during development.
 *  - QueryClientProvider – provides TanStack React Query context so
 *    every component can use useQuery / useSuspenseQuery.
 */
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'

// Create a single QueryClient instance shared by the entire app
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
