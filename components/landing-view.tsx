"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface LandingViewProps {
  onStart: () => void
  onContinue: () => void
}

export function LandingView({ onStart, onContinue }: LandingViewProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-8">
        <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-6 overflow-hidden">
          <img src="/placeholder.svg?height=80&width=80" alt="Loan advisor" className="w-full h-full object-cover" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Discover your ideal
          <br />
          home loan in minutes
        </h1>
        <p className="text-lg text-gray-600 mb-8">Receive free advice from our loan experts</p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-2 rounded-full bg-emerald-100 p-1">
              <Check className="h-4 w-4 text-emerald-700" />
            </div>
            <span className="text-gray-700">Free of charge</span>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-2 rounded-full bg-emerald-100 p-1">
              <Check className="h-4 w-4 text-emerald-700" />
            </div>
            <span className="text-gray-700">Multiple banks in one place</span>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-2 rounded-full bg-emerald-100 p-1">
              <Check className="h-4 w-4 text-emerald-700" />
            </div>
            <span className="text-gray-700">No commitment</span>
          </div>
        </div>

        <Button
          onClick={onStart}
          className="w-full md:w-64 h-12 bg-emerald-700 hover:bg-emerald-800 text-white rounded-[4px] mb-4"
        >
          Begin
        </Button>

        <p className="text-sm text-gray-500">
          Do you already have an active process?{" "}
          <button onClick={onContinue} className="text-emerald-700 hover:underline">
            Continue your process
          </button>
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <p className="text-sm text-gray-500 mb-4 text-center">
          We work with the best banks and financial institutions in India
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 justify-items-center">
          {[
            { id: "hdfc", name: "HDFC Bank", logo: "/bank-logos/hdfc.svg" },
            { id: "kotak", name: "Kotak Mahindra", logo: "/bank-logos/kotak.svg" },
            { id: "piramal", name: "Piramal Finance", logo: "/bank-logos/piramal.svg" },
            { id: "sbi", name: "SBI", logo: "/bank-logos/sbi.svg" },
            { id: "union", name: "Union Bank", logo: "/bank-logos/union.svg" },
            { id: "hdfc", name: "HDFC Bank", logo: "/bank-logos/hdfc.svg" } // Repeating first bank to fill the grid
          ].map((bank) => (
            <div key={bank.id} className="h-8 w-20">
              <img
                src={bank.logo}
                alt={bank.name}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

