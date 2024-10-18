import { useRouteError } from "react-router-dom";
import "../../src/App.css"; 

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="error-container">
      <h1 className="error-heading">Oops!</h1>
      <p className="error-message">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <a href="/" className="error-link">
        Go back to Home
      </a>
    </div>
  );
}
