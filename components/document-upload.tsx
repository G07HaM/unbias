"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, Upload, Check, X, FileText, AlertCircle } from "lucide-react"
import type { FormData } from "./borrower-application-form"
import { ApplicationTracking } from "./application-tracking"

interface DocumentUploadProps {
  formData: FormData
  bankId: string
  onBack: () => void
}

type UploadStatus = "idle" | "uploading" | "success" | "error"

interface DocumentFile {
  id: string
  name: string
  type: string
  status: UploadStatus
  progress?: number
  error?: string
}

// Define the required documents
const requiredDocuments = [
  {
    id: "income",
    title: "Proof of Income",
    description: "Salary slips for the last 3 months",
    required: true,
  },
  {
    id: "bank",
    title: "Statement of Primary Bank Account",
    description: "Last 6 months statements",
    required: true,
  },
  {
    id: "residence",
    title: "Proof of Permanent Residence",
    description: "Utility bills, Rental agreement, or Passport",
    required: true,
  },
  {
    id: "property",
    title: "Property Documents",
    description: "Sale deed, Property tax receipts",
    required: true,
  },
  {
    id: "form16",
    title: "Latest Form 16",
    description: "Tax form from your employer",
    required: true,
  },
]

export function DocumentUpload({ formData, bankId, onBack }: DocumentUploadProps) {
  const [files, setFiles] = useState<DocumentFile[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [uploadErrors, setUploadErrors] = useState<string[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadErrors([...uploadErrors, `${file.name} exceeds the 5MB size limit`])
        return
      }

      // Check file type
      const validTypes = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"]
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase()
      if (!validTypes.includes(fileExtension)) {
        setUploadErrors([...uploadErrors, `${file.name} is not a supported file type`])
        return
      }

      const newFile = {
        id: Math.random().toString(36).substring(2, 9),
        name: file.name,
        type: docType,
        status: "idle" as UploadStatus,
      }

      // Remove any existing file of the same type
      const updatedFiles = files.filter((f) => f.type !== docType)

      setFiles([...updatedFiles, newFile])

      // Simulate upload process
      simulateFileUpload(newFile.id)
    }
  }

  const simulateFileUpload = (fileId: string) => {
    setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, status: "uploading", progress: 0 } : file)))

    const interval = setInterval(() => {
      setFiles((prev) => {
        const fileToUpdate = prev.find((file) => file.id === fileId)

        if (!fileToUpdate || fileToUpdate.status !== "uploading") {
          clearInterval(interval)
          return prev
        }

        const newProgress = (fileToUpdate.progress || 0) + 10

        if (newProgress >= 100) {
          clearInterval(interval)
          return prev.map((file) => (file.id === fileId ? { ...file, status: "success", progress: 100 } : file))
        }

        return prev.map((file) => (file.id === fileId ? { ...file, progress: newProgress } : file))
      })
    }, 300)
  }

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const clearError = (index: number) => {
    setUploadErrors((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  // Check if all required documents are uploaded
  const uploadedDocTypes = files.filter((f) => f.status === "success").map((f) => f.type)
  const missingRequiredDocs = requiredDocuments
    .filter((doc) => doc.required && !uploadedDocTypes.includes(doc.id))
    .map((doc) => doc.title)

  const allRequiredUploaded = missingRequiredDocs.length === 0

  if (submitted) {
    return <ApplicationTracking bankId={bankId} onBack={onBack} />
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
            <h1 className="text-xl font-semibold">Upload Documents</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Submit Required Documents</h2>
              <p className="text-gray-500 mt-2">Please upload the following documents to complete your application</p>
            </div>

            {uploadErrors.length > 0 && (
              <div className="mb-6">
                {uploadErrors.map((error, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-red-50 text-red-700 p-3 rounded-md mb-2"
                  >
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      <span>{error}</span>
                    </div>
                    <button onClick={() => clearError(index)} className="text-red-500 hover:text-red-700">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4">
              {requiredDocuments.map((doc) => {
                const uploadedFile = files.find((f) => f.type === doc.id && f.status === "success")
                const isUploading = files.some((f) => f.type === doc.id && f.status === "uploading")

                return (
                  <Card key={doc.id} className="p-4 rounded-[4px]">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="mb-2 sm:mb-0">
                        <h3 className="font-semibold flex items-center">
                          {doc.title}
                          {doc.required && <span className="text-red-500 ml-1">*</span>}
                        </h3>
                        <p className="text-sm text-gray-500">{doc.description}</p>
                      </div>
                      <div>
                        {uploadedFile ? (
                          <span className="inline-flex items-center text-emerald-600 text-sm">
                            <Check className="h-4 w-4 mr-1" />
                            Uploaded
                          </span>
                        ) : isUploading ? (
                          <span className="inline-flex items-center text-amber-600 text-sm">Uploading...</span>
                        ) : (
                          <label className="cursor-pointer">
                            <span className="inline-flex items-center text-emerald-700 text-sm hover:text-emerald-800">
                              <Upload className="h-4 w-4 mr-1" />
                              Upload
                            </span>
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => handleFileChange(e, doc.id)}
                              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {files.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Uploaded Files</h3>
                <div className="space-y-3">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-[4px]">
                      <div className="flex items-center flex-1 mr-2">
                        <FileText className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          {file.status === "uploading" && (
                            <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                              <div
                                className="h-full bg-emerald-600 rounded-full"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                          )}
                          {file.status === "error" && <p className="text-xs text-red-500">{file.error}</p>}
                        </div>
                      </div>
                      <div className="flex items-center">
                        {file.status === "success" && <Check className="h-5 w-5 text-emerald-600 mr-2" />}
                        <button onClick={() => removeFile(file.id)} className="text-gray-400 hover:text-gray-600">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!allRequiredUploaded && files.some((f) => f.status === "success") && (
              <div className="bg-amber-50 p-4 rounded-md">
                <h4 className="font-medium text-amber-800 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Missing Required Documents
                </h4>
                <ul className="mt-2 list-disc list-inside text-sm text-amber-700">
                  {missingRequiredDocs.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-6 flex flex-col space-y-3">
              <Button
                onClick={handleSubmit}
                disabled={!allRequiredUploaded || isSubmitting}
                className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 text-white rounded-[4px]"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>

              <button onClick={onBack} className="flex items-center justify-center text-gray-600 hover:text-gray-900">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Offers
              </button>
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

