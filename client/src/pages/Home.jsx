import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero" style={{ backgroundColor: "#4a90e2" }}>
        <div className="hero-body">
          <div className="container has-text-centered">
            <Link to="/">
              <figure className="image is-128x128">
                <img
                  src="/images/HHLogo.png"
                  alt="Handy Helpers Logo"
                  className="logo"
                />
              </figure>
            </Link>
            <h1 className="title is-size-2 has-text-weight-bold mt-4">
              Handy Helpers
            </h1>
            <p className="subtitle is-size-5 mb-5">
              Your go-to solution for every task, big or small!
            </p>
            <div className="buttons is-centered">
              <Link to="/signup">
                <button
                  className="button is-primary is-rounded is-large mr-3"
                  style={{
                    backgroundColor: "#8ab5db",
                    borderColor: "#8ab5db",
                    color: "white",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#333")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#8ab5db")
                  }
                >
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button
                  className="button is-link is-rounded is-large"
                  style={{
                    backgroundColor: "#8ab5db",
                    borderColor: "#8ab5db",
                    color: "white",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = "#333")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = "#8ab5db")
                  }
                >
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
