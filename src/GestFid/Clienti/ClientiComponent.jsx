import { useState } from "react";
import "./ClientiComponent.css";

const ClientiComponent = () => {
  const [clienti] = useState([
    {
      codfid: "5669857",
      nome: "Michele La Macchia",
      indirizzo: "Viale Gran Sasso 15",
      comune: "Roma",
      bollini: "1580",
      data: "02/01/2021",
    },
    {
      codfid: "8995457",
      nome: "Antonello Venditti",
      indirizzo: "Via dei Salici 3",
      comune: "Milano",
      bollini: "830",
      data: "23/12/2020",
    },
    {
      codfid: "6321015",
      nome: "Carlo Verdone",
      indirizzo: "Corso Masseria 1",
      comune: "Napoli",
      bollini: "140",
      data: "15/01/2021",
    },
    {
      codfid: "5401254",
      nome: "Thomas Milian",
      indirizzo: "Piazza Baldo degli Ubaldi 122",
      comune: "Torino",
      bollini: "560",
      data: "18/01/2021",
    },
  ]);

  return (
    <section className="container">
      <div className="table-wrapper">
        <div className="table-title">
          <div className="row">
            <div className="col-sm-5">
              <h2>
                Risultati Ricerca: <small>Trovati 0 Clienti</small>
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
              <button type="button" className="btn btn-primary">
                <i className="fa fa-search"></i>
              </button>
              <div className="filter-group">
                <label>Filtro: </label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
        </div>

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
              <tr>
                <td>{cliente.codfid}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.indirizzo}</td>
                <td>{cliente.comune}</td>
                <td></td>
                <td>{cliente.bollini}</td>
                <td>{cliente.data}</td>
                <td>
                  <button className="btn btn-warning table-buttons">
                    <i className="fa fa-edit" aria-hidden="true"></i> Modifica
                  </button>
                </td>
                <td>
                  <button className="btn btn-warning table-buttons">
                    <i className="fa fa-minus" aria-hidden="true"></i> Elimina
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ClientiComponent;
