import { useCallback, useMemo, useState } from 'react'

import {
  UseWizardProps,
  UseWizardReturn,
  WizardStepData,
} from '../common/types'

export const useWizardController = ({
  steps: initialSteps,
  initialStep,
}: UseWizardProps): UseWizardReturn => {
  // initialize steps with isOpen and isCompleted states
  const [steps, setSteps] = useState<WizardStepData[]>(() =>
    initialSteps.map((step, index) => ({
      ...step,
      isOpen: initialStep ? step.id === initialStep : index === 0,
      isCompleted: step.isCompleted || false,
    }))
  )

  // Keep trak of current step
  const [currentStepId, setCurrentStepId] = useState<string>(
    initialStep || initialSteps[0]?.id || ''
  )

  // Find current step index
  const currentStepIndex = useMemo(
    () => steps.findIndex(step => step.id === currentStepId),
    [steps, currentStepId]
  )

  // Helper to update steps
  const updateSteps = useCallback((stepId: string, isOpen: boolean) => {
    setSteps(prevSteps =>
      prevSteps.map(step => ({
        ...step,
        isOpen: step.id === stepId ? isOpen : step.isOpen,
      }))
    )
  }, [])

  // Navigate to specific step
  const goToStep = useCallback(
    (stepId: string) => {
      const targetStep = steps.find(step => step.id === stepId)
      if (!targetStep) return

      // Close current step and open target step
      updateSteps(currentStepId, false)
      updateSteps(stepId, true)
      setCurrentStepId(stepId)
    },
    [currentStepId, steps, updateSteps]
  )

  // Navigate to next step
  const goToNextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      const nextStepId = steps[currentStepIndex + 1].id
      goToStep(nextStepId)
    }
  }, [currentStepIndex, steps, goToStep])

  // Navigate to previous step
  const goToPreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      const previousStepId = steps[currentStepIndex - 1].id
      goToStep(previousStepId)
    }
  }, [currentStepIndex, steps, goToStep])

  // Mark a step as completed
  const completeStep = useCallback((stepId: string) => {
    setSteps(prevSteps =>
      prevSteps.map(step => ({
        ...step,
        isCompleted: step.id === stepId ? true : step.isCompleted,
      }))
    )
  }, [])

  // Compute state flags
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === steps.length - 1
  const canGoToNextStep = !isLastStep && steps[currentStepIndex].isCompleted

  return {
    steps,
    currentStepId,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    completeStep,
    isFirstStep,
    isLastStep,
    canGoToNextStep,
  }
}
