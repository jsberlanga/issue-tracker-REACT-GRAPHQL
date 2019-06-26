import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import IssueTrackerApp from "./components/IssueTrackerApp";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import styled from "styled-components";

const StyledPage = styled.div`
  position: relative;
  min-height: 100vh;
  max-width: 80vw;
  margin: 0 auto;
`;

const httpLink = createHttpLink({
  uri: "http://localhost:4000"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <StyledPage>
        <IssueTrackerApp />
      </StyledPage>
    </ApolloProvider>
  </BrowserRouter>,

  document.getElementById("root")
);

serviceWorker.unregister();
