import { Button, HStack, Input } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { socket } from "../../socket/socket";
import { useContext } from "react";
import { messagesContext } from "../../contexts/messages.context";
import { friendContext } from "../../contexts/friends.context";
import { authContext } from "../../contexts/auth.context";

type ChatBoxProps = {
  friendIndex: number;
};

export const ChatBox = ({ friendIndex }: ChatBoxProps) => {
  const { setMessages } = useContext(messagesContext);
  const { friends } = useContext(friendContext);
  const { user } = useContext(authContext);
  const friend = friends[friendIndex];

  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={(values, helpers) => {
        setMessages((prev: any) => [
          { from: user.username, to: friend.username, content: values.message },
          ...prev,
        ]);

        socket.emit("message:send", friend.username, values.message);

        helpers.resetForm();
      }}
    >
      {({ getFieldProps }) => (
        <HStack as={Form} w="100%" p="1rem">
          <Input autoComplete="off" {...getFieldProps("message")} />
          <Button bgColor="green.600" type="submit">
            Send
          </Button>
        </HStack>
      )}
    </Formik>
  );
};
