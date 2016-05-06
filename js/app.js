import React from "react";
import ReactDOM from "react-dom";
import Relay from "react-relay";
import ReactRouterRelay from 'react-router-relay';
import { Router, Route, browserHistory, applyRouterMiddleware } from 'react-router';
import Main from "./components/Main";
import OneNews from "./components/OneNews";

ReactDOM.render(
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(ReactRouterRelay)}
    environment={Relay.Store}
  >
    <Route
      path="/"
      component={Main}
      queries={{
        store: () => Relay.QL`query { store }`,
      }}
    />
    <Route
      path="/user/:id"
      component={OneNews}
      prepareParams={(props) => props}
      queries={{
        store: () => Relay.QL`query { store }`,
      }}
    />
  </Router>,
  document.getElementById('react')
);
