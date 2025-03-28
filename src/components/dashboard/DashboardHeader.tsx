import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, BookOpen, Github, HelpCircle, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DashboardHeaderProps {
  studentName?: string;
  avatarUrl?: string;
  notificationCount?: number;
  repoUrl?: string;
}

const DashboardHeader = ({
  studentName = "Alex Johnson",
  avatarUrl = "",
  notificationCount = 3,
  repoUrl = "https://github.com/yourusername/mathkong",
}: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const [showGitHubDialog, setShowGitHubDialog] = useState(false);
  const [gitHubVerified, setGitHubVerified] = useState(false);

  useEffect(() => {
    // Check if GitHub integration is verified (this would be replaced with actual verification logic)
    const isVerified = localStorage.getItem("github-integration-verified");
    if (isVerified === "true") {
      setGitHubVerified(true);
    }
  }, []);

  const handleNotificationClick = () => {
    // Show a simple alert for notifications
    alert(`You have ${notificationCount} new notifications`);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleProfileClick = () => {
    navigate("/settings");
  };

  const handleGitHubClick = () => {
    setShowGitHubDialog(true);
  };

  const verifyGitHubIntegration = () => {
    // Simulate verification process
    localStorage.setItem("github-integration-verified", "true");
    setGitHubVerified(true);
    setShowGitHubDialog(false);
  };

  const openGitHubRepo = () => {
    window.open(repoUrl, "_blank");
  };

  const header = (
    <header className="bg-white border-b border-gray-200 h-20 px-6 flex items-center justify-between w-full sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-purple-600 text-white p-2 rounded-md">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl text-purple-600">Mathkong</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link
          to="/lesson"
          className="text-gray-600 hover:text-purple-600 font-medium"
        >
          My Lessons
        </Link>
        <Link
          to="/practice"
          className="text-gray-600 hover:text-purple-600 font-medium"
        >
          Practice
        </Link>
        <Link
          to="/achievements"
          className="text-gray-600 hover:text-purple-600 font-medium"
        >
          Achievements
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "relative",
                  gitHubVerified ? "text-green-600" : "text-gray-600",
                )}
                onClick={handleGitHubClick}
              >
                <Github className="h-5 w-5" />
                {gitHubVerified && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    ✓
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {gitHubVerified
                  ? "GitHub Connected"
                  : "Verify GitHub Integration"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={handleNotificationClick}
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5 text-gray-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Help & Support</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarUrl} alt={studentName} />
                <AvatarFallback className="bg-purple-100 text-purple-600">
                  {studentName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm hidden md:inline">
                {studentName}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );

  return (
    <>
      {header}

      <Dialog open={showGitHubDialog} onOpenChange={setShowGitHubDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>GitHub Integration</DialogTitle>
            <DialogDescription>
              {gitHubVerified
                ? "Your GitHub integration is verified. You can now collaborate on the project."
                : "Verify your GitHub integration to enable collaboration features."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {gitHubVerified ? (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-green-600 font-medium">
                  ✓ GitHub integration verified
                </p>
                <Button onClick={openGitHubRepo} className="w-full">
                  <Github className="mr-2 h-4 w-4" />
                  Open Repository
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-sm">
                  Follow these steps to verify your GitHub integration:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Create a GitHub repository (if you haven't already)</li>
                  <li>Connect Tempo to your repository using the Git tab</li>
                  <li>Push your changes to GitHub</li>
                </ol>
                <Button onClick={verifyGitHubIntegration} className="w-full">
                  Verify Integration
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardHeader;
