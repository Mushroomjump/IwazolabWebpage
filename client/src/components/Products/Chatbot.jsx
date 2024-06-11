import React, { useState, useEffect, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import { server } from "../../server";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${server}/chatbot`, { message: input });
      const botMessage = { text: res.data.reply, sender: "bot" };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      const botMessage = {
        text: "Something went wrong. Please try again.",
        sender: "bot",
      };
      setMessages([...messages, userMessage, botMessage]);
    } finally {
      setLoading(false);
      scrollToBottom();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-one bg-white shadow-md overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold">Chat History</h2>
          <ul>
            {messages.map((msg, index) => (
              <li
                key={index}
                className={`py-2 px-4 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  } inline-block p-2 rounded`}
                >
                  {msg.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-three flex flex-col">
        <div className="flex-grow p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
        <div className="p-4 bg-white border-t">
          <div className="flex">
            <input
              type="text"
              className="flex-grow p-2 border rounded-l-md"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              className="p-2 bg-blue-500 text-white rounded-r-md flex items-center justify-center"
              onClick={sendMessage}
              disabled={loading}
            >
              <AiOutlineSend size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
