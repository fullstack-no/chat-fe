import { Divider, Grid, GridItem, Tabs, VStack } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { Chat } from "./Chat";
import { useContext, useEffect, useState } from "react";
import { SocketResponse, socket } from "../../socket/socket";
import { authContext } from "../../contexts/auth.context";
import { friendContext } from "../../contexts/friends.context";
import { messagesContext } from "../../contexts/messages.context";

export const Home = () => {
  const { setUser } = useContext(authContext);
  const { friends, setFriends } = useContext(friendContext);
  const [friendIndex, setFriendIndex] = useState(0);
  const { setMessages } = useContext(messagesContext);

  useEffect(() => {
    socket.connect();

    // listen
    socket.on("connect_error", () => {
      setUser({ login: false });
    });
    socket.on("friend:status", (friendname: string, connected: boolean) => {
      setFriends((prev: any) =>
        prev.map((f: any) => {
          if (f.username === friendname) {
            f.connected = connected;
          }
          return f;
        })
      );
    });

    socket.on("message:noti", (msg) => {
      setMessages((prev: any) => [msg, ...prev]);
    });

    // emit
    socket.emit("messages", (data: SocketResponse) => {
      if (data.status) {
        setMessages(data.data);
      }
    });

    socket.emit("friends", (data: SocketResponse) => {
      if (data.status) {
        setFriends(data.data);
      }
    });

    return () => {
      socket.off("connect_error");
      socket.off("message:noti");
      socket.off("friend:status");
      socket.disconnect();
    };
  }, []);

  return (
    <Grid
      as={Tabs}
      templateColumns="repeat(10, 1fr)"
      h="100vh"
      onChange={(i: any) => setFriendIndex(i)}
    >
      <GridItem colSpan={3} borderRight="1px solid gray">
        <Sidebar />
      </GridItem>
      <GridItem colSpan={7} maxH={"100vh"}>
        <Chat friendIndex={friendIndex} />
      </GridItem>
    </Grid>
  );
};
