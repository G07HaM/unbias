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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onNext();
            }
          }}
        />
      </div>

      <div className="pt-6 flex flex-col space-y-4 max-w-md mx-auto">
        <Button 
          onClick={onNext} 
          className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-[4px] h-12"
        >
          Get Offers
        </Button>
        
        <Button 
          onClick={onBack} 
          variant="outline" 
          className="flex items-center justify-center border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 text-gray-700 font-medium rounded-[4px] h-12"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      </div>
    </div>
  )
}

