import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClientiComponent from "./Clienti/ClientiComponent";
import DatiClienteComponent from "./Clienti/InserisciCliente/DatiClienteComponent";
import FooterComponent from "./Footer/FooterComponent";
import HeaderComponent from "./Header/HeaderComponent";
import AuthRoute from "./Login/AuthRoute";
import LoginComponent from "./Login/LoginComponent";
import LogoutComponent from "./Logout/LogoutComponent";
import WelcomeComponent from "./Welcome/Welcome";
import { USER, ADMIN } from "./services/authservices";
import ForbiddenComponent from "./Forbidden/ForbiddenComponent";

const GestFidApp = () => {
  return (
    <div className="GestFidApp">
      <Router>
        <HeaderComponent />
        <Switch>
          <Route path="/" exact component={LoginComponent} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/logout" component={LogoutComponent} />
          <AuthRoute
            path="/welcome/:userid"
            component={WelcomeComponent}
            role={USER}
          />
          <AuthRoute
            path="/inscliente/:codfid"
            component={DatiClienteComponent}
            role={ADMIN}
          />
          <AuthRoute path="/clienti" component={ClientiComponent} role={USER} />
          <Route path="/forbidden" component={ForbiddenComponent} />
          <Route component={ErrorComponent} />
        </Switch>
        <FooterComponent />
      </Router>
    </div>
  );
};

const ErrorComponent = () => {
  return (
    <div>
      <h1>Errore. Pagina non trovata!</h1>
    </div>
  );
};

export default GestFidApp;
