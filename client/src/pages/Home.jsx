import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>
        Welcome to Handy Helpers, where there is no task too big and no job too
        small!
      </h1>
      <div>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
