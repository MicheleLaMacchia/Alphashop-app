import { Redirect, Route } from "react-router-dom";
import { isLogged } from "../services/authservices";
import jwt from "jsonwebtoken";
import { Component, useEffect } from "react";
import axios from "axios";
// messo component per effettuare caricamento dell'interceptor che con hooks non viene
export default class AuthRoute extends Component {
  componentWillMount() {
    this.setupAxiosInterceptors("Bearer " + sessionStorage.getItem("token"));
  }

  setupAxiosInterceptors = (token) => {
    axios.interceptors.request.use((config) => {
      if (isLogged) {
        config.headers.authorization = token;
      }
      return config;
    });
  };

  render() {
    let token = sessionStorage.getItem("token");
    let decoded = jwt.decode(token);
    let ruoli = decoded.authorities;

    if (isLogged()) {
      let role = this.props.role;

      if (ruoli.includes(role)) {
        return <Route {...this.props} />;
      } else {
        return <Redirect to="/forbidden" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
  }
}

/*
import { Redirect, Route } from "react-router-dom";
import { isLogged } from "../services/authservices";
import jwt from "jsonwebtoken";
import { useEffect } from "react";
import axios from "axios";
const AuthRoute = (props) => {
  useEffect(() => {
    setupAxiosInterceptors(sessionStorage.getItem("token"));
  }, []);

  const setupAxiosInterceptors = (tok) => {
    axios.interceptors.request.use((config) => {
      if (isLogged) {
        config.headers.authorization = "Bearer " + tok;
      }
      return config;
    });
  };

  let token = sessionStorage.getItem("token");
  let decoded = jwt.decode(token);
  let ruoli = decoded.authorities;

  if (isLogged()) {
    let role = props.role;

    if (ruoli.includes(role)) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/forbidden" />;
    }
  } else {
    return <Redirect to="/login" />;
  }
};

export default AuthRoute;
*/
