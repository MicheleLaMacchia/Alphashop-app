import { useEffect, useState } from "react";
import {
  getAllClientiData,
  getClientiByCode,
  delClientiByCode,
} from "../services/api/Clienti/ClientiAPI";

import "./ClientiComponent.css";

const ClientiComponent = (props) => {
  const [clienti, setClienti] = useState([]);
  const [numCli, setNumCli] = useState(0);
  const [codfid, setCodfid] = useState("");
  const [errWebApi, setErrWebApi] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [okMsg, setOkMsg] = useState(null);

  useEffect(() => {
    cercaTutti();
  }, []);

  const handleChange = (e) => {
    setCodfid(e.target.value);
  };

  const cercaTutti = () => {
    getAllClientiData()
      .then((res) => {
        setClienti(res.data);
        setNumCli(res.data.length);
      })
      .catch((err) => {
        setErrWebApi(true);
        setErrMsg(err.response.data.message);
      });
  };

  const cerca = () => {
    setErrWebApi(false);
    setErrMsg("");
    setClienti([]);
    setNumCli(0);

    console.log("Ricerca codice: " + codfid);

    if (!codfid) {
      cercaTutti();
      return;
    }

    getClientiByCode(codfid)
      .then((res) => {
        setClienti([res.data]);
        setNumCli([res.data].length);
      })
      .catch((err) => {
        setErrWebApi(true);
        setErrMsg(err.response.data.message);
      });
  };

  const modifica = (codfid) => {
    console.log("modifica il cliente con il codfid: ", codfid);

    props.history.push(`/inscliente/${codfid}`);
  };

  const elimina = (codfid) => {
    console.log("elimina il cliente con il codfid: ", codfid);

    delClientiByCode(codfid)
      .then((res) => {
        setOkMsg(`Eliminazione del cliente avente codfid: ` + codfid);
        cercaTutti();
        setTimeout(() => setOkMsg(null), 2500);
      })
      .catch((err) => {
        setErrWebApi(true);
        setErrMsg(err.response.data.message);
      });
  };

  return (
    <section className="container">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-5">
              <h2>
                Risultati Ricerca: <small>Trovati {numCli} Clienti</small>
              </h2>
            </div>
            <div className="col-sm-7">
              <button
                style={{ marginleft: "20px" }}
                className="btn btn-success float-right"
              >
                <i className="fa fa-plus"></i> Nuovo Cliente
              </button>
            </div>
          </div>
        </div>
        <div className="table-filter">
          <div className="row">
            <div className="col-sm-3">
              <div className="show-entries">
                <span>Mostra</span>
                <select className="form-control">
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <span>righe</span>
              </div>
            </div>
            <div className="col-sm-9">
              <button type="button" className="btn btn-primary" onClick={cerca}>
                <i className="fa fa-search"></i>
              </button>
              <div className="filter-group">
                <label>Filtro: </label>
                <input
                  type="text"
                  name="codfid"
                  onChange={handleChange}
                  value={codfid}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        {okMsg && <div className="alert alert-success">{okMsg}</div>}
        <table
          id="clienti"
          className="table table-striped table-bordered table-hover"
        >
          <thead>
            <tr>
              <th>CodFid</th>
              <th>Nominativo</th>
              <th>Indirizzo</th>
              <th>Comune</th>
              <th>Telefono</th>
              <th>Bollini</th>
              <th>Ultima Spesa</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clienti.map((cliente) => (
              <tr key={cliente.codfid}>
                <td>{cliente.codfid}</td>
                <td>{cliente.nominativo}</td>
                <td>{cliente.indirizzo}</td>
                <td>{cliente.comune}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.cards.bollini}</td>
                <td>{cliente.cards.ultimaspesa}</td>
                <td>
                  <button
                    className="btn btn-warning table-buttons"
                    onClick={() => modifica(cliente.codfid)}
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i> Modifica
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning table-buttons"
                    onClick={() =>
                      window.confirm(
                        `confermi l'eliminazione del cliente codfid: ${cliente.codfid}?`
                      ) && elimina(cliente.codfid)
                    }
                  >
                    <i className="fa fa-minus" aria-hidden="true"></i> Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ErrWebApiMesg errWebApi={errWebApi} errMsg={errMsg} />
      </div>
    </section>
  );
};

const ErrWebApiMesg = (props) => {
  if (props.errWebApi) {
    return (
      <div className="alert alert-danger" role="alert">
        <h3>{props.errMsg}</h3>
      </div>
    );
  }
  return null;
};

export default ClientiComponent;
