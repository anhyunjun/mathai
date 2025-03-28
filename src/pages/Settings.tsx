import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, Clock, Volume2 } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader studentName="Alex Johnson" notificationCount={3} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue="Alex Johnson" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            defaultValue="alex@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="grade">Grade Level</Label>
                          <Input id="grade" defaultValue="8th Grade" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="alexj2023" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          defaultValue="Math enthusiast looking to improve my algebra skills!"
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Lesson Reminders</h3>
                        <p className="text-sm text-gray-500">
                          Receive notifications before scheduled lessons
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Practice Reminders</h3>
                        <p className="text-sm text-gray-500">
                          Get reminded to practice daily
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Achievement Alerts</h3>
                        <p className="text-sm text-gray-500">
                          Be notified when you earn badges or achievements
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-500">
                          Receive email updates about your progress
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Profile Visibility</h3>
                        <p className="text-sm text-gray-500">
                          Allow other students to see your profile
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Progress Sharing</h3>
                        <p className="text-sm text-gray-500">
                          Share your learning progress with parents/guardians
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Data Collection</h3>
                        <p className="text-sm text-gray-500">
                          Allow anonymous data collection to improve our service
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Lesson Duration</h3>
                        <p className="text-sm text-gray-500">
                          Preferred length for your lessons
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <select className="rounded-md border border-gray-300 p-2">
                          <option>30 minutes</option>
                          <option selected>45 minutes</option>
                          <option>60 minutes</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Difficulty Level</h3>
                        <p className="text-sm text-gray-500">
                          Default difficulty for new topics
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <select className="rounded-md border border-gray-300 p-2">
                          <option>Beginner</option>
                          <option selected>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Sound Effects</h3>
                        <p className="text-sm text-gray-500">
                          Enable sound effects during lessons
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Voice Feedback</h3>
                        <p className="text-sm text-gray-500">
                          Enable voice feedback from AI tutor
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="mr-2"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
