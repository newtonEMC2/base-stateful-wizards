import React from 'react'
import { createRoot } from 'react-dom/client'
import { AccordionComponent } from './lib/accordion.component'

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Accordion Development</h1>
      <h2>Your Accordion Component:</h2>
      <AccordionComponent />
    </div>
  )
}

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
