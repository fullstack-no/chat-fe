import { createContext, useState } from "react";

type User = {
  login: boolean;
  id: number | string;
  username: string;
};
type AuthContextProps = {
  user: User;
  setUser: any;
};
type AuthProviderProps = {
  children: React.ReactNode;
};

export const authContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState({} as User);
  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  );
};
