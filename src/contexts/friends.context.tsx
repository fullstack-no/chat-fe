import { createContext, useState } from "react";

type Friend = {
  id: string | number;
  username: string;
  connected: boolean;
};
type FriendContextProps = {
  friends: Friend[];
  setFriends: any;
};
type FriendProviderProps = {
  children: React.ReactNode;
};

export const friendContext = createContext({} as FriendContextProps);

export const FriendProvider = ({ children }: FriendProviderProps) => {
  const [friends, setFriends] = useState([] as Friend[]);

  return (
    <friendContext.Provider value={{ friends, setFriends }}>
      {children}
    </friendContext.Provider>
  );
};
