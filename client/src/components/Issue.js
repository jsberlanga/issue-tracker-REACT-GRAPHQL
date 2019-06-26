import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Link } from "react-router-dom";

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

const Issue = props => {
  console.log(props);
  return (
    <Query query={SINGLE_ISSUE_QUERY} variables={{ id: props.issue.id }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;
        return (
          <>
            <h3>{props.issue.title}</h3>
            <p>{props.issue.description}</p>
            <p>{props.issue.status}</p>
            <p>Created {timeDifferenceForDate(props.issue.createdAt)}</p>
            <Link
              to={{
                pathname: `/issues/${props.issue.id}`,
                state: { status: props.issue.status }
              }}
            >
              <button>UPDATE</button>
            </Link>
          </>
        );
      }}
    </Query>
  );
};

export default Issue;
export { SINGLE_ISSUE_QUERY };
