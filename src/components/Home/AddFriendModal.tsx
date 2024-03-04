import {
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { TextField } from "../TextField";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { SocketResponse, socket } from "../../socket/socket";
import { friendContext } from "../../contexts/friends.context";

type AddFriendModalProps = {
  isOpen: boolean;
  onClose: any;
};

export const AddFriendModal = ({ isOpen, onClose }: AddFriendModalProps) => {
  const [error, setError] = useState("");
  const { setFriends } = useContext(friendContext);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Friend</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text fontSize="2xl" color={"red.500"} textAlign={"center"} py="1rem">
            {error}
          </Text>

          <Formik
            initialValues={{ friendname: "" }}
            validationSchema={Yup.object({
              friendname: Yup.string().required(),
            })}
            onSubmit={(values, helpers) => {
              socket
                .timeout(500)
                .emit(
                  "add-friend",
                  values.friendname,
                  (error: any, response: SocketResponse) => {
                    if (error) {
                      setError("Server not response");
                      return;
                    }

                    console.log("response: ", response);
                    if (!response.status) {
                      setError(response.message);
                    } else {
                      helpers.resetForm();
                      setError("");

                      setFriends((prev: any) => [...prev, response.data]);
                      onClose();
                    }
                  }
                );
            }}
          >
            {({ getFieldProps, errors, touched }) => (
              <VStack>
                <HStack as={Form} w="100%">
                  <FormControl
                    isInvalid={Boolean(touched.friendname && errors.friendname)}
                  >
                    <Input
                      autoComplete="off"
                      size="lg"
                      placeholder="Enter friend's name"
                      {...getFieldProps("friendname")}
                    />
                  </FormControl>
                  <Button bgColor="green.500" type="submit">
                    Add
                  </Button>
                </HStack>
                <Text color="red.500" alignSelf="start">
                  {touched.friendname && errors.friendname}
                </Text>
              </VStack>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
