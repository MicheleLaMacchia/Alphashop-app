import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {
  getClientiByCode,
  insCliente,
} from "../../services/api/Clienti/ClientiAPI";
import "./DatiClienteComponent.css";

const DatiClienteComponent = (props) => {
  const [id, setId] = useState("");
  const [codfid, setCodfid] = useState("");
  const [nominativo, setNominativo] = useState("");
  const [indirizzo, setIndirizzo] = useState("");
  const [comune, setComune] = useState("");
  const [cap, setCap] = useState("");
  const [prov, setProv] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mail, setMail] = useState("");
  const [attivo, setAttivo] = useState(true);
  const [cards, setCards] = useState({
    bollini: 0,
    ultimaspesa: "2020-01-01",
  });

  const [okMsg, setOkMsg] = useState(null);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    let codfid = props.match.params.codfid;
    if (codfid !== "-1") {
      getClientiByCode(codfid)
        .then((res) => handleResponse(res))
        .catch((err) => handleError(err));
    }
  }, []);

  const handleResponse = (res) => {
    setId(res.data.id);
    setCodfid(res.data.codfid);
    setNominativo(res.data.nominativo);
    setIndirizzo(res.data.indirizzo);
    setComune(res.data.comune);
    setCap(res.data.cap);
    setProv(res.data.prov);
    setTelefono(res.data.telefono);
    setMail(res.data.mail);
    setAttivo(res.data.attivo);
    setCards(res.data.cards);
  };

  const handleError = (err) => {
    console.log(err);
    setErrMsg({ errMsg: err.response.data.message });
  };

  const annulla = () => {
    if (window.confirm("Vuoi annullare l'operazione?")) {
      props.history.push("/clienti");
    }
  };

  const valida = (values) => {
    let errors = {};

    if (!values.codfid) {
      errors.codfid = "Il codice fidelity è un campo obbligatorio";
    } else if (values.codfid.length !== 8) {
      errors.codfid = "Il codice fidelity deve avere 8 caratteri";
    }

    if (!values.nominativo) {
      errors.nominativo = "Il nominativo è un campo obbligatorio";
    } else if (values.nominativo.length < 3) {
      errors.nominativo = "Il nominativo deve avere almeno 3 caratteri";
    }

    if (!values.indirizzo) {
      errors.indirizzo = "L'indirizzo è un campo obbligatorio";
    } else if (values.indirizzo.length < 3) {
      errors.indirizzo = "L'indirizzo deve avere almeno 3 caratteri";
    }

    if (!values.comune) {
      errors.comune = "Il comune è un campo obbligatorio";
    }

    if (!values.telefono) {
      errors.telefono = "Il telefono è un campo obbligatorio";
    } else if (values.telefono.length < 5) {
      errors.telefono = "Il telefono deve avere almeno 5 caratteri";
    }

    return errors;
  };

  const salva = (values) => {
    insCliente({
      id: values.id,
      codfid: values.codfid,
      nominativo: values.nominativo,
      indirizzo: values.indirizzo,
      comune: values.comune,
      cap: values.cap,
      prov: values.prov,
      telefono: values.telefono,
      mail: values.mail,
      attivo: values.attivo,
      cards: cards,
    })
      .then(() => {
        setOkMsg({ okMsg: "Inserimento avvenuto con successo" });
        setTimeout(() => {
          setOkMsg(null);
        }, 2000);
      })
      .catch((err) => handleError(err));
  };

  return (
    <section className="container">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">Dati cliente fidelity</h3>
          <Formik
            initialValues={{
              id,
              codfid,
              nominativo,
              indirizzo,
              comune,
              cap,
              prov,
              telefono,
              mail,
              attivo,
            }}
            enableReinitialize={true}
            onSubmit={salva}
            validate={valida}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {(props) => (
              <Form>
                <div className="form-group">
                  <img
                    src={`../user.jpg`}
                    alt="imgclt"
                    className="img-sm rounded-circle border"
                  />
                </div>

                {okMsg && (
                  <div className="alert alert-success">
                    <h5>{okMsg.okMsg}</h5>
                  </div>
                )}
                {errMsg && (
                  <div className="alert alert-danger">
                    <h5>{errMsg.errMsg}</h5>
                  </div>
                )}

                <div className="form-row">
                  <div className="col form-group">
                    <label>Codice Fidelity *</label>
                    <Field type="text" name="codfid" className="form-control" />
                    <ErrorMessage
                      name="codfid"
                      component="span"
                      className="errmsg"
                    />
                  </div>
                  <div className="col form-group">
                    <label>Nominativo (Nome Cognome) *</label>
                    <Field
                      type="text"
                      name="nominativo"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="nominativo"
                      component="span"
                      className="errmsg"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col form-group">
                    <label>indirizzo *</label>
                    <Field
                      type="text"
                      name="indirizzo"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="indirizzo"
                      component="span"
                      className="errmsg"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col form-group">
                    <label>Comune *</label>
                    <Field type="text" name="comune" className="form-control" />
                    <ErrorMessage
                      name="comune"
                      component="span"
                      className="errmsg"
                    />
                  </div>
                  <div className="col form-group">
                    <label>Cap</label>
                    <Field type="text" name="cap" className="form-control" />
                  </div>
                  <div className="col form-group">
                    <label>Provincia</label>
                    <Field as="select" name="prov" className="form-control">
                      <option value="">Seleziona...</option>
                      <option value="SS">Sassari</option>
                      <option value="CS">Cagliari</option>
                      <option value="NU">Nuoro</option>
                      <option value="OT">Olbia</option>
                      <option value="OR">Oristano</option>
                    </Field>
                  </div>
                </div>

                <div className="form-row">
                  <div className="col form-group">
                    <label>Telefono *</label>
                    <Field
                      type="text"
                      name="telefono"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="telefono"
                      component="span"
                      className="errmsg"
                    />
                  </div>
                  <div className="col form-group">
                    <label>Mail</label>
                    <Field type="text" name="mail" className="form-control" />
                  </div>
                </div>

                <div className="form-row">
                  <label className="custom-control custom-checkbox">
                    <Field
                      type="checkbox"
                      name="attivo"
                      className="custom-control-input"
                    />
                    <div className="custom-control-label">Attivo</div>
                  </label>
                </div>

                <div>
                  <button type="submit" className="btn btn-primary inscli">
                    Salva
                  </button>
                  <button
                    type="button"
                    onClick={annulla}
                    className="btn btn btn-warning inscli"
                  >
                    Annulla
                  </button>
                </div>
                <hr />
                <p className="text-muted">
                  Confermando l'inserimento dei dati si accettano le politiche
                  di privacy
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default DatiClienteComponent;
