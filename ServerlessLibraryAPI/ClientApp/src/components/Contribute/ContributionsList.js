import React, { Component } from "react";
import { connect } from "react-redux";
import { Label } from "office-ui-fabric-react";
import ItemList from "../../components/ItemList/ItemList";

class ContributionsList extends Component {
  filteredSamples() {
    let { samples, user } = this.props;
    let { userName } = user || "__nouser__";
    let filter = new RegExp(userName, "i");
    samples = samples.filter(
      el => el.repository.replace("https://github.com/", "").match(filter) // this match should be against author
    );

    return samples;
  }

  render() {
    const headerLabelStyles = {
      root: {
        fontSize: "12px",
        fontWeight: "bold",
        paddingTop: "0px",
        paddingBottom: "6px"
      }
    };
    return (
      <div className="contribution-list-container">
        <Label styles={headerLabelStyles}>My samples</Label>
        <ItemList
          filteredSamples={this.filteredSamples()}
          disableHover={true}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    samples: state.samples,
    user: state.authentication.user
  };
}

const ContributionsListContainer = connect(mapStateToProps)(ContributionsList);

export default ContributionsListContainer;
