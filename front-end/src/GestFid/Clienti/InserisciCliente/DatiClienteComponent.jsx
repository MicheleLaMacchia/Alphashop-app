import { Form, Formik } from "formik";

const DatiClienteComponent = (props) => {
  return (
    <section className="container">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">Dati cliente fidelity</h3>
          <Formik>
            {(props) => (
              <Form>
                <div className="form-group">
                  <img
                    src={`../user.png`}
                    alt="imgclt"
                    className="img-sm rounded-circle border"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default DatiClienteComponent;
