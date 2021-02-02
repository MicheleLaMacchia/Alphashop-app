import { useState } from "react";
import { JWTAuthUser, saveUserInfo } from "../services/authservices";
import "./LoginComponent.css";

const LoginComponent = (props) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [, setIsLogged] = useState(false);
  const [isNotLogged, setIsNotLogged] = useState(false);

  const login = () => {
    JWTAuthUser(userId, password)
      .then((res) => {
        saveUserInfo(userId, res.data.token);
        props.history.push(`/welcome/${userId}`);
      })
      .catch(() => {
        console.log("login failed");
        setIsLogged(false);
        setIsNotLogged(true);
      });
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "userId": {
        setUserId(e.target.value);
        break;
      }
      case "password": {
        setPassword(e.target.value);
        break;
      }
      default:
    }
  };

  return (
    <div className="LoginComponent">
      <section className="section-content bg padding-y">
        <div className="container login-container">
          <div className="row">
            <div className="col-md-6 login-form">
              <h3>Accesso a GestFid</h3>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="userId"
                  placeholder="Nome Utente"
                  value={userId}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <button className="btnSubmit" onClick={login}>
                  Accedi
                </button>
              </div>
              <div className="form-group">
                <a href="#" className="ForgetPwd">
                  Password dimenticata?
                </a>
              </div>
              <ConnexKoMsg isNotLogged={isNotLogged} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ConnexKoMsg = ({ isNotLogged }) => {
  if (isNotLogged) {
    return (
      <div className="alert alert-danger" role="alert">
        Username e/o password errate
      </div>
    );
  } else {
    return null;
  }
};

export default LoginComponent;
