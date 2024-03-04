import {
  Divider,
  Stack,
  TabPanel,
  TabPanels,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef } from "react";
import { friendContext } from "../../contexts/friends.context";
import { messagesContext } from "../../contexts/messages.context";
import { ChatBox } from "./ChatBox";

type ChatProps = {
  friendIndex: number;
};
export const Chat = ({ friendIndex }: ChatProps) => {
  const { messages } = useContext(messagesContext);
  const { friends } = useContext(friendContext);
  const scrollRef = useRef(null as unknown as HTMLDivElement);

  useEffect(() => {
    scrollRef.current.scrollIntoView();
  });

  return friends.length ? (
    <VStack h="100%">
      <TabPanels overflow="auto">
        {friends.map((friend, idx) => (
          <VStack as={TabPanel} justify="end" key={idx}>
            <VStack w="100%" px="12px" flexDirection={"column-reverse"}>
              <div ref={scrollRef} />

              {messages
                .filter(
                  (msg) =>
                    msg.from === friend.username || msg.to === friend.username
                )
                .map((msg, idx) => (
                  <Stack
                    key={idx}
                    maxW="45%"
                    alignSelf={msg.from === friend.username ? "start" : "end"}
                    p="8px"
                    borderRadius="10px"
                    bgColor={
                      msg.from === friend.username ? "blue.500" : "gray.500"
                    }
                  >
                    <Text whiteSpace={"pre-wrap"}>{msg.content || " "}</Text>
                  </Stack>
                ))}
            </VStack>
          </VStack>
        ))}
      </TabPanels>

      <Divider />
      <ChatBox friendIndex={friendIndex} />
    </VStack>
  ) : (
    <VStack>
      <TabPanels>
        <Text>Please add friend to start chat.</Text>
      </TabPanels>
    </VStack>
  );
};
