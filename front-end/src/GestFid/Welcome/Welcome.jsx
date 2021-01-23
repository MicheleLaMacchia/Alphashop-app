import { useState } from "react";
import { Link } from "react-router-dom";
import { getSalutiDataParam } from "../services/api/saluti/saluti";

const WelcomeComponent = (props) => {
  const [saluto, setSaluto] = useState("");

  const getSaluti = () => {
    getSalutiDataParam(props.match.params.userid)
      .then((res) => handleResponse(res))
      .catch((err) => handleError(err));
  };

  const handleResponse = (res) => {
    setSaluto(res.data);
  };

  const handleError = (err) => {
    console.log(err);
  };

  return (
    <div className="WelcomeComponent">
      <section className="section-content bg padding-y">
        <header className="section-heading">
          <h2 className="section-title">Benvenuti in GestFid</h2>
        </header>

        <p>
          Ciao, {props.match.params.userid}. Clicca
          <Link to="/clienti"> qui</Link> per accedere alla lista dei clienti
        </p>
        <button type="button" className="btn btn-primary" onClick={getSaluti}>
          Visualizza il saluto
        </button>
        <h3>{saluto}</h3>
      </section>
    </div>
  );
};

export default WelcomeComponent;
