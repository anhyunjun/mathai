import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
  isProactive?: boolean;
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chatHistory: ChatMessage[];
  teacherName: string;
  onSendMessage: (message: string) => void;
  avatarSrc?: string;
}

const ChatDialog: React.FC<ChatDialogProps> = ({
  open,
  onOpenChange,
  chatHistory,
  teacherName,
  onSendMessage,
  avatarSrc = "https://api.dicebear.com/7.x/avataaars/svg?seed=mathkong&accessories=eyepatch",
}) => {
  const [chatMessage, setChatMessage] = useState("");

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      onSendMessage(chatMessage);
      setChatMessage("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Chat with {teacherName}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex flex-col h-[400px]">
          <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === "You"
                      ? "bg-primary text-primary-foreground"
                      : msg.isProactive
                        ? "bg-blue-100 border border-blue-200"
                        : "bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {msg.sender === "AI" && (
                      <div className="w-6 h-6 rounded-full overflow-hidden bg-blue-100">
                        <img
                          src={avatarSrc}
                          alt="AI Teacher"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="font-semibold text-sm">{msg.sender}</div>
                    {msg.isProactive && (
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                        Proactive
                      </span>
                    )}
                  </div>
                  <div className="mt-1">{msg.message}</div>
                  <div className="text-xs opacity-70 mt-1 text-right">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Ask a question..."
              className="flex-grow px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
