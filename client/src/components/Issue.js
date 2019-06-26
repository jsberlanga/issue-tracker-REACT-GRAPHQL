import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { timeDifferenceForDate } from "../utils";

const SINGLE_ISSUE_QUERY = gql`
  query SINGLE_ISSUE_QUERY($id: ID!) {
    getIssue(id: $id) {
      id
      title
      description
      status
      createdAt
    }
  }
`;

const Issue = ({ issue }) => {
  return (
    <Query query={SINGLE_ISSUE_QUERY} variables={{ id: issue.id }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;
        return (
          <>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>Created {timeDifferenceForDate(issue.createdAt)}</p>
          </>
        );
      }}
    </Query>
  );
};

export default Issue;
