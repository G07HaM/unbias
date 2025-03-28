"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AuthForm } from "./auth-form"
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { FormData } from "./borrower-application-form"
import { DocumentUpload } from "./document-upload"

interface LoanOffersProps {
  formData: FormData
}

// Mock bank data
const banks = [
  {
    id: "hdfc",
    name: "HDFC Bank",
    logo: "/bank-logos/hdfc.svg",
    maxAmount: "₹52,00,000",
    roi: "8.8%",
    emiAmount: "₹42,752",
    maxTenure: "25 years",
  },
  {
    id: "kotak",
    name: "Kotak Mahindra",
    logo: "/bank-logos/kotak.svg",
    maxAmount: "₹52,00,000",
    roi: "8.75%",
    emiAmount: "₹42,752",
    maxTenure: "25 years",
  },
  {
    id: "piramal",
    name: "Piramal Finance",
    logo: "/bank-logos/piramal.svg",
    maxAmount: "₹52,00,000",
    roi: "9.1%",
    emiAmount: "₹43,852",
    maxTenure: "25 years",
  },
  {
    id: "sbi",
    name: "SBI",
    logo: "/bank-logos/sbi.svg",
    maxAmount: "₹52,00,000",
    roi: "9.2%",
    emiAmount: "₹44,353",
    maxTenure: "25 years",
  },
  {
    id: "union",
    name: "Union Bank",
    logo: "/bank-logos/union.svg",
    maxAmount: "₹52,00,000",
    roi: "8.9%",
    emiAmount: "₹42,975",
    maxTenure: "25 years",
  },
]

export function LoanOffers({ formData }: LoanOffersProps) {
  const [tenure, setTenure] = useState("25")
  const [selectedBank, setSelectedBank] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [showAuthDialog, setShowAuthDialog] = useState(!isAuthenticated)

  if (selectedBank) {
    return <DocumentUpload formData={formData} bankId={selectedBank} onBack={() => setSelectedBank(null)} />
  }

  return (
    <>
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <AuthForm
            onAuthenticated={() => {
              setIsAuthenticated(true);
              setShowAuthDialog(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <Button variant="ghost" className="mr-2 p-2">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">Your Offers</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Pick Tenure:</span>
              <Select value={tenure} onValueChange={setTenure}>
                <SelectTrigger className="w-32 rounded-[4px]">
                  <SelectValue placeholder="Tenure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                  <SelectItem value="25">25 years</SelectItem>
                  <SelectItem value="30">30 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1">
          <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-4">
            {banks.map((bank) => (
              <Card key={bank.id} className="p-4 rounded-[4px] border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="mb-4 sm:mb-0">
                    <img src={bank.logo || "/placeholder.svg"} alt={bank.name} className="h-10 w-auto object-contain" />
                  </div>
                  <Button
                    className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white rounded-[4px]"
                    onClick={() => setSelectedBank(bank.id)}
                  >
                    Apply Now →
                  </Button>
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Max Amount</p>
                    <p className="font-semibold">{bank.maxAmount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ROI</p>
                    <p className="font-semibold">{bank.roi}*</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">EMI Amount</p>
                    <p className="font-semibold">{bank.emiAmount}*</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Max Tenure</p>
                    <p className="font-semibold">{bank.maxTenure}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fee Details</p>
                    <p className="text-xs text-emerald-700">View Fees</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <Card className="p-6 rounded-[4px] bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">Speak to An Expert →</h3>
              <Button className="w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 rounded-[4px]">
                Schedule a Call →
              </Button>
            </Card>
          </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-500">Powered by Unbias Lending</p>
          </div>
        </footer>
      </div>
    </>
  )
}

