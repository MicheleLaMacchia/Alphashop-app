import "./FooterComponent.css";

const FooterComponent = () => {
  return (
    <div className="FooterComponent">
      <footer className="footer text-xs-center">
        <p className="text-muted">
          <small>&copy; 2021 by Mike Inc.</small>
        </p>
        <p className="text-muted">
          <a href="#">
            <small>Termini &amp; condizioni</small>
          </a>
        </p>
        <p className="text-muted">
          <a href="#">
            <small> Chi siamo</small>
          </a>
        </p>
        <p className="text-muted">
          <a href="#">
            <small> I nostri negozi</small>
          </a>
        </p>
      </footer>
    </div>
  );
};

export default FooterComponent;
