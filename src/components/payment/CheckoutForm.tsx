import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";

const formSchema = z.object({
  cardName: z.string().min(2, { message: "Name is required" }),
  cardNumber: z
    .string()
    .regex(/^[0-9]{16}$/, { message: "Valid card number is required" }),
  expiryMonth: z.string().min(1, { message: "Required" }),
  expiryYear: z.string().min(1, { message: "Required" }),
  cvv: z.string().regex(/^[0-9]{3,4}$/, { message: "Valid CVV is required" }),
  saveCard: z.boolean().optional(),
  billingAddress: z.object({
    line1: z.string().min(1, { message: "Address is required" }),
    line2: z.string().optional(),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    postalCode: z.string().min(1, { message: "Postal code is required" }),
    country: z.string().min(1, { message: "Country is required" }),
  }),
});

const CheckoutForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);

  // Parse query parameters to get plan and cycle
  const queryParams = new URLSearchParams(location.search);
  const planId = queryParams.get("plan") || "premium";
  const cycle = queryParams.get("cycle") || "monthly";

  // Get plan details based on planId
  const getPlanDetails = () => {
    const plans = {
      basic: { name: "Basic Plan", price: cycle === "monthly" ? 9.99 : 99.9 },
      premium: {
        name: "Premium Plan",
        price: cycle === "monthly" ? 19.99 : 199.9,
      },
      unlimited: {
        name: "Unlimited Plan",
        price: cycle === "monthly" ? 29.99 : 299.9,
      },
    };
    return plans[planId as keyof typeof plans] || plans.premium;
  };

  const planDetails = getPlanDetails();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      saveCard: false,
      billingAddress: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "US",
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      console.log("Payment processed:", values);
      setIsProcessing(false);
      // In a real app, you would process the payment with a payment provider
      // and then navigate to a success page
      navigate("/payment-success");
    }, 2000);
  }

  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return {
      value: month.toString().padStart(2, "0"),
      label: month.toString().padStart(2, "0"),
    };
  });

  // Generate year options (current year + 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => {
    const year = currentYear + i;
    return { value: year.toString(), label: year.toString() };
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Complete Your Purchase</h1>
          <p className="text-gray-600 mt-2">
            You're just one step away from starting your math learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
                <CardDescription>
                  Enter your payment details securely
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name on Card</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="1234 5678 9012 3456"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <FormLabel>Expiration Date</FormLabel>
                          <div className="grid grid-cols-2 gap-2">
                            <FormField
                              control={form.control}
                              name="expiryMonth"
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="MM" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {months.map((month) => (
                                        <SelectItem
                                          key={month.value}
                                          value={month.value}
                                        >
                                          {month.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="expiryYear"
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="YYYY" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {years.map((year) => (
                                        <SelectItem
                                          key={year.value}
                                          value={year.value}
                                        >
                                          {year.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <FormField
                          control={form.control}
                          name="saveCard"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium cursor-pointer">
                                Save this card for future payments
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Billing Address</h3>

                      <FormField
                        control={form.control}
                        name="billingAddress.line1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 1</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="billingAddress.line2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 2 (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Apt 4B" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="billingAddress.city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="New York" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="billingAddress.state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="NY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="billingAddress.postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input placeholder="10001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="billingAddress.country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="US">
                                    United States
                                  </SelectItem>
                                  <SelectItem value="CA">Canada</SelectItem>
                                  <SelectItem value="UK">
                                    United Kingdom
                                  </SelectItem>
                                  <SelectItem value="AU">Australia</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isProcessing}
                      >
                        {isProcessing
                          ? "Processing..."
                          : `Pay $${planDetails.price.toFixed(2)}`}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">{planDetails.name}</span>
                  <span>${planDetails.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Billing cycle</span>
                  <span className="capitalize">{cycle}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${planDetails.price.toFixed(2)}</span>
                </div>

                <div className="bg-gray-50 p-3 rounded-md mt-4 text-sm text-gray-600 flex items-start">
                  <Lock className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                  <p>
                    Your payment information is encrypted and secure. We never
                    store your full card details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
