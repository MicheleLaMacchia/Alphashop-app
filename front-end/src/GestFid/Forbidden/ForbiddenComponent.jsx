import { Link } from "react-router-dom";

const ForbiddenComponent = () => {
  return (
    <div className="ForbComponent">
      <body className="bg-dark text-white py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-2 text-center">
              <p>
                <i className="fa fa-exclamation-triangle fa-5x"></i>
                <br />
                Status Code: 403
              </p>
            </div>
            <div className="col-md-10">
              <h3>OPS!! Spiaze...</h3>
              <p>
                Non hai i provilegi necessari per accedere a questa parte
                dell'app <br /> Per procedere clicca qui{" "}
                <Link className="btn btn-danger" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default ForbiddenComponent;
