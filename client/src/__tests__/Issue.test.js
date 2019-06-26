import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import IssueComponent, { SINGLE_ISSUE_QUERY } from "../components/Issue";
import { MockedProvider } from "react-apollo/test-utils";
import { BrowserRouter } from "react-router-dom";

const fakeIssue = {
  id: "123qwe",
  title: "Title for a Fake Issue",
  description: "Description for a Fake Issue",
  status: "OPEN"
};

describe("<Issue />", () => {
  it("renders and displays", () => {
    const wrapper = shallow(<IssueComponent issue={fakeIssue} />);
  });
});

describe("<Issue />", () => {
  it("renders with data", async () => {
    const mocks = [
      {
        request: { query: SINGLE_ISSUE_QUERY, variables: { id: "123qwe" } },
        result: {
          data: {
            issue: fakeIssue
          }
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <BrowserRouter>
          <IssueComponent issue={fakeIssue} />
        </BrowserRouter>
      </MockedProvider>
    );
    // console.log(wrapper.debug());
    expect(wrapper.text()).toContain("Fetching...");
    await wait();
    wrapper.update();
    // console.log(wrapper.debug());
    expect(toJSON(wrapper.find("h3"))).toMatchSnapshot();
    expect(toJSON(wrapper.find("p"))).toMatchSnapshot();
    expect(toJSON(wrapper.find("button"))).toMatchSnapshot();
  });
});
