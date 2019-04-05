import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import Helpers from "../../Helpers/Helper";

import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: this.props.initialSearchText,
      sortby: this.props.initialSortBy
    };
  }

  FilterTextChanged(newValue) {
    var params = Helpers.queryStringToParams(this.props.location.search);
    delete params["filtertext"];
    if (newValue && newValue !== "") {
      params["filtertext"] = newValue;
    }

    this.setState({ filterText: newValue });
    this.props.history.push(Helpers.paramsToQueryString(params));
  }

  SortbyChanged(newValue) {
    var params = Helpers.queryStringToParams(this.props.location.search);
    delete params["sortby"];
    if (newValue === "atoz") {
      params["sortby"] = newValue;
    }
    this.setState({ sortby: newValue });
    this.props.history.push(Helpers.paramsToQueryString(params));
  }

  render() {
    const dropdownStyles = () => {
      return {
        root: {
          marginTop: "10px",
          marginBottom: "5px",
          color: "red",
          display: "flex"
        },
        label: {
          display: "inline-block",
          marginRight: "10px"
        },
        Dropdown: {
          width: 120
        }
      };
    };
    return (
      <div className="searchbarContainer">
        <h3>Azure serverless community library</h3>
        <div>
          <SearchBox
            placeholder="Search"
            value={this.state.filterText}
            onSearch={newValue => this.FilterTextChanged(newValue)}
          />
        </div>
        <div className="sortbybox">
          <Dropdown
            defaultSelectedKey={this.state.sortby}
            options={[
              { key: "totaldownloads", text: "Most downloads" },
              { key: "atoz", text: "A to Z" }
            ]}
            label="Sort By"
            styles={dropdownStyles}
            onChange={(ev, item) => this.SortbyChanged(item.key)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const SearchBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);

export default withRouter(SearchBarContainer);
