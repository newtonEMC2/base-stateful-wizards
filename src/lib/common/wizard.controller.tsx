/**
 * This is the controlled Wizard Controller version.
 * As opposed to uncontrolled, we will use this one to manage the wizard state outside of the component.
 * This is useful when we want to persist the state of the wizard outside of the component (e.g. in a parent component or in a global state).
 */

import { WizardStepData } from './types'

interface WizardControllerProps {
  steps: WizardStepData[]
  currentStepId: string
  onStepsChange: (steps: WizardStepData[]) => void
  onStepChange: (stepId: string) => void
}

interface WizardControllerReturn {
  steps: WizardStepData[]
  currentStepId: string
  goToStep: (stepId: string, currentSteps?: WizardStepData[]) => void
  goToNextStep: (currentSteps?: WizardStepData[]) => void
  goToPreviousStep: (currentSteps?: WizardStepData[]) => void
  completeStep: (stepId: string, currentSteps?: WizardStepData[]) => void
  isFirstStep: boolean
  isLastStep: boolean
  canGoToNextStep: boolean
}

export const createWizardController = ({
  steps: initialSteps,
  currentStepId: initialCurrentStepId,
  onStepsChange,
  onStepChange,
}: WizardControllerProps): WizardControllerReturn => {
  // Helper to update steps
  const updateSteps = (
    steps: WizardStepData[],
    stepId: string,
    isOpen: boolean
  ) => {
    const newSteps = steps.map(step => ({
      ...step,
      isOpen: step.id === stepId ? isOpen : step.isOpen,
    }))
    onStepsChange(newSteps)
    return newSteps
  }

  // Navigate to specific step
  const goToStep = (
    stepId: string,
    currentSteps: WizardStepData[] = initialSteps
  ) => {
    const targetStep = currentSteps.find(step => step.id === stepId)
    if (!targetStep) return

    const currentStepId =
      currentSteps.find(step => step.isOpen)?.id || initialCurrentStepId

    // Close current step and open target step
    currentSteps = updateSteps(currentSteps, currentStepId, false) //close current step
    updateSteps(currentSteps, stepId, true) //open next step
    onStepChange(stepId)
  }

  // Navigate to next step
  const goToNextStep = (currentSteps: WizardStepData[] = initialSteps) => {
    const currentStepId =
      currentSteps.find(step => step.isOpen)?.id || initialCurrentStepId
    const currentStepIndex = currentSteps.findIndex(
      step => step.id === currentStepId
    )

    if (currentStepIndex < currentSteps.length - 1) {
      const nextStepId = currentSteps[currentStepIndex + 1].id
      goToStep(nextStepId, currentSteps)
    }
  }

  // Navigate to previous step
  const goToPreviousStep = (currentSteps: WizardStepData[] = initialSteps) => {
    const currentStepId =
      currentSteps.find(step => step.isOpen)?.id || initialCurrentStepId
    const currentStepIndex = currentSteps.findIndex(
      step => step.id === currentStepId
    )

    if (currentStepIndex > 0) {
      const previousStepId = currentSteps[currentStepIndex - 1].id
      goToStep(previousStepId, currentSteps)
    }
  }

  // Mark a step as completed
  const completeStep = (
    stepId: string,
    currentSteps: WizardStepData[] = initialSteps
  ) => {
    const newSteps = currentSteps.map(step => ({
      ...step,
      isCompleted: step.id === stepId ? true : step.isCompleted,
    }))
    onStepsChange(newSteps)
  }

  // Initial state flags
  const currentStepIndex = initialSteps.findIndex(
    step => step.id === initialCurrentStepId
  )
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === initialSteps.length - 1
  const canGoToNextStep =
    !isLastStep && initialSteps[currentStepIndex].isCompleted

  return {
    steps: initialSteps,
    currentStepId: initialCurrentStepId,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    completeStep,
    isFirstStep,
    isLastStep,
    canGoToNextStep,
  }
}
