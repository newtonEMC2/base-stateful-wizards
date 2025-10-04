import React from 'react'

import {
  useWizardController,
  WizardAccordionLayout,
  WizardAccordionStep,
  WizardAccordionStepHeader,
  WizardAccordionStepContent,
} from '../index'

const SimpleStepContent: React.FC<{
  title: string
  description: string
  onComplete: () => void
  onBack?: () => void
  isCompleted: boolean
  showBackButton?: boolean
}> = ({
  title,
  description,
  onComplete,
  onBack,
  isCompleted,
  showBackButton,
}) => (
  <div style={{ padding: '16px' }}>
    <p
      style={{
        marginBottom: '16px',
        color: '#666',
      }}
    >
      {description}
    </p>
    {isCompleted && (
      <p style={{ marginBottom: '16px', color: '#2E7D32' }}>
        🎉 <strong>This step is completed!</strong>
      </p>
    )}
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      {showBackButton && (
        <button
          onClick={onBack}
          style={{
            backgroundColor: '#757575',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          ← Back
        </button>
      )}
      <button
        onClick={onComplete}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        {`Complete ${title}`}
      </button>
    </div>
  </div>
)

export const WizardExample: React.FC = () => {
  const wizardSteps = [
    { id: 'step1', title: 'Step 1' },
    { id: 'step2', title: 'Step 2' },
    { id: 'step3', title: 'Step 3' },
  ]

  const wizard = useWizardController({
    steps: wizardSteps,
    initialStep: 'step1',
  })

  const handleStepComplete = (stepId: string) => {
    wizard.completeStep(stepId)
    if (!wizard.isLastStep) {
      wizard.goToNextStep()
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>
        Simple Wizard Example
      </h2>

      <WizardAccordionLayout
        steps={wizard.steps}
        currentStepId={wizard.currentStepId}
        onStepClick={wizard.goToStep}
      >
        <WizardAccordionStep id="step1" title="Step 1">
          <WizardAccordionStepHeader>
            {({ isCompleted, isActive }) => (
              <div
                style={{
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ marginRight: '8px', fontSize: '18px' }}>
                  {isCompleted ? '✅' : isActive ? '▶️' : '⏸️'}
                </span>
                <strong>First Step</strong>
              </div>
            )}
          </WizardAccordionStepHeader>
          <WizardAccordionStepContent>
            <SimpleStepContent
              title="Step 1"
              description="This is the first step of the wizard. Click the button to complete it."
              onComplete={() => handleStepComplete('step1')}
              isCompleted={
                wizard.steps.find(s => s.id === 'step1')?.isCompleted || false
              }
              showBackButton={false} // First step doesn't need back button
            />
          </WizardAccordionStepContent>
        </WizardAccordionStep>

        <WizardAccordionStep id="step2" title="Step 2">
          <WizardAccordionStepHeader>
            {({ isCompleted, isActive }) => (
              <div
                style={{
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ marginRight: '8px', fontSize: '18px' }}>
                  {isCompleted ? '✅' : isActive ? '▶️' : '⏸️'}
                </span>
                <strong>Second Step</strong>
              </div>
            )}
          </WizardAccordionStepHeader>
          <WizardAccordionStepContent>
            <SimpleStepContent
              title="Step 2"
              description="This is the second step. You can only access this after completing step 1."
              onComplete={() => handleStepComplete('step2')}
              onBack={() => {
                wizard.goToPreviousStep()
              }}
              isCompleted={
                wizard.steps.find(s => s.id === 'step2')?.isCompleted || false
              }
              showBackButton={!wizard.isFirstStep}
            />
          </WizardAccordionStepContent>
        </WizardAccordionStep>

        <WizardAccordionStep id="step3" title="Step 3">
          <WizardAccordionStepHeader>
            {({ isCompleted, isActive }) => (
              <div
                style={{
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ marginRight: '8px', fontSize: '18px' }}>
                  {isCompleted ? '✅' : isActive ? '▶️' : '⏸️'}
                </span>
                <strong>Final Step</strong>
              </div>
            )}
          </WizardAccordionStepHeader>
          <WizardAccordionStepContent>
            <SimpleStepContent
              title="Step 3"
              description="This is the final step. Complete this to finish the wizard."
              onComplete={() => handleStepComplete('step3')}
              onBack={() => wizard.goToPreviousStep()}
              isCompleted={
                wizard.steps.find(s => s.id === 'step3')?.isCompleted || false
              }
              showBackButton={!wizard.isFirstStep}
            />
          </WizardAccordionStepContent>
        </WizardAccordionStep>
      </WizardAccordionLayout>

      {wizard.steps.every(step => step.isCompleted) && (
        <div
          style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: '#E8F5E8',
            borderRadius: '8px',
            textAlign: 'center',
            color: '#2E7D32',
          }}
        >
          🎉 <strong>All steps completed!</strong>
        </div>
      )}
    </div>
  )
}
