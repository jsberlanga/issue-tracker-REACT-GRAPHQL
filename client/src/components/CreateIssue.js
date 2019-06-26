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
      <p>{error}</p>
      <Mutation
        mutation={CREATE_ISSUE_MUTATION}
        variables={{ title, description, status }}
      >
        {(createIssue, { loading, error }) => {
          if (loading) return <div>Fetching</div>;
          if (error) return <div>Error</div>;
          return (
            <>
              <h1>CREATE A NEW ISSUE</h1>
              <form onSubmit={e => handleSubmit(e, createIssue)}>
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
                  <input
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
                <button>Create</button>
              </form>
            </>
          );
        }}
      </Mutation>
    </div>
  );
};

export default CreateIssue;
