import { Children, FC, ReactElement, cloneElement, isValidElement } from 'react'

import {
  WizardAccordionLayoutProps,
  WizardAccordionStepContentProps,
  WizardAccordionStepHeaderProps,
  WizardAccordionStepProps,
} from './types'

const DefaultAccordionHeader: FC<{ title: string; isCompleted?: boolean }> = ({
  title,
  isCompleted,
}) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <div>{title}</div>
    {isCompleted && <div>Completado</div>}
  </div>
)

export const WizardAccordionStepHeader: FC<WizardAccordionStepHeaderProps> = ({
  children,
  isCompleted = false,
  isActive = false,
  isDisabled = false,
  isClickable = true,
  sx,
  ...props
}) => (
  <section
    {...props}
    style={{
      padding: 3,
      borderRadius: 2,
      ...(sx ? sx : {}),
    }}
  >
    {typeof children === 'function' &&
      children({ isCompleted, isActive, isDisabled, isClickable })}
    {typeof children === 'object' && children}
    {children === undefined && props.title}
  </section>
)

export const WizardAccordionStepContent: FC<
  WizardAccordionStepContentProps
> = ({
  children,
  isCompleted = false,
  isActive = false,
  isDisabled = false,
  isClickable = true,
  sx,
  ...props
}) => (
  <section
    {...props}
    style={{
      display: isActive ? 'block' : 'none',
      padding: '0 3px 3px 3px',
      ...(sx ? sx : {}),
    }}
  >
    {typeof children === 'function' &&
      children({ isCompleted, isActive, isDisabled, isClickable })}
    {typeof children === 'object' && children}
  </section>
)

export const WizardAccordionStep: FC<WizardAccordionStepProps> = ({
  children,
}) => {
  return children
}

// I am adding this to make debugging easier
WizardAccordionStep.displayName = 'WizardAccordionStep'

const getAccordionStepElements = (
  children: ReactElement<WizardAccordionStepProps>
) => {
  const stepChildren = Children.toArray(children.props.children)
  return {
    header: stepChildren.find(
      (child): child is ReactElement<WizardAccordionStepHeaderProps> =>
        isValidElement(child) && child.type === WizardAccordionStepHeader
    ),
    content: stepChildren.find(
      (child): child is ReactElement<WizardAccordionStepContentProps> =>
        isValidElement(child) && child.type === WizardAccordionStepContent
    ),
  }
}

export const WizardAccordionLayout: FC<WizardAccordionLayoutProps> = ({
  steps,
  currentStepId,
  onStepClick,
  children,
  sx,
}) => {
  const validChildren = Children.toArray(children).filter(
    (child): child is ReactElement<WizardAccordionStepProps> =>
      isValidElement(child) && child.type === WizardAccordionStep
  )
  const activeIndex = steps.findIndex(step => step.id === currentStepId)

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 'md',
        width: '100%',
        margin: '0 auto',
        padding: 2,
        ...(sx ? sx : {}),
      }}
    >
      {validChildren.map((stepElement, index) => {
        const step = steps.find(s => s.id === stepElement.props.id)
        if (!step) return null

        const isActive = step.id === currentStepId
        const isClickable = step.isCompleted || step.id === currentStepId
        const isDisabled = index > activeIndex && isClickable
        const { header: headerElement, content: contentElement } =
          getAccordionStepElements(stepElement)

        // Create header element if not provided
        const finalHeaderElement = headerElement || (
          <WizardAccordionStepHeader
            isCompleted={step.isCompleted}
            isActive={isActive}
            isDisabled={isDisabled}
            isClickable={isClickable}
            title={step.title}
          >
            <DefaultAccordionHeader
              title={step.title}
              isCompleted={step.isCompleted}
            />
          </WizardAccordionStepHeader>
        )

        const headerWithProps = cloneElement(finalHeaderElement, {
          ...finalHeaderElement.props,
          onClick: () => isClickable && onStepClick && onStepClick(step.id),
          isCompleted: step.isCompleted,
          isActive: isActive,
          isDisabled: isDisabled,
          isClickable: isClickable,
        })

        const finalContentElement = contentElement || (
          <WizardAccordionStepContent />
        )
        const contentWithProps = cloneElement(finalContentElement, {
          ...finalContentElement.props,
          isCompleted: step.isCompleted,
          isActive: isActive,
          isDisabled: isDisabled,
          isClickable: isClickable,
        })

        return (
          <section
            key={step.id}
            style={{
              borderRadius: 2,
              boxShadow: '1px 1px 1px 1px',
              overflow: 'hidden',
              ...(stepElement.props.sx ? stepElement.props.sx : {}),
            }}
          >
            {headerWithProps}
            {contentWithProps}
          </section>
        )
      })}
    </section>
  )
}
