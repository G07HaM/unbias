"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"

interface Option {
  value: string
  label: string
}

interface PropertyStepProps {
  title: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  onNext: () => void
  onBack: () => void
  showBack?: boolean
}

export function PropertyStep({ title, options, value, onChange, onNext, onBack, showBack = false }: PropertyStepProps) {
  const [otherCityValue, setOtherCityValue] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);

  useEffect(() => {
    // Show the input field if "other" is selected
    setShowOtherInput(value === "other");
  }, [value]);

  const handleOtherCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cityValue = e.target.value;
    setOtherCityValue(cityValue);
    // Update the form with the city value prefixed with "other:" to distinguish it
    onChange(`other:${cityValue}`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
      </div>

      <RadioGroup 
        value={value.startsWith("other:") ? "other" : value} 
        onValueChange={(newValue) => {
          if (newValue === "other") {
            // If "other" is selected, don't proceed automatically
            // Just update the value and show the input field
            onChange(newValue);
            setShowOtherInput(true);
          } else {
            onChange(newValue);
            // Automatically proceed to next step for non-other options
            if (newValue) {
              onNext();
            }
          }
        }} 
        className="space-y-3"
      >
        {options.map((option) => (
          <Card
            key={option.value}
            className={`border-2 ${(value === option.value || (option.value === "other" && value.startsWith("other:"))) ? "border-emerald-600" : "border-gray-200"} rounded-[4px] cursor-pointer hover:border-emerald-600/70 transition-colors`}
          >
            <CardContent className="p-0">
              <Label htmlFor={option.value} className="flex items-center p-4 cursor-pointer">
                <RadioGroupItem value={option.value} id={option.value} className="mr-3" />
                <span>{option.label}</span>
              </Label>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>

      {showOtherInput && (
        <div className="mt-4 space-y-2">
          <Label htmlFor="other-city">Please specify your city:</Label>
          <div className="flex space-x-2">
            <Input
              id="other-city"
              placeholder="Enter your city"
              value={otherCityValue}
              onChange={handleOtherCityChange}
              className="rounded-[4px] h-12"
              autoFocus
            />
            <Button 
              onClick={onNext} 
              disabled={!otherCityValue.trim()}
              className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-[4px] h-12"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      <div className="pt-6 flex flex-col space-y-3">
        {showBack && (
          <Button 
            onClick={onBack} 
            variant="outline" 
            className="flex items-center justify-center border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 text-gray-700 font-medium rounded-[4px] h-12 w-full sm:w-auto"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        )}
      </div>
    </div>
  )
}

