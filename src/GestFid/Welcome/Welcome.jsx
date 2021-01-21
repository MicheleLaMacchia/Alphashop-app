import { Link } from "react-router-dom";

const WelcomeComponent = (props) => {
  return (
    <div className="WelcomeComponent">
      <section className="section-content bg padding-y">
        <header className="section-heading">
          <h2 className="section-title">Benvenuti in GestFid</h2>
        </header>

        <p>
          Ciao, {props.match.params.userid}. Clicca{" "}
          <Link to="/clienti">qui</Link> per accedere alla lista dei clienti
        </p>
      </section>
    </div>
  );
};

export default WelcomeComponent;
