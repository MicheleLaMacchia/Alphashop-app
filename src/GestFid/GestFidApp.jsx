import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClientiComponent from "./Clienti/ClientiComponent";
import FooterComponent from "./Footer/FooterComponent";
import HeaderComponent from "./Header/HeaderComponent";
import LoginComponent from "./Login/LoginComponent";
import LogoutComponent from "./Logout/LogoutComponent";
import WelcomeComponent from "./Welcome/Welcome";

const GestFidApp = () => {
  return (
    <div className="GestFidApp">
      <Router>
        <HeaderComponent />
        <Switch>
          <Route path="/" exact component={LoginComponent} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/logout" component={LogoutComponent} />
          <Route path="/welcome/:userid" component={WelcomeComponent} />
          <Route path="/clienti" component={ClientiComponent} />
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
