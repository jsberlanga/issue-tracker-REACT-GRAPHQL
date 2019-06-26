import React from "react";
import { Route, Switch } from "react-router-dom";

import IssueList from "./IssueList";
import CreateIssue from "./CreateIssue";
import UpdateIssue from "./UpdateIssue";
import Navbar from "./global/Navbar";

const IssueTrackerApp = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/create" component={CreateIssue} />
        <Route exact path="/issues" component={IssueList} />
        <Route exact path="/issues/:id" component={UpdateIssue} />
      </Switch>
    </div>
  );
};

export default IssueTrackerApp;
