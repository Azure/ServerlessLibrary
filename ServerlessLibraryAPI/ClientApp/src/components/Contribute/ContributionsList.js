import React, { Component } from "react";
import { connect } from "react-redux";
import ItemList from "../../components/ItemList/ItemList";

class ContributionsList extends Component {
  filteredSamples() {
    let { samples, user } = this.props;
    let { userName } = user || "__nouser__";
    let filter = new RegExp(userName, "i");
    samples = samples.filter(
      el => el.repository.replace("https://github.com/", "").match(filter) // this match should be against author
    );

    samples = samples.sort(function(a, b) {
      var titleA = a.title.toLowerCase(),
        titleB = b.title.toLowerCase();
      if (titleA < titleB)
        //sort string ascending
        return -1;
      if (titleA > titleB) return 1;
      return 0; //default return value (no sorting)
    });

    return samples;
  }

  render() {
    return (
      <div>
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
