import React, { ReactNode } from "react";
import { BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({
  title,
  description,
  children,
  footer,
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-600 text-white p-3 rounded-full">
              <BookOpen className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {title}
          </CardTitle>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && (
          <CardFooter className="flex flex-col space-y-4">{footer}</CardFooter>
        )}
      </Card>
    </div>
  );
};

export default AuthCard;
