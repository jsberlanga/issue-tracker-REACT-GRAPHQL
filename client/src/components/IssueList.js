import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Issue from "./Issue";

const GET_ISSUES_QUERY = gql`
  query GET_ISSUES_QUERY {
    getIssues {
      id
      title
      description
      status
      createdAt
    }
  }
`;

const IssueList = props => {
  console.log(props);
  return (
    <Query query={GET_ISSUES_QUERY} fetchPolicy="cache-and-network">
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;
        console.log(data.getIssues);

        return data.getIssues.map(issue => (
          <Issue key={issue.id} issue={issue} />
        ));
      }}
    </Query>
  );
};

export default IssueList;
