import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import Issue from "./Issue";

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
`;

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
    <StyledList>
      <Query query={GET_ISSUES_QUERY} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching...</div>;
          if (error)
            return <div className="error__message">{error.message}</div>;

          return data.getIssues.map(issue => (
            <Issue key={issue.id} issue={issue} />
          ));
        }}
      </Query>
    </StyledList>
  );
};

export default IssueList;
export { GET_ISSUES_QUERY };
