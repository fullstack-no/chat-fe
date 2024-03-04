import { ChatIcon } from "@chakra-ui/icons";
import {
  Button,
  Circle,
  Container,
  Divider,
  HStack,
  Heading,
  IconButton,
  Tab,
  TabList,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { friendContext } from "../../contexts/friends.context";
import { AddFriendModal } from "./AddFriendModal";
import { requestServer } from "../../api/requestServer";

export const Sidebar = () => {
  const { friends } = useContext(friendContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function hanldeLogout() {
    requestServer("auth/logout", "GET")
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <VStack>
      <HStack justify="space-around" w="100%" py="2rem">
        <Heading size={"lg"}>Add Friend</Heading>
        <IconButton aria-label="add friend" onClick={onOpen}>
          <ChatIcon />
        </IconButton>
      </HStack>
      <Divider />

      <TabList flexDirection="column" w={{ base: "100%", md: "50%" }}>
        {friends?.map((friend, idx) => (
          <HStack as={Tab} key={idx}>
            <Circle
              bgColor={friend.connected ? "green.500" : `red.500`}
              size={15}
            />
            <Text>{friend.username}</Text>
          </HStack>
        ))}
      </TabList>

      <Container pt="1rem" px="1rem">
        <Button onClick={hanldeLogout} w="100%" bgColor="red.500">
          logout
        </Button>
      </Container>

      {/* modal */}
      <AddFriendModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};
