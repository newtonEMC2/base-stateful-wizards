import { ReactNode } from 'react'

import { WizardStepData } from '../common/types'

/**
 * WizardAccordionStep types
 */

export interface WizardAccordionStepHeaderState {
  isCompleted: boolean
  isActive: boolean
  isDisabled: boolean
  isClickable: boolean
}

export interface WizardAccordionStepHeaderProps {
  children?: ReactNode | ((state: WizardAccordionStepHeaderState) => ReactNode)
  onClick?: () => void
  isCompleted?: boolean
  isActive?: boolean
  isDisabled?: boolean
  isClickable?: boolean
  title?: string
  sx?: React.CSSProperties
}

export interface WizardAccordionStepContentProps {
  children?: ReactNode | ((state: WizardAccordionStepHeaderState) => ReactNode)
  isCompleted?: boolean
  isActive?: boolean
  isDisabled?: boolean
  isClickable?: boolean
  sx?: React.CSSProperties
}

export interface WizardAccordionStepProps {
  id: string
  title: string
  children: ReactNode
  sx?: React.CSSProperties
}

export interface WizardAccordionLayoutProps {
  steps: WizardStepData[]
  currentStepId: string
  onStepClick?: (stepId: string) => void
  children: ReactNode
  sx?: React.CSSProperties
}
