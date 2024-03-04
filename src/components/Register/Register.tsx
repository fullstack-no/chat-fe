import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik, useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TextField } from "../TextField";
import { requestServer } from "../../api/requestServer";
import { useContext } from "react";
import { authContext } from "../../contexts/auth.context";

export const Register = () => {
  const { setUser } = useContext(authContext);
  const navigate = useNavigate();

  function handleSubmit(values: any) {
    console.log(values);
    requestServer("auth/register", "POST", values)
      .then((data) => {
        setUser(data);
        if (data.login) navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <VStack w={{ base: "90%", md: "500px" }} m="auto" pt="10%">
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string().min(3).max(20).required(),
          password: Yup.string().min(3).max(20).required(),
        })}
        onSubmit={handleSubmit}
      >
        <Form style={{ width: "100%" }}>
          <VStack gap={"1.5rem"}>
            <Heading>Register</Heading>

            <TextField
              name="username"
              label="Username"
              autoComplete="off"
              type="text"
            />
            <TextField name="password" label="Password" type="password" />

            <ButtonGroup>
              <Button type="submit" bgColor={"green"}>
                Reister
              </Button>
              <Button as={Link} to="/">
                Go to Login
              </Button>
            </ButtonGroup>
          </VStack>
        </Form>
      </Formik>
    </VStack>
  );
};
