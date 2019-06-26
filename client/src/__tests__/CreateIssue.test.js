import React from "react";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";
import CreateIssueComponent from "../components/CreateIssue";
import { MockedProvider } from "react-apollo/test-utils";
import { BrowserRouter } from "react-router-dom";

const fakeIssue = {
  id: "123qwe",
  title: "Title for a Fake Issue",
  description: "Description for a Fake Issue",
  status: "OPEN"
};

describe("<CreateIssue />", () => {
  it("renders and matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider>
        <BrowserRouter>
          <CreateIssueComponent />
        </BrowserRouter>
      </MockedProvider>
    );
    const form = wrapper.find(".form");
    expect(toJSON(form)).toMatchSnapshot();
    // console.log(wrapper.debug());
  });
  it("handles state updates", async () => {
    const wrapper = mount(
      <MockedProvider>
        <BrowserRouter>
          <CreateIssueComponent />
        </BrowserRouter>
      </MockedProvider>
    );
    wrapper.find("#title").simulate("change", {
      target: { value: "Title Testing", name: "title" }
    });

    wrapper.find("#description").simulate("change", {
      target: { value: "Description Testing", name: "description" }
    });

    // Error returns ReactWrapper empty {} - Cannot read property 'formData' of null
    // expect(wrapper.find("CreateIssue").instance().formData..toMatchObject({...})
  });
});
