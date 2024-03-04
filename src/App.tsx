import { Text, VStack } from "@chakra-ui/react";
import { Routes } from "react-router-dom";
import { ToggleDarkMode, Views } from "./components";
import { AuthProvider } from "./contexts/auth.context";
import { FriendProvider } from "./contexts/friends.context";
import { MessagesProvider } from "./contexts/messages.context";

function App() {
  return (
    <>
      <AuthProvider>
        <FriendProvider>
          <MessagesProvider>
            <>
              <ToggleDarkMode />

              <Views />
            </>
          </MessagesProvider>
        </FriendProvider>
      </AuthProvider>
    </>
  );
}

export default App;
