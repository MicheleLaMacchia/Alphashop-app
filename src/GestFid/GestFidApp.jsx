import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ClientiComponent from "./Clienti";
import WelcomeComponent from "./Welcome";

const GestFidApp = () => {
    return (
    <div className="GestFidApp">
        
      <Router>
        <Switch>
          <Route path="/" exact component={LoginComponent}/>
          <Route path="/login" component={LoginComponent}/>
          <Route path="/welcome/:userid" component={WelcomeComponent}/>
          <Route path="/clienti" component={ClientiComponent}/>
          <Route component={ErrorComponent}/>
        </Switch>
      </Router>
      
    </div>
    )
}

const ErrorComponent = () => {
  return ( <div>
    <h1>Errore. Pagina non trovata!</h1>
  </div> );
}

const LoginComponent = (props) => {

    const [userId, setUserId] = useState('Michele');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [isNotLogged, setIsNotLogged] = useState(false);
    
    const login = () => {
        if (userId === 'Michele' && password ==='Michele') {
          props.history.push(`/welcome/${userId}`)
          /* setIsLogged(true)
          setIsNotLogged(false) */
        } else {
          console.log('login failed')
          setIsLogged(false)
          setIsNotLogged(true)
        }
    }
    const handleChange = (e) => {
        switch (e.target.name) {
            case 'userId': {
                setUserId(e.target.value)
                break;
            }
            case 'password': {
                setPassword(e.target.value)
                break;
            }
            default :
        }
    }

    return ( 
        <div>
          <h1>Accedi all'app GestFidApp</h1>
            Nome Utente: <input type="text" name="userId" 
            value={userId} onChange={(e) => handleChange(e)}/>
            password: <input type="password" name="password" 
            value={password} onChange={(e) => handleChange(e)}/>
            <button onClick={() => login()}>Accedi</button>
            <ConnexOkMsg isLogged={isLogged}/>
            <ConnexKoMsg isNotLogged={isNotLogged}/>
        </div>
     );
}
 
const ConnexOkMsg = ({isLogged}) => {
  if (isLogged) {
    return ( 
      <div><h3>Connessione eseguita con successo</h3></div>
     );
  } else {
    return null
  }
}

const ConnexKoMsg = ({isNotLogged}) => {
  if (isNotLogged) {
    return ( 
      <div><h3>Connessione Fallita</h3></div>
     );
  } else {
    return null
  }
}

export default GestFidApp;