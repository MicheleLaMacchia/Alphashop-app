import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClientiComponent from "./Clienti/Clienti";
import FooterComponent from "./Footer/FooterComponent";
import HeaderComponent from "./Header/HeaderComponent";
import LoginComponent from "./Login/LoginComponent";
import WelcomeComponent from "./Welcome/Welcome";

const GestFidApp = () => {
  return (
    <div className="GestFidApp">
      <HeaderComponent />
      <Router>
        <Switch>
          <Route path="/" exact component={LoginComponent} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/welcome/:userid" component={WelcomeComponent} />
          <Route path="/clienti" component={ClientiComponent} />
          <Route component={ErrorComponent} />
        </Switch>
      </Router>
      <FooterComponent />
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
