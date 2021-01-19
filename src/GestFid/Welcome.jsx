import { Link } from "react-router-dom"

const WelcomeComponent = (props) => {
  return ( 
  <div className="WelcomeComponent">
    <h1>Benvenuti in GestFid</h1>
    <h2>Ciao, {props.match.params.userid}</h2>
    <h3>clicca <Link to='/clienti'>qui</Link> per vedere i clienti disponibili</h3>
  </div> );
}
 
export default WelcomeComponent;