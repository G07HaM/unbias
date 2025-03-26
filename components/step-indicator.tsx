"use client"

import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

interface Step {
  id: string
  title: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  onStepClick: (index: number) => void
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="space-y-5 md:space-y-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep

        return (
          <div
            key={step.id}
            className={cn(
              "flex items-start gap-2 md:gap-3 cursor-pointer",
              isCurrent && "text-white",
              !isCurrent && !isCompleted && "text-emerald-200/70",
            )}
            onClick={() => onStepClick(index)}
          >
            <div className="flex-shrink-0 mt-0.5">
              {isCompleted ? (
                <CheckCircle2 className="h-4 md:h-5 w-4 md:w-5 text-emerald-300" />
              ) : (
                <div
                  className={cn(
                    "flex h-4 md:h-5 w-4 md:w-5 items-center justify-center rounded-full border",
                    isCurrent ? "border-white bg-emerald-700" : "border-emerald-300/50",
                  )}
                >
                  {isCurrent && <div className="h-1.5 md:h-2 w-1.5 md:w-2 rounded-full bg-white" />}
                </div>
              )}
            </div>
            <div>
              <p
                className={cn(
                  "font-medium text-sm md:text-base",
                  isCurrent ? "text-white" : isCompleted ? "text-emerald-100" : "text-emerald-200/70",
                )}
              >
                {step.title}
              </p>
              <p className={cn("text-xs md:text-sm", isCurrent ? "text-emerald-100" : "text-emerald-200/60")}>
                {step.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

