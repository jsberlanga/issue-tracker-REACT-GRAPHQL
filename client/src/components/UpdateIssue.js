import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import { SINGLE_ISSUE_QUERY } from "./Issue";
import { selectStatus } from "../lib/statusOptions";

const UPDATE_ISSUE_MUTATION = gql`
  mutation UPDATE_ISSUE_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $status: Status
  ) {
    updateIssue(
      id: $id
      title: $title
      description: $description
      status: $status
    ) {
      id
      title
      description
      status
    }
  }
`;

const UpdateIssue = props => {
  const currentStatus = props.location.state.status;

  const [state, setState] = useState({});
  const [error, setError] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value
    });
  };

  const handleUpdate = async (e, updateIssue) => {
    setError("");
    e.preventDefault();

    if (currentStatus === "COMPLETED") {
      return setError(
        `The ticket is already ${currentStatus}. You cannot change it.`
      );
    }

    if (currentStatus !== "OPEN" && state.status === "OPEN") {
      return setError(
        `The ticket is ${currentStatus}. You cannot change the status back to OPEN.`
      );
    }

    if (
      state.status !== "OPEN" &&
      state.status !== "PENDING" &&
      state.status !== "COMPLETED"
    ) {
      return setError(`Oops. That is an invalid status.`);
    }

    await updateIssue({
      variables: {
        id: props.match.params.id,
        ...state
      }
    });

    props.history.push("/issues");
  };

  return (
    <div>
      <div className="error__message">{error}</div>
      <Query
        query={SINGLE_ISSUE_QUERY}
        variables={{ id: props.match.params.id }}
      >
        {({ error, loading, data: { getIssue } }) => {
          if (loading) return <div>Fetching</div>;
          if (error)
            return <div className="error__message">{error.message}</div>;

          return (
            <Mutation
              mutation={UPDATE_ISSUE_MUTATION}
              variables={{ id: props.match.params.id }}
            >
              {(updateIssue, { loading, error }) => {
                if (loading) return <div>Fetching</div>;
                if (error)
                  return <div className="error__message">{error.message}</div>;
                return (
                  <div>
                    <h1>UPDATING ISSUE "{getIssue.title}"</h1>
                    <form
                      className="form form__update"
                      onSubmit={e => handleUpdate(e, updateIssue, getIssue)}
                    >
                      <label htmlFor="title">
                        Title
                        <input
                          type="text"
                          id="title"
                          name="title"
                          placeholder="Title"
                          required
                          onChange={handleChange}
                          defaultValue={getIssue.title}
                        />
                      </label>
                      <label htmlFor="description">
                        Description
                        <textarea
                          id="description"
                          name="description"
                          placeholder="Enter A Description"
                          required
                          onChange={handleChange}
                          defaultValue={getIssue.description}
                        />
                      </label>
                      <label htmlFor="Status">
                        The current status is {getIssue.status.toLowerCase()}
                        <select name="status" onChange={handleChange}>
                          {selectStatus.map(status => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button className="btn__primary" type="submit">
                        Save Changes
                      </button>
                    </form>
                  </div>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
      <Link to="/issues">Go back to the issues page</Link>
    </div>
  );
};

export default UpdateIssue;
