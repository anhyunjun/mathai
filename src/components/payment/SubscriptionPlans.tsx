import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Star,
  Zap,
  BookOpen,
  Video,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  callToAction: string;
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    description: "Perfect for beginners looking to improve their math skills",
    features: [
      { text: "5 AI tutor sessions per month", included: true },
      { text: "Access to basic curriculum", included: true },
      { text: "Practice problems with hints", included: true },
      { text: "Progress tracking", included: true },
      { text: "Personalized learning path", included: false },
      { text: "Advanced topics", included: false },
      { text: "Unlimited AI tutor access", included: false },
    ],
    callToAction: "Get Started",
  },
  {
    id: "premium",
    name: "Premium",
    price: 19.99,
    description: "Our most popular plan for dedicated math students",
    features: [
      { text: "15 AI tutor sessions per month", included: true },
      { text: "Access to full curriculum", included: true },
      { text: "Practice problems with detailed solutions", included: true },
      { text: "Comprehensive progress tracking", included: true },
      { text: "Personalized learning path", included: true },
      { text: "Advanced topics", included: true },
      { text: "Unlimited AI tutor access", included: false },
    ],
    popular: true,
    callToAction: "Choose Premium",
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: 29.99,
    description: "Unlimited access to all features for serious math learners",
    features: [
      { text: "Unlimited AI tutor sessions", included: true },
      { text: "Access to all curriculum levels", included: true },
      {
        text: "Advanced practice problems with step-by-step solutions",
        included: true,
      },
      { text: "Detailed analytics and progress reports", included: true },
      { text: "Customizable learning path", included: true },
      { text: "All advanced topics and special courses", included: true },
      { text: "Priority support", included: true },
    ],
    callToAction: "Go Unlimited",
  },
];

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );

  const handleSelectPlan = (planId: string) => {
    // In a real app, you would redirect to a checkout page with the selected plan
    navigate(`/checkout?plan=${planId}&cycle=${billingCycle}`);
  };

  const getDiscountedPrice = (price: number) => {
    return billingCycle === "annual"
      ? (price * 10).toFixed(2)
      : price.toFixed(2);
  };

  const getOriginalPrice = (price: number) => {
    return billingCycle === "annual" ? (price * 12).toFixed(2) : null;
  };

  const getSavingsText = (price: number) => {
    if (billingCycle === "annual") {
      const savings = price * 12 - price * 10;
      return `Save $${savings.toFixed(2)}`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Choose Your Learning Plan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the plan that best fits your learning needs. All plans
            include access to our AI-powered math tutoring platform.
          </p>

          <div className="flex justify-center mt-6">
            <div className="bg-gray-100 p-1 rounded-full inline-flex">
              <button
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  billingCycle === "monthly"
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-600 hover:text-gray-900",
                )}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  billingCycle === "annual"
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-600 hover:text-gray-900",
                )}
                onClick={() => setBillingCycle("annual")}
              >
                Annual
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "flex flex-col h-full",
                plan.popular && "border-primary shadow-md relative",
              )}
            >
              {plan.popular && (
                <Badge className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/2 bg-primary text-white px-3 py-1">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {plan.name === "Basic" && (
                    <BookOpen className="h-5 w-5 text-blue-500" />
                  )}
                  {plan.name === "Premium" && (
                    <Star className="h-5 w-5 text-yellow-500" />
                  )}
                  {plan.name === "Unlimited" && (
                    <Zap className="h-5 w-5 text-purple-500" />
                  )}
                  {plan.name}
                </CardTitle>
                <div className="mt-2">
                  <div className="flex items-end">
                    <span className="text-3xl font-bold">
                      ${getDiscountedPrice(plan.price)}
                    </span>
                    <span className="text-gray-500 ml-1">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                  {billingCycle === "annual" && (
                    <div className="mt-1 space-y-1">
                      <div className="text-sm text-gray-500 line-through">
                        ${getOriginalPrice(plan.price)}/year
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700"
                      >
                        {getSavingsText(plan.price)}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardDescription className="mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-0.5">
                        {feature.included ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border border-gray-300" />
                        )}
                      </span>
                      <span
                        className={
                          feature.included ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={cn(
                    "w-full",
                    plan.popular ? "bg-primary hover:bg-primary/90" : "",
                  )}
                >
                  {plan.callToAction}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">All Plans Include:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <Video className="h-6 w-6 text-blue-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium">Interactive Video Lessons</h3>
                <p className="text-sm text-gray-600">
                  Learn with engaging, interactive video content
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <MessageCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium">AI Tutor Support</h3>
                <p className="text-sm text-gray-600">
                  Get help from our AI tutors when you're stuck
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <BookOpen className="h-6 w-6 text-purple-500 mr-3 mt-0.5" />
              <div>
                <h3 className="font-medium">Practice Problems</h3>
                <p className="text-sm text-gray-600">
                  Reinforce your learning with practice problems
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
