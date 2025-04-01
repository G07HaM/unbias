"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

const authFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  mobile: z.string().regex(/^[0-9]{10}$/, { message: "Please enter a valid 10-digit mobile number." }),
})

const otpSchema = z.object({
  otp: z.string().length(6, { message: "Please enter a valid 6-digit OTP." }),
})

type AuthFormValues = z.infer<typeof authFormSchema>
type OTPFormValues = z.infer<typeof otpSchema>

interface AuthFormProps {
  onAuthenticated: () => void
}

export function AuthForm({ onAuthenticated }: AuthFormProps) {
  const [showOTP, setShowOTP] = useState(false)
  const [mobileNumber, setMobileNumber] = useState("")

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      name: "",
      mobile: "",
    },
  })

  const otpForm = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })

  const onSubmit = (data: AuthFormValues) => {
    setMobileNumber(data.mobile)
    setShowOTP(true)
    // Here you would typically make an API call to send OTP
  }

  const onOTPSubmit = (data: OTPFormValues) => {
    // Here you would typically verify the OTP with your backend
    onAuthenticated()
  }

  if (showOTP) {
    return (
      <div className="w-full max-w-md mx-auto space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold">Verify OTP</h1>
          <p className="text-gray-500">We've sent a verification code to {mobileNumber}</p>
        </div>

        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOTPSubmit)} className="space-y-4">
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      render={({ slots }) => (
                        <InputOTPGroup className="gap-2">
                          {slots.map((slot, index) => (
                            <InputOTPSlot key={index} index={index} />
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800">
              Verify OTP
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <Button
            variant="link"
            className="text-emerald-700"
            onClick={() => setShowOTP(false)}
          >
            ← Back to form
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Authenticate to View Offers</h1>
        <p className="text-gray-500">Please enter your details to proceed</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <div className="flex space-x-2">
                  <FormControl>
                    <Input placeholder="Enter 10-digit number" {...field} />
                  </FormControl>
                  <Button 
                    type="button" 
                    className="bg-emerald-700 hover:bg-emerald-800"
                    onClick={() => {
                      const mobileValue = form.getValues().mobile;
                      if (/^[0-9]{10}$/.test(mobileValue)) {
                        setMobileNumber(mobileValue);
                        // Here you would typically make an API call to send OTP
                        alert(`OTP sent to ${mobileValue}`);
                        // Show OTP field but don't navigate to OTP screen yet
                        form.clearErrors('mobile');
                      } else {
                        form.setError('mobile', {
                          type: 'manual',
                          message: 'Please enter a valid 10-digit mobile number.',
                        });
                      }
                    }}
                  >
                    Get OTP
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.getValues().mobile && /^[0-9]{10}$/.test(form.getValues().mobile) && (
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter OTP</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      render={({ slots }) => (
                        <InputOTPGroup className="gap-2">
                          {slots.map((slot, index) => (
                            <InputOTPSlot key={index} index={index} />
                          ))}
                        </InputOTPGroup>
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  )
}