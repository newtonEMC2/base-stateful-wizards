/**
 * Development testing file for the Wizard Accordion component.
 * This file is used only for local development and testing purposes.
 * Run with 'pnpm dev' to start the development server.
 * Not included in the final package bundle.
 */
import React from 'react'
import { createRoot } from 'react-dom/client'
import { WizardExample } from './lib/vertical-stateful-wizard/wizard.example'

const App: React.FC = () => {
  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '32px' }}>
        Wizard Accordion Development
      </h1>
      <WizardExample />
    </div>
  )
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
