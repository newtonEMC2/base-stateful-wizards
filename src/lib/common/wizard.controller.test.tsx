import { createWizardController } from './wizard.controller'
import { WizardStepData } from './types'

describe('createWizardController', () => {
  const mockSteps: WizardStepData[] = [
    { id: 'step1', title: 'Step 1', isOpen: true, isCompleted: false },
    { id: 'step2', title: 'Step 2', isOpen: false, isCompleted: false },
    { id: 'step3', title: 'Step 3', isOpen: false, isCompleted: false },
  ]

  const mockOnStepsChange = jest.fn()
  const mockOnStepChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when initializing the controller', () => {
    it('should return the initial state correctly', () => {
      const controller = createWizardController({
        steps: mockSteps,
        currentStepId: 'step1',
        onStepsChange: mockOnStepsChange,
        onStepChange: mockOnStepChange,
      })

      expect(controller.steps).toEqual(mockSteps)
      expect(controller.currentStepId).toBe('step1')
      expect(controller.isFirstStep).toBe(true)
      expect(controller.isLastStep).toBe(false)
      expect(controller.canGoToNextStep).toBe(false)
    })

    describe('when current step is the last step', () => {
      it('should set isLastStep to true', () => {
        const controller = createWizardController({
          steps: mockSteps,
          currentStepId: 'step3',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        expect(controller.isLastStep).toBe(true)
        expect(controller.isFirstStep).toBe(false)
      })
    })

    describe('when current step is completed', () => {
      it('should allow navigation to next step', () => {
        const completedSteps = [
          { ...mockSteps[0], isCompleted: true },
          ...mockSteps.slice(1),
        ]

        const controller = createWizardController({
          steps: completedSteps,
          currentStepId: 'step1',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        expect(controller.canGoToNextStep).toBe(true)
      })
    })
  })

  describe('goToStep', () => {
    describe('when navigating to a valid step', () => {
      it('should close current step and open target step', () => {
        const controller = createWizardController({
          steps: mockSteps,
          currentStepId: 'step1',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        controller.goToStep('step2')

        expect(mockOnStepsChange).toHaveBeenCalledTimes(2)
        expect(mockOnStepChange).toHaveBeenCalledWith('step2')
      })

      it('should update steps state correctly', () => {
        const controller = createWizardController({
          steps: mockSteps,
          currentStepId: 'step1',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        controller.goToStep('step3')

        // First call closes current step
        expect(mockOnStepsChange).toHaveBeenNthCalledWith(1, [
          { ...mockSteps[0], isOpen: false },
          mockSteps[1],
          mockSteps[2],
        ])

        // Second call opens target step
        expect(mockOnStepsChange).toHaveBeenNthCalledWith(2, [
          { ...mockSteps[0], isOpen: false },
          mockSteps[1],
          { ...mockSteps[2], isOpen: true },
        ])
      })
    })

    describe('when navigating to an invalid step', () => {
      it('should not update state or call callbacks', () => {
        const controller = createWizardController({
          steps: mockSteps,
          currentStepId: 'step1',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        controller.goToStep('nonexistent-step')

        expect(mockOnStepsChange).not.toHaveBeenCalled()
        expect(mockOnStepChange).not.toHaveBeenCalled()
      })
    })

    describe('when custom steps are provided', () => {
      it('should use the provided steps instead of initial steps', () => {
        const customSteps: WizardStepData[] = [
          {
            id: 'custom1',
            title: 'Custom 1',
            isOpen: true,
            isCompleted: false,
          },
          {
            id: 'custom2',
            title: 'Custom 2',
            isOpen: false,
            isCompleted: false,
          },
        ]

        const controller = createWizardController({
          steps: mockSteps,
          currentStepId: 'step1',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        controller.goToStep('custom2', customSteps)

        expect(mockOnStepChange).toHaveBeenCalledWith('custom2')
      })
    })
  })

  describe('goToNextStep', () => {
    describe('when current step is not the last step', () => {
      it('should navigate to the next step', () => {
        const controller = createWizardController({
          steps: mockSteps,
          currentStepId: 'step1',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        controller.goToNextStep()

        expect(mockOnStepChange).toHaveBeenCalledWith('step2')
      })
    })

    describe('when current step is the last step', () => {
      it('should not navigate anywhere', () => {
        const lastStepOpen = [
          { ...mockSteps[0], isOpen: false },
          { ...mockSteps[1], isOpen: false },
          { ...mockSteps[2], isOpen: true },
        ]

        const controller = createWizardController({
          steps: lastStepOpen,
          currentStepId: 'step3',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        controller.goToNextStep()

        expect(mockOnStepChange).not.toHaveBeenCalled()
      })
    })

    describe('when no step is currently open', () => {
      it('should use the initial current step ID', () => {
        const noStepsOpen = mockSteps.map(step => ({ ...step, isOpen: false }))

        const controller = createWizardController({
          steps: noStepsOpen,
          currentStepId: 'step1',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        controller.goToNextStep()

        expect(mockOnStepChange).toHaveBeenCalledWith('step2')
      })
    })
  })

  describe('goToPreviousStep', () => {
    describe('when current step is not the first step', () => {
      it('should navigate to the previous step', () => {
        const secondStepOpen = [
          { ...mockSteps[0], isOpen: false },
          { ...mockSteps[1], isOpen: true },
          mockSteps[2],
        ]

        const controller = createWizardController({
          steps: secondStepOpen,
          currentStepId: 'step2',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        controller.goToPreviousStep()

        expect(mockOnStepChange).toHaveBeenCalledWith('step1')
      })
    })

    describe('when current step is the first step', () => {
      it('should not navigate anywhere', () => {
        const controller = createWizardController({
          steps: mockSteps,
          currentStepId: 'step1',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        controller.goToPreviousStep()

        expect(mockOnStepChange).not.toHaveBeenCalled()
      })
    })

    describe('when no step is currently open', () => {
      it('should use the initial current step ID', () => {
        const noStepsOpen = mockSteps.map(step => ({ ...step, isOpen: false }))

        const controller = createWizardController({
          steps: noStepsOpen,
          currentStepId: 'step2',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        controller.goToPreviousStep()

        expect(mockOnStepChange).toHaveBeenCalledWith('step1')
      })
    })
  })

  describe('completeStep', () => {
    describe('when completing a valid step', () => {
      it('should mark the step as completed', () => {
        const controller = createWizardController({
          steps: mockSteps,
          currentStepId: 'step1',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        controller.completeStep('step2')

        expect(mockOnStepsChange).toHaveBeenCalledWith([
          mockSteps[0],
          { ...mockSteps[1], isCompleted: true },
          mockSteps[2],
        ])
      })

      it('should not affect other steps completion status', () => {
        const partiallyCompleted = [
          { ...mockSteps[0], isCompleted: true },
          mockSteps[1],
          mockSteps[2],
        ]

        const controller = createWizardController({
          steps: partiallyCompleted,
          currentStepId: 'step1',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        controller.completeStep('step3')

        expect(mockOnStepsChange).toHaveBeenCalledWith([
          { ...mockSteps[0], isCompleted: true },
          mockSteps[1],
          { ...mockSteps[2], isCompleted: true },
        ])
      })
    })

    describe('when completing an already completed step', () => {
      it('should maintain the completed status', () => {
        const alreadyCompleted = [
          { ...mockSteps[0], isCompleted: true },
          mockSteps[1],
          mockSteps[2],
        ]

        const controller = createWizardController({
          steps: alreadyCompleted,
          currentStepId: 'step1',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        controller.completeStep('step1')

        expect(mockOnStepsChange).toHaveBeenCalledWith([
          { ...mockSteps[0], isCompleted: true },
          mockSteps[1],
          mockSteps[2],
        ])
      })
    })

    describe('when custom steps are provided', () => {
      it('should use the provided steps instead of initial steps', () => {
        const customSteps: WizardStepData[] = [
          {
            id: 'custom1',
            title: 'Custom 1',
            isOpen: true,
            isCompleted: false,
          },
          {
            id: 'custom2',
            title: 'Custom 2',
            isOpen: false,
            isCompleted: false,
          },
        ]

        const controller = createWizardController({
          steps: mockSteps,
          currentStepId: 'step1',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        controller.completeStep('custom1', customSteps)

        expect(mockOnStepsChange).toHaveBeenCalledWith([
          { ...customSteps[0], isCompleted: true },
          customSteps[1],
        ])
      })
    })
  })

  describe('state flags', () => {
    describe('when current step is in the middle', () => {
      it('should set all flags correctly', () => {
        const controller = createWizardController({
          steps: mockSteps,
          currentStepId: 'step2',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        expect(controller.isFirstStep).toBe(false)
        expect(controller.isLastStep).toBe(false)
        expect(controller.canGoToNextStep).toBe(false)
      })
    })

    describe('when current step is completed and not last', () => {
      it('should allow navigation to next step', () => {
        const stepsWithCompleted = [
          mockSteps[0],
          { ...mockSteps[1], isCompleted: true },
          mockSteps[2],
        ]

        const controller = createWizardController({
          steps: stepsWithCompleted,
          currentStepId: 'step2',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        expect(controller.canGoToNextStep).toBe(true)
      })
    })

    describe('when current step is completed and is last', () => {
      it('should not allow navigation to next step', () => {
        const stepsWithCompleted = [
          mockSteps[0],
          mockSteps[1],
          { ...mockSteps[2], isCompleted: true },
        ]

        const controller = createWizardController({
          steps: stepsWithCompleted,
          currentStepId: 'step3',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        expect(controller.canGoToNextStep).toBe(false)
        expect(controller.isLastStep).toBe(true)
      })
    })
  })

  describe('edge cases', () => {
    describe('when steps array is empty', () => {
      it('should handle empty steps gracefully', () => {
        const controller = createWizardController({
          steps: [],
          currentStepId: 'nonexistent',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        expect(controller.steps).toEqual([])
        expect(controller.currentStepId).toBe('nonexistent')
        expect(controller.isFirstStep).toBe(false)
        expect(controller.isLastStep).toBe(true) // -1 === -1 is true
        expect(controller.canGoToNextStep).toBe(false)
      })
    })

    describe('when currentStepId does not exist in steps', () => {
      it('should throw error when creating controller with invalid step ID', () => {
        // The original controller has a bug where it tries to access undefined array element
        // during initialization, so it throws an error when creating the controller
        expect(() => {
          createWizardController({
            steps: mockSteps,
            currentStepId: 'invalid-step',
            onStepsChange: mockOnStepsChange,
            onStepChange: mockOnStepChange,
          })
        }).toThrow('Cannot read properties of undefined')
      })
    })

    describe('when single step wizard', () => {
      it('should handle single step correctly', () => {
        const singleStep = [mockSteps[0]]

        const controller = createWizardController({
          steps: singleStep,
          currentStepId: 'step1',
          onStepsChange: mockOnStepsChange,
          onStepChange: mockOnStepChange,
        })

        expect(controller.isFirstStep).toBe(true)
        expect(controller.isLastStep).toBe(true)
        expect(controller.canGoToNextStep).toBe(false)
      })
    })
  })
})
