import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import useRoute from "../utils/router";
import { useEffect } from "react";
import { authStateChangeUser } from "../redux/auth/operations";
import { selectStateChange } from "../redux/auth/selectors";

const Main = () => {
  const stateChange = useSelector(selectStateChange);
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(authStateChangeUser());
}, [])
  

  const routing = useRoute(stateChange);

  return (
    <>
      <NavigationContainer>{routing}</NavigationContainer>
    </>
  );
};

export default Main;
