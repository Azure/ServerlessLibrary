import React, { Component } from "react";
import AddContribution from "./AddContribution";
import ContributionsList from "./ContributionsList";
import PageHeaderWithBackButton from "../shared/PageHeaderWithBackButton";

class Contribute extends Component {
  render() {
    return (
      <div>
        <PageHeaderWithBackButton title="Contributions">
          <p>
            This is where you can see all your existing contributions. You can
            also add a new contribution by clicking on the add new contribution
            link.
          </p>
        </PageHeaderWithBackButton>
        <AddContribution />
        <br />
        <p>My samples</p>
        <ContributionsList />
      </div>
    );
  }
}

export default Contribute;
