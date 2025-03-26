"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft } from "lucide-react"

interface EMIStepProps {
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}

export function EMIStep({ value, onChange, onNext, onBack }: EMIStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Do you pay any EMIs?</h2>
        <p className="text-gray-500 mt-2">Include the total of all EMIs being paid. Leave empty if none.</p>
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <Label htmlFor="emi-amount">EMI Amount (₹)</Label>
        <Input
          id="emi-amount"
          type="number"
          placeholder="Enter amount"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-[4px] h-12"
        />
      </div>

      <div className="pt-6 flex flex-col space-y-3 max-w-md mx-auto">
        <Button onClick={onNext} className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 text-white rounded-[4px]">
          Continue
        </Button>

        <button onClick={onBack} className="flex items-center justify-center text-gray-600 hover:text-gray-900">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </button>
      </div>
    </div>
  )
}

