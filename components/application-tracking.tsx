"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, CheckCircle2, Clock, AlertCircle, FileText, Download, Calendar, Mail, Phone } from "lucide-react"
import { StepIndicator } from "./step-indicator-new"

interface ApplicationTrackingProps {
  bankId: string
  onBack: () => void
}

type ApplicationStatus = "pending" | "in-progress" | "completed" | "rejected"

interface TeamMember {
  name: string
  role: string
  email: string
  phone: string
  avatar?: string
}

interface ApplicationStep {
  id: string
  title: string
  description: string
  status: ApplicationStatus
  date?: string
  eta?: string
  teamMember?: TeamMember
  actions?: Array<{
    label: string
    icon: React.ReactNode
    onClick: () => void
  }>
}

export function ApplicationTracking({ bankId, onBack }: ApplicationTrackingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [applicationId, setApplicationId] = useState("")

  // Generate a random application ID on mount
  useEffect(() => {
    const randomId = "APP" + Math.floor(100000 + Math.random() * 900000)
    setApplicationId(randomId)
  }, [])

  // Simulate application progress
  useEffect(() => {
    if (currentStep < 2) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  // Get bank name from ID
  const getBankName = (id: string) => {
    const banks: Record<string, string> = {
      icici: "ICICI Bank",
      hdfc: "HDFC Bank",
      sbi: "State Bank of India",
      pnb: "Punjab National Bank",
      kotak: "Kotak Mahindra Bank",
    }
    return banks[id] || "Your Bank"
  }

  const bankName = getBankName(bankId)

  // Define application steps
  // Mock team member data - in a real app, this would come from an API
const teamMember: TeamMember = {
  name: "Sarah Johnson",
  role: "Loan Officer",
  email: "sarah.johnson@unbiasbank.com",
  phone: "(555) 123-4567",
}

const applicationSteps: ApplicationStep[] = [
    {
      id: "submission",
      title: "Application Submitted",
      description: `Your application has been received by ${bankName} and is being processed.`,
      status: "completed",
      date: new Date().toLocaleDateString(),
      teamMember,
    },
    {
      id: "verification",
      title: "Document Verification",
      description:
        currentStep >= 1
          ? "Your documents have been verified successfully."
          : "We are verifying the documents you submitted.",
      status: currentStep >= 1 ? "completed" : "in-progress",
      date: currentStep >= 1 ? new Date().toLocaleDateString() : undefined,
      eta:
        currentStep < 1 ? "Expected by " + new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString() : undefined,
    },
    {
      id: "approval",
      title: "Loan Approval",
      description:
        currentStep >= 2
          ? "Congratulations! Your loan has been approved."
          : "Your application is being reviewed for approval.",
      status: currentStep >= 2 ? "completed" : currentStep >= 1 ? "in-progress" : "pending",
      date: currentStep >= 2 ? new Date().toLocaleDateString() : undefined,
      eta:
        currentStep === 1
          ? "Expected by " + new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()
          : undefined,
      actions:
        currentStep >= 2
          ? [
              {
                label: "Download Approval Letter",
                icon: <Download className="h-4 w-4 mr-1" />,
                onClick: () => alert("Downloading approval letter..."),
              },
            ]
          : undefined,
    },
    {
      id: "agreement",
      title: "Agreement Signing",
      description: "Review and sign your loan agreement.",
      status: currentStep >= 3 ? "completed" : currentStep >= 2 ? "in-progress" : "pending",
      eta: currentStep === 2 ? "Schedule appointment" : undefined,
      actions:
        currentStep >= 2
          ? [
              {
                label: "Schedule Appointment",
                icon: <Calendar className="h-4 w-4 mr-1" />,
                onClick: () => alert("Opening appointment scheduler..."),
              },
              {
                label: "View Agreement Draft",
                icon: <FileText className="h-4 w-4 mr-1" />,
                onClick: () => alert("Opening agreement draft..."),
              },
            ]
          : undefined,
    },
    {
      id: "disbursement",
      title: "Loan Disbursement",
      description: "Funds will be transferred to your account.",
      status: currentStep >= 4 ? "completed" : "pending",
      eta: currentStep >= 3 ? "Expected within 24 hours after agreement signing" : undefined,
    },
  ]

  const getStatusIcon = (status: ApplicationStatus) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-6 w-6 text-emerald-600" />
      case "in-progress":
        return <Clock className="h-6 w-6 text-amber-500" />
      case "rejected":
        return <AlertCircle className="h-6 w-6 text-red-500" />
      default:
        return <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" className="mr-2 p-2" onClick={onBack}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Application Status</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Track Your Application</h2>
              <p className="text-gray-500 mt-2">Application ID: {applicationId}</p>
            </div>

            {/* Team Member Card */}
            <Card className="p-4 rounded-[4px] bg-white border-gray-200 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-lg">
                    {teamMember.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{teamMember.name}</h3>
                  <p className="text-sm text-gray-600">{teamMember.role}</p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <a href={`mailto:${teamMember.email}`} className="text-emerald-700 hover:text-emerald-800">
                        {teamMember.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <a href={`tel:${teamMember.phone}`} className="text-emerald-700 hover:text-emerald-800">
                        {teamMember.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="space-y-8">
              {applicationSteps.map((step, index) => (
                <div key={step.id} className="relative">
                  {/* Connector line */}
                  {index < applicationSteps.length - 1 && (
                    <div
                      className={`absolute left-3 top-6 bottom-0 w-0.5 ${
                        step.status === "completed" ? "bg-emerald-500" : "bg-gray-200"
                      }`}
                      style={{ height: "calc(100% + 2rem)" }}
                    />
                  )}

                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">{getStatusIcon(step.status)}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-gray-600 mt-1">{step.description}</p>

                      {step.date && (
                        <p className="text-sm text-gray-500 mt-2">
                          {step.status === "completed" ? "Completed on: " : "Updated on: "}
                          {step.date}
                        </p>
                      )}

                      {step.eta && <p className="text-sm text-amber-600 mt-2">{step.eta}</p>}

                      {step.actions && step.actions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {step.actions.map((action, actionIndex) => (
                            <Button
                              key={actionIndex}
                              variant="outline"
                              size="sm"
                              onClick={action.onClick}
                              className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                            >
                              {action.icon}
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t">
              <h3 className="font-semibold mb-4">Need Assistance?</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  Contact Support
                </Button>
                <Button variant="outline" className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  Schedule a Call
                </Button>
              </div>
            </div>
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
  )
}

