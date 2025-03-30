import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: string;
  isProactive?: boolean;
}

interface ChatPanelProps {
  chatHistory: ChatMessage[];
  onSendMessage: (message: string) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  chatHistory,
  onSendMessage,
}) => {
  const [chatMessage, setChatMessage] = useState("");

  const handleSend = () => {
    if (chatMessage.trim()) {
      onSendMessage(chatMessage);
      setChatMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto mb-4 space-y-4 p-2">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${msg.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            >
              <div className="font-semibold text-sm">{msg.sender}</div>
              <div>{msg.message}</div>
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
          placeholder="Ask a question about the lesson..."
          className="flex-grow px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default ChatPanel;
