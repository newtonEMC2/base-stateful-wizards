/**
 * useWizard types
 */

export interface WizardStepData {
  id: string
  title: string
  isOpen: boolean
  isCompleted: boolean
}

export interface UseWizardProps {
  steps: (Omit<WizardStepData, 'isOpen' | 'isCompleted'> & Partial<Pick<WizardStepData, 'isOpen' | 'isCompleted'>>)[]
  initialStep?: string
}

export interface UseWizardReturn {
  steps: WizardStepData[]
  currentStepId: string
  goToStep: (stepId: string) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  completeStep: (stepId: string) => void
  isFirstStep: boolean
  isLastStep: boolean
  canGoToNextStep: boolean
}
