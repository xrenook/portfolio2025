import { useState } from "react";
import { IoChatbubblesOutline, IoCloseOutline } from "react-icons/io5";
import ChatWindow from "./ChatWindow";
import "./Chatbot.scss";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chatbot-container">
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? (
          <IoCloseOutline size={28} />
        ) : (
          <IoChatbubblesOutline size={26} />
        )}
      </button>
    </div>
  );
}
