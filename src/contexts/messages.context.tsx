import { createContext, useContext, useState } from "react";

type MessageProviderProps = {
  children: React.ReactNode;
};
type Message = {
  from: string;
  to: string;
  content: string;
};

type MessagesContextProps = {
  messages: Message[];
  setMessages: any;
};

export const messagesContext = createContext({} as MessagesContextProps);

export const MessagesProvider = ({ children }: MessageProviderProps) => {
  const [messages, setMessages] = useState([] as Message[]);
  return (
    <messagesContext.Provider value={{ messages, setMessages }}>
      {children}
    </messagesContext.Provider>
  );
};
