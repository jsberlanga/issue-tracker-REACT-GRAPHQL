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

import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  :root {
    --main-light: #f2f6f5;
    --main-dark: #303D4B;
    --grey: #7A8795;
    --green: #93b5b3
  }
  *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box
  }
  html {
    font-size: 10px;
  }
  body {
    font-family: 'Roboto', sans-serif;
    line-height: 1.7;
    font-size: 1.8rem;
    background: var(--main-light);
    color: var(--main-dark);
  }
  a {
    text-decoration: none;
    color: var(--main-dark);
  }
  li {
    list-style-type: none;
  }
`;

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
        <GlobalStyle />
        <IssueTrackerApp />
      </StyledPage>
    </ApolloProvider>
  </BrowserRouter>,

  document.getElementById("root")
);

serviceWorker.unregister();
