"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"

interface EmploymentStepProps {
  employmentType: string
  income: string
  onEmploymentTypeChange: (value: string) => void
  onIncomeChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}

export function EmploymentStep({
  employmentType,
  income,
  onEmploymentTypeChange,
  onIncomeChange,
  onNext,
  onBack,
}: EmploymentStepProps) {
  const [showIncomeOptions, setShowIncomeOptions] = useState(false)

  useEffect(() => {
    if (employmentType) {
      setShowIncomeOptions(true)
    }
  }, [employmentType])

  const employmentOptions = [
    { value: "salaried", label: "I make a salary" },
    { value: "self-employed", label: "I am self-employed" },
  ]

  const salariedIncomeOptions = [
    { value: "below-50k", label: "Below 50k" },
    { value: "50k-70k", label: "50k - 70k" },
    { value: "70k-1l", label: "70k - 1 lakh" },
    { value: "1l-1.5l", label: "1 lakh - 1.5 lakhs" },
    { value: "1.5l-2l", label: "1.5 lakhs - 2 lakhs" },
    { value: "2l-2.5l", label: "2 lakhs - 2.5 lakhs" },
    { value: "2.5l-3l", label: "2.5 lakhs - 3 lakhs" },
    { value: "above-3l", label: "Above 3 lakhs" },
  ]

  const selfEmployedIncomeOptions = [
    { value: "below-25l", label: "Below 25 lakhs" },
    { value: "25l-50l", label: "25 lakhs - 50 lakhs" },
    { value: "50l-75l", label: "50 lakhs - 75 lakhs" },
    { value: "75l-1cr", label: "75 lakhs - 1 crore" },
    { value: "1cr-1.5cr", label: "1 crore - 1.5 crore" },
    { value: "1.5cr-2cr", label: "1.5 crore - 2 crore" },
    { value: "above-2cr", label: "Above 2 crore" },
  ]

  const incomeOptions = employmentType === "salaried" ? salariedIncomeOptions : selfEmployedIncomeOptions

  const incomeTitle =
    employmentType === "salaried" ? "Gross Monthly Income" : "How much profit did you book in your last year's ITR?"

  const incomeSubtitle = employmentType === "salaried" ? "This should include salary + other income sources" : ""

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">How are you employed?</h2>
      </div>

      <RadioGroup 
        value={employmentType} 
        onValueChange={(newValue) => {
          onEmploymentTypeChange(newValue);
          // Don't automatically proceed after selecting employment type
          // User needs to select income first
        }} 
        className="space-y-3"
      >
        {employmentOptions.map((option) => (
          <Card
            key={option.value}
            className={`border-2 ${
              employmentType === option.value ? "border-emerald-600" : "border-gray-200"
            } rounded-[4px] cursor-pointer hover:border-emerald-600/70 transition-colors`}
          >
            <CardContent className="p-0">
              <Label htmlFor={`employment-${option.value}`} className="flex items-center p-4 cursor-pointer">
                <RadioGroupItem value={option.value} id={`employment-${option.value}`} className="mr-3" />
                <span>{option.label}</span>
              </Label>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>

      {showIncomeOptions && (
        <div className="pt-6 space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900">{incomeTitle}</h3>
            {incomeSubtitle && <p className="text-gray-500">{incomeSubtitle}</p>}
          </div>

          <RadioGroup 
            value={income} 
            onValueChange={(newValue) => {
              onIncomeChange(newValue);
              // Automatically proceed to next step when income is selected
              if (newValue && employmentType) {
                onNext();
              }
            }} 
            className="space-y-3"
          >
            {incomeOptions.map((option) => (
              <Card
                key={option.value}
                className={`border-2 ${
                  income === option.value ? "border-emerald-600" : "border-gray-200"
                } rounded-[4px] cursor-pointer hover:border-emerald-600/70 transition-colors`}
              >
                <CardContent className="p-0">
                  <Label htmlFor={`income-${option.value}`} className="flex items-center p-4 cursor-pointer">
                    <RadioGroupItem value={option.value} id={`income-${option.value}`} className="mr-3" />
                    <span>{option.label}</span>
                  </Label>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </div>
      )}

      <div className="pt-6 flex flex-col space-y-3">
        <button onClick={onBack} className="flex items-center justify-center text-gray-600 hover:text-gray-900">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </button>
      </div>
    </div>
  )
}

