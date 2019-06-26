import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { GET_ISSUES_QUERY } from "./IssueList";

const DELETE_ISSUE_MUTATION = gql`
  mutation DELETE_ISSUE_MUTATION($id: ID!) {
    deleteIssue(id: $id) {
      id
    }
  }
`;

const DeleteIssue = props => {
  return (
    <Mutation
      mutation={DELETE_ISSUE_MUTATION}
      variables={{ id: props.id }}
      refetchQueries={[{ query: GET_ISSUES_QUERY }]}
    >
      {(deleteIssue, { error }) => {
        if (error) return <div>{error}</div>;
        return (
          <button className="btn__primary" onClick={deleteIssue}>
            DELETE
          </button>
        );
      }}
    </Mutation>
  );
};

export default DeleteIssue;
