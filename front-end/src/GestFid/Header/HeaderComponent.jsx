import "./HeaderComponent.css";
import { Link, withRouter } from "react-router-dom";
import { isLogged, getUserInfo, cleanUserInfo } from "../services/authservices";

const HeaderComponent = () => {
  return (
    <div className="HeaderComponent">
      <header className="section-header">
        <section className="header-main border-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-sm-4 col-5">
                <Link className="brand-wrap" to="welcome">
                  <img src="../logo.svg" className="logo" />
                </Link>
              </div>

              <Search />
              <User />
            </div>
          </div>
        </section>
      </header>
      <nav className="navbar navbar-main navbar-expand-lg border-bottom">
        <Menu />
      </nav>
    </div>
  );
};

const Search = () => {
  return (
    <div className="col-lg-4 col-xl-5 col-sm-8 col-md-4 d-none d-md-block">
      <form action="#" className="search">
        <div className="input-group w-100">
          <input
            type="text"
            className="form-control"
            style={{ width: "55%" }}
            placeholder="Cerca"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const Menu = () => {
  return (
    <div className="container" style={{ width: "55%" }}>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#main_nav3"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="main_nav3">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="#" className="nav-link pl-0">
              <strong> All category</strong>
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/clienti">
              Clienti
            </Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Premi
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Statistiche
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Altro
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const User = () => {
  return (
    <div className="col-lg-5 col-xl-4 co-sm-8 col-md-4 col-7">
      <div className="d-flex justify-content-end">
        <a href="#" className="widget-header mr-3">
          <div className="icon">
            <i className="icon-sm rounded-circle border fa fa-shopping-cart"></i>
            <span className="notify">0</span>
          </div>
        </a>
        <Link className="widget-header mr-3" to="/login">
          <div className="icon icon-sm rounded-circle border">
            <i className="fa fa-user"></i>
          </div>
        </Link>
        <UserInfo />
      </div>
    </div>
  );
};

const UserInfo = () => {
  if (isLogged()) {
    return (
      <div className="text">
        <span className="text-muted">Benvenuto {getUserInfo()}</span>
        <div>
          {/* questo onClick l'ho inserito io non è previsto dal video*/}
          <Link to="/logout" onClick={cleanUserInfo}>
            Logout
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <Link className="widget-header mr-3" to="/registra">
        <div className="icon icon-sm rounded-circle border">
          <i className="fa fa-users"></i>
        </div>
      </Link>
    );
  }
};

export default withRouter(HeaderComponent);
