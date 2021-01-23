import { Redirect, Route } from "react-router-dom";
import { isLogged } from "../services/authservices";

const AuthRoute = (props) => {
  if (isLogged()) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default AuthRoute;
