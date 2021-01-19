const WelcomeComponent = (props) => {
  return ( 
  <div className="WelcomeComponent">
    <h1>Benvenuti in GestFid</h1>
    <h2>Ciao, {props.match.params.userid}</h2>
  </div> );
}
 
export default WelcomeComponent;