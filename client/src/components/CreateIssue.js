import React, { useState } from "react";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import { statusOptions } from "../lib/statusOptions";

const CREATE_ISSUE_MUTATION = gql`
  mutation CREATE_ISSUE_MUTATION($title: String!, $description: String!) {
    createIssue(title: $title, description: $description) {
      id
      title
      description
      status
      createdAt
    }
  }
`;

const CreateIssue = props => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: ""
  });
  const [error, setError] = useState("");

  const { title, description, status } = formData;

  const handleChange = e => {
    setError("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e, createIssue) => {
    e.preventDefault();

    if (!title.length || !description.length || !status) {
      return setError("Please fill out the form");
    }

    await createIssue();

    props.history.push("/issues");
  };

  return (
    <div>
      <div className="error__message">{error}</div>
      <Mutation
        mutation={CREATE_ISSUE_MUTATION}
        variables={{ title, description, status }}
      >
        {(createIssue, { loading, error }) => {
          if (loading) return <div>Fetching</div>;
          if (error)
            return <div className="error__message">{error.message}</div>;
          return (
            <div>
              <h1>CREATE A NEW ISSUE</h1>
              <form
                className="form form__create"
                onSubmit={e => handleSubmit(e, createIssue)}
              >
                <label htmlFor="Title">
                  Title
                  <input
                    value={title}
                    onChange={handleChange}
                    type="text"
                    name="title"
                    placeholder="Enter a title for the issue"
                  />
                </label>
                <label htmlFor="Description">
                  Description
                  <textarea
                    value={description}
                    onChange={handleChange}
                    type="text"
                    name="description"
                    placeholder="Enter a description"
                  />
                </label>
                <label htmlFor="Status">
                  Status
                  <select name="status" onChange={handleChange}>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <button className="btn__primary">Create</button>
              </form>
            </div>
          );
        }}
      </Mutation>
    </div>
  );
};

export default CreateIssue;
