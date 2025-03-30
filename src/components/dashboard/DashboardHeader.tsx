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
    <header className="bg-background border-b border-border h-20 px-6 flex items-center justify-between w-full sticky top-0 z-10 shadow-soft">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <div className="bg-primary text-primary-foreground p-2.5 rounded-lg">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="font-display font-bold text-xl text-primary">
            Mathkong
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link
          to="/lesson"
          className="text-foreground hover:text-primary font-medium transition-colors relative group"
        >
          My Lessons
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          to="/practice"
          className="text-foreground hover:text-primary font-medium transition-colors relative group"
        >
          Practice
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
        <Link
          to="/achievements"
          className="text-foreground hover:text-primary font-medium transition-colors relative group"
        >
          Achievements
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
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
                  "relative hover:bg-primary-50 transition-colors",
                  gitHubVerified ? "text-success" : "text-muted-foreground",
                )}
                onClick={handleGitHubClick}
              >
                <Github className="h-5 w-5" />
                {gitHubVerified && (
                  <span className="absolute -top-1 -right-1 bg-success text-success-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse-gentle">
                    ✓
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-popover text-popover-foreground shadow-medium">
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
                className="relative hover:bg-primary-50 transition-colors"
                onClick={handleNotificationClick}
              >
                <Bell className="h-5 w-5 text-muted-foreground" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-gentle">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-popover text-popover-foreground shadow-medium">
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary-50 transition-colors"
              >
                <HelpCircle className="h-5 w-5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-popover text-popover-foreground shadow-medium">
              <p>Help & Support</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2 hover:bg-primary-50 transition-colors"
            >
              <Avatar className="h-8 w-8 border-2 border-primary-100">
                <AvatarImage src={avatarUrl} alt={studentName} />
                <AvatarFallback className="bg-primary-100 text-primary-700">
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
          <DropdownMenuContent
            align="end"
            className="bg-popover text-popover-foreground shadow-medium border border-border rounded-lg w-56"
          >
            <DropdownMenuLabel className="text-muted-foreground">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={handleProfileClick}
              className="hover:bg-primary-50 hover:text-primary cursor-pointer transition-colors"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleSettingsClick}
              className="hover:bg-primary-50 hover:text-primary cursor-pointer transition-colors"
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="hover:bg-error-50 hover:text-error cursor-pointer transition-colors">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );

  return (
    <>
      {header}

      <Dialog open={showGitHubDialog} onOpenChange={setShowGitHubDialog}>
        <DialogContent className="bg-background border border-border shadow-medium rounded-lg max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-display text-foreground">
              GitHub Integration
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {gitHubVerified
                ? "Your GitHub integration is verified. You can now collaborate on the project."
                : "Verify your GitHub integration to enable collaboration features."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {gitHubVerified ? (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-success font-medium">
                  ✓ GitHub integration verified
                </p>
                <Button
                  onClick={openGitHubRepo}
                  className="w-full bg-primary hover:bg-primary-600 text-primary-foreground transition-colors"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Open Repository
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                  Follow these steps to verify your GitHub integration:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-foreground">
                  <li>Create a GitHub repository (if you haven't already)</li>
                  <li>Connect Tempo to your repository using the Git tab</li>
                  <li>Push your changes to GitHub</li>
                </ol>
                <Button
                  onClick={verifyGitHubIntegration}
                  className="w-full bg-primary hover:bg-primary-600 text-primary-foreground transition-colors"
                >
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
