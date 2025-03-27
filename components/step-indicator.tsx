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
    <div className="relative space-y-8 md:space-y-12">
      {steps.map((_, index) => {
        if (index === steps.length - 1) return null;
        const isCompleted = index < currentStep;
        return (
          <div
            key={`line-${index}`}
            className="absolute left-[11px] w-[1px] animate-fadeIn"
            style={{
              top: `calc(${(index * 100) / (steps.length - 1)}% + 3rem)`,
              height: `calc(${100 / (steps.length - 1)}% - 4rem)`,
              background: isCompleted
                ? 'linear-gradient(180deg, #10b981 0%, rgba(16, 185, 129, 0.9) 100%)'
                : 'linear-gradient(180deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%)',
              boxShadow: isCompleted ? '0 0 8px rgba(16, 185, 129, 0.3)' : 'none',
              transition: 'all 0.3s ease-in-out'
            }}
          />
        );
      })}
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
                    "flex h-5 md:h-6 w-5 md:w-6 items-center justify-center rounded-full border-2 relative shadow-lg",
                    isCurrent ? "border-white bg-emerald-700 after:absolute after:inset-0 after:rounded-full after:border-2 after:border-white/50 after:animate-pulse after:shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "border-emerald-300/50",
                  )}
                >
                  {isCurrent && <div className="h-2 md:h-2.5 w-2 md:w-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />}
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

