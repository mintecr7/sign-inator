import { useState } from "react";

interface Message {
  id: number;
  text: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello, how are you?" },
    { id: 2, text: "I'm doing well, thanks!" },
    { id: 3, text: "Great to hear!" },
    { id: 4, text: "What about you?" },
    { id: 5, text: "What about you?" },
    { id: 6, text: "What about you?" },
    { id: 7, text: "What about you?" },
    { id: 8, text: "What about you?" },
    { id: 9, text: "What about you?" },
    {
      id: 10,
      text: "What about you?",
    },
  ]);
  return (
    <div className="ml-10 p-2 bg-gray-100 w-96 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-bold mb-4">Messages</h1>
      <div className="h-96 overflow-y-scroll p-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className="mb-4 p-4 bg-blue-100 rounded-lg shadow-md w-64"
          >
            {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
