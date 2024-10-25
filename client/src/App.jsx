import { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

const httpLink = createHttpLink({
  uri: "/graphql",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app-container">
        <Nav />
        <Header />
        <div className="main-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}


export default App;
