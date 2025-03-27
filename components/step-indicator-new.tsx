import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
  const totalSteps = steps.length
  const progress = (currentStep / (totalSteps - 1)) * 100

  return (
    <div className="space-y-4">
      <Progress value={progress} className="h-2" />
      <div className="grid gap-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep

          return (
            <Card
              key={step.id}
              className={cn(
                "p-4 cursor-pointer transition-colors",
                isCompleted && "bg-emerald-50 border-emerald-200",
                isCurrent && "ring-2 ring-emerald-500 shadow-lg",
                !isCurrent && !isCompleted && "opacity-50"
              )}
              onClick={() => onStepClick(index)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {isCompleted ? (
                    <div className="rounded-full bg-emerald-100 p-1">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "h-7 w-7 rounded-full border-2 flex items-center justify-center",
                        isCurrent
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-300"
                      )}
                    >
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isCurrent ? "text-emerald-600" : "text-gray-500"
                        )}
                      >
                        {index + 1}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3
                    className={cn(
                      "font-medium",
                      isCompleted && "text-emerald-600",
                      isCurrent && "text-emerald-700",
                      !isCurrent && !isCompleted && "text-gray-500"
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "text-sm",
                      isCompleted && "text-emerald-600/80",
                      isCurrent && "text-emerald-600",
                      !isCurrent && !isCompleted && "text-gray-400"
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}