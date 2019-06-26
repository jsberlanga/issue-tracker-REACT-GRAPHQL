import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import { Link } from "react-router-dom";

import DeleteIssue from "./DeleteIssue";
import { timeDifferenceForDate } from "../utils";

const StyledIssue = styled.div`
  box-shadow: 1px 1px 14px -7px var(--grey);
  padding: 2rem;
  position: relative;
  min-height: 35rem;

  button {
    margin: 1rem;
  }

  .issue--title {
    font-size: 3rem;
    background: var(--grey);
    color: #fff;
    margin-bottom: 2rem;
  }

  .issue--createdAt {
    position: absolute;
    font-style: italic;
    font-size: 1.7rem;
    bottom: 1rem;
    right: 2rem;
  }
`;

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
  return (
    <Query query={SINGLE_ISSUE_QUERY} variables={{ id: props.issue.id }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Fetching...</div>;
        if (error) return <div className="error__message">{error.message}</div>;
        return (
          <StyledIssue>
            <h3 className="issue--title">Title: {props.issue.title}</h3>
            <p className="issue--description">
              Description: {props.issue.description}
            </p>
            <p className="issue--status">
              Current status: <strong>{props.issue.status}</strong>
            </p>
            <p className="issue--createdAt">
              Created {timeDifferenceForDate(props.issue.createdAt)}
            </p>
            <DeleteIssue id={props.issue.id} />
            <Link
              to={{
                pathname: `/issues/${props.issue.id}`,
                state: { status: props.issue.status }
              }}
            >
              <button className="btn__primary">UPDATE</button>
            </Link>
          </StyledIssue>
        );
      }}
    </Query>
  );
};

export default Issue;
export { SINGLE_ISSUE_QUERY };
