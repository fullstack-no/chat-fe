import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import { Home } from "./Home/Home";
import { PrivateRoute } from "./PrivateRoute";
import { useContext, useEffect } from "react";
import { authContext } from "../contexts/auth.context";
import { Text } from "@chakra-ui/react";
import { requestServer } from "../api/requestServer";

export const Views = () => {
  const { user, setUser } = useContext(authContext);
  const navigate = useNavigate();

  useEffect(() => {
    requestServer("auth/login", "GET")
      .then((data) => {
        setUser(data);
        if (data.login) navigate("/home");
      })
      .catch();
  }, []);

  return user.login !== undefined ? (
    <Routes>
      <Route path="/" Component={Login} />
      <Route path="/register" Component={Register} />
      <Route element={<PrivateRoute />}>
        <Route path="/home" Component={Home} />
      </Route>
    </Routes>
  ) : (
    <Text>Loading...</Text>
  );
};
