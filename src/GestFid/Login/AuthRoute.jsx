import { Redirect, Route } from "react-router-dom";
import Authservices from "../services/authservices";

const AuthRoute = (props) => {
  if (Authservices.isLogged()) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default AuthRoute;
