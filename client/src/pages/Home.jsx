import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="box">
      <h1 className="title">
        Welcome to Handy Helpers, where there is no task too big and no job too
        small!
      </h1>
      <div>
        <Link to="/signup">
          <button className="button">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
