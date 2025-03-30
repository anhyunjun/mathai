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
            <TabsList className="grid w-full grid-cols-5 mb-8">
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
              <TabsTrigger
                value="ai-teacher"
                className="flex items-center gap-2"
              >
                <Volume2 className="h-4 w-4" />
                AI Teacher
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

            <TabsContent value="ai-teacher" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-1.5 rounded-md">
                      <Volume2 className="h-5 w-5 text-white" />
                    </div>
                    AI Teacher Customization
                    <span className="ml-2 text-xs bg-gradient-to-r from-purple-400 to-pink-500 text-white px-2 py-0.5 rounded-full">
                      Premium Feature
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <Bell className="h-4 w-4 text-purple-600" />
                      </div>
                      <p className="text-sm text-gray-700">
                        Upgrade to Premium to customize your AI teacher's
                        appearance and voice.
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full">
                      Upgrade to Premium
                    </Button>
                  </div>

                  <div className="space-y-6 opacity-70 pointer-events-none">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Teacher Appearance
                      </h3>
                      <div className="grid grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`border-2 rounded-lg p-2 text-center ${i === 1 ? "border-blue-500" : "border-gray-200"}`}
                          >
                            <div className="w-full aspect-square rounded-lg overflow-hidden mb-2">
                              <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=teacher${i}`}
                                alt={`Teacher ${i}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-sm font-medium">
                              {i === 1 ? "Ms. Kong" : `Teacher ${i}`}
                            </p>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="mt-4 w-full">
                        Create Custom Avatar
                      </Button>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-lg font-medium mb-4">
                        Voice Settings
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="voice-type">Voice Type</Label>
                          <select
                            id="voice-type"
                            className="w-full rounded-md border border-gray-300 p-2"
                          >
                            <option>Female (Default)</option>
                            <option>Male</option>
                            <option>Neutral</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="voice-pitch">Pitch</Label>
                            <span className="text-sm text-gray-500">
                              Medium
                            </span>
                          </div>
                          <input
                            type="range"
                            id="voice-pitch"
                            min="1"
                            max="10"
                            defaultValue="5"
                            className="w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="voice-speed">Speaking Rate</Label>
                            <span className="text-sm text-gray-500">
                              Normal
                            </span>
                          </div>
                          <input
                            type="range"
                            id="voice-speed"
                            min="1"
                            max="10"
                            defaultValue="5"
                            className="w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="accent">Accent</Label>
                          <select
                            id="accent"
                            className="w-full rounded-md border border-gray-300 p-2"
                          >
                            <option>American (Default)</option>
                            <option>British</option>
                            <option>Australian</option>
                            <option>Indian</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="text-lg font-medium mb-4">
                        Teaching Style
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h4 className="font-medium">Encouragement Level</h4>
                            <p className="text-sm text-gray-500">
                              How often your teacher provides positive
                              reinforcement
                            </p>
                          </div>
                          <select className="rounded-md border border-gray-300 p-2">
                            <option>Low</option>
                            <option selected>Medium</option>
                            <option>High</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h4 className="font-medium">Explanation Detail</h4>
                            <p className="text-sm text-gray-500">
                              Level of detail in explanations
                            </p>
                          </div>
                          <select className="rounded-md border border-gray-300 p-2">
                            <option>Brief</option>
                            <option selected>Detailed</option>
                            <option>Very Detailed</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h4 className="font-medium">
                              Proactive Assistance
                            </h4>
                            <p className="text-sm text-gray-500">
                              How often your teacher offers help without being
                              asked
                            </p>
                          </div>
                          <select className="rounded-md border border-gray-300 p-2">
                            <option>Minimal</option>
                            <option>Moderate</option>
                            <option selected>Frequent</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button disabled>Save Customizations</Button>
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
