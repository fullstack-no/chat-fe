import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { requestServer } from "../../api/requestServer";
import { useContext, useState } from "react";
import { authContext } from "../../contexts/auth.context";

export const Login = () => {
  const [error, setError] = useState("");
  const { setUser } = useContext(authContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().min(3).max(20).required(),
      password: Yup.string().min(3).max(20).required(),
    }),
    onSubmit(values, formikHelpers) {
      console.log(values);
      requestServer("auth/login", "POST", values)
        .then((data) => {
          setUser(data);
          if (data.login) navigate("/home");
          else {
            setError(data?.error || "login failed");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <VStack
      as="form"
      w={{ base: "90%", md: "500px" }}
      m="auto"
      pt="10%"
      gap={"1.5rem"}
      onSubmit={formik.handleSubmit as any}
    >
      <Heading>Login</Heading>
      {error && (
        <Alert status="error" justifyContent={"center"}>
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          size={"md"}
          autoComplete="off"
          {...formik.getFieldProps("username")}
        />
        <Text size="sm" color="red.500">
          {formik.touched.username && formik.errors.username}
        </Text>
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          size={"md"}
          type="password"
          {...formik.getFieldProps("password")}
        />
        <Text size="sm" color="red.500">
          {formik.touched.password && formik.errors.password}
        </Text>
      </FormControl>

      <ButtonGroup>
        <Button type="submit" bgColor={"green"}>
          Login
        </Button>
        <Button as={Link} to="register">
          Create an account
        </Button>
      </ButtonGroup>
    </VStack>
  );
};
