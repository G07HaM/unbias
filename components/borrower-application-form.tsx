"use client"

import { useState } from "react"
import { PropertyStep } from "./steps/property-step"
import { AgeStep } from "./steps/age-step"
import { EmploymentStep } from "./steps/employment-step"
import { EMIStep } from "./steps/emi-step"
import { LoanOffers } from "./loan-offers"
import { ProgressBar } from "./progress-bar"
import { LandingView } from "./landing-view"
import { Leaf } from "lucide-react"

// Define the steps in the application process
const steps = [
  {
    id: "landing",
    title: "Start",
  },
  {
    id: "property-finalized",
    title: "Property Status",
  },
  {
    id: "property-value",
    title: "Property Value",
  },
  {
    id: "property-location",
    title: "Location",
  },
  {
    id: "age",
    title: "Age",
  },
  {
    id: "employment",
    title: "Employment",
  },
  {
    id: "emi",
    title: "EMI",
  },
  {
    id: "results",
    title: "Results",
  },
]

// Define the form data structure
export type FormData = {
  propertyFinalized: string
  propertyValue: string
  propertyLocation: string
  age: string
  employmentType: string
  income: string
  emi?: string
}

export function BorrowerApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    propertyFinalized: "",
    propertyValue: "",
    propertyLocation: "",
    age: "",
    employmentType: "",
    income: "",
  })
  const [showResults, setShowResults] = useState(false)

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 2) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setShowResults(true)
      setCurrentStep(steps.length - 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const startApplication = () => {
    setCurrentStep(1)
  }

  const continueApplication = () => {
    // In a real app, this would load saved data
    setCurrentStep(1)
  }

  // Calculate progress percentage
  const progress = (currentStep / (steps.length - 1)) * 100

  if (showResults) {
    return <LoanOffers formData={formData} />
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-700 mr-2">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-lg">Unbias Lending</span>
          </div>
          <div className="flex items-center">
            <button className="text-emerald-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Need help?
            </button>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      {currentStep > 0 && (
        <div className="container mx-auto px-4 pt-4">
          <ProgressBar progress={progress} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          {currentStep === 0 ? (
            <LandingView onStart={startApplication} onContinue={continueApplication} />
          ) : (
            <div className="space-y-8">
              {currentStep === 1 && (
                <PropertyStep
                  title="Have you finalized a property?"
                  options={[
                    { value: "yes", label: "Yes, I have" },
                    { value: "no", label: "No, I am still looking" },
                  ]}
                  value={formData.propertyFinalized}
                  onChange={(value) => updateFormData("propertyFinalized", value)}
                  onNext={nextStep}
                  onBack={prevStep}
                  showBack={currentStep > 1}
                />
              )}

              {currentStep === 2 && (
                <PropertyStep
                  title="What is your property's value?"
                  options={[
                    { value: "15-25", label: "15-25 lakhs" },
                    { value: "25-50", label: "25-50 lakhs" },
                    { value: "50-75", label: "50-75 lakhs" },
                    { value: "75-100", label: "75 lakhs-1cr" },
                    { value: "100-150", label: "1-1.5 crore" },
                    { value: "150-200", label: "1.5-2 crore" },
                    { value: "200+", label: "Above 2 crore" },
                  ]}
                  value={formData.propertyValue}
                  onChange={(value) => updateFormData("propertyValue", value)}
                  onNext={nextStep}
                  onBack={prevStep}
                  showBack={true}
                />
              )}

              {currentStep === 3 && (
                <PropertyStep
                  title="Where is your property?"
                  options={[
                    { value: "ahmedabad", label: "Ahmedabad" },
                    { value: "other", label: "Other" },
                  ]}
                  value={formData.propertyLocation}
                  onChange={(value) => updateFormData("propertyLocation", value)}
                  onNext={nextStep}
                  onBack={prevStep}
                  showBack={true}
                />
              )}

              {currentStep === 4 && (
                <AgeStep
                  value={formData.age}
                  onChange={(value) => updateFormData("age", value)}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}

              {currentStep === 5 && (
                <EmploymentStep
                  employmentType={formData.employmentType}
                  income={formData.income}
                  onEmploymentTypeChange={(value) => updateFormData("employmentType", value)}
                  onIncomeChange={(value) => updateFormData("income", value)}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}

              {currentStep === 6 && (
                <EMIStep
                  value={formData.emi || ""}
                  onChange={(value) => updateFormData("emi", value)}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">Powered by Unbias Lending</p>
        </div>
      </footer>
    </div>
  )
}

