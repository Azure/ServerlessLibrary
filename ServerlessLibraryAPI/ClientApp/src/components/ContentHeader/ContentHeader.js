import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SearchBox, Dropdown, Icon } from "office-ui-fabric-react/lib/index";
import { Link } from "react-router-dom";
import Helpers from "../../Helpers/Helper";

import "./ContentHeader.css";

class ContentHeader extends Component {
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
          display: "flex"
        },
        label: {
          marginRight: "10px",
          color: "#000000",
          fontSize: "12px"
        },
        title: {
          color: "#595959;",
          border: "1px solid #BCBCBC",
          borderRadius: "2px",
          fontSize: "12px"
        },
        dropdown: {
          width: 150
        }
      };
    };

    const searchBoxStyles = () => {
      return {
        root: {
          border: "1px solid #BCBCBC",
          borderRadius: "3px"
        }
      };
    };
    return (
      <div className="content-header">
        <div className="content-header-titlewapper">
          <div className="content-header-title">
            Azure serverless community library
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Link
              className="titlelink"
              style={{ color: "#000000", fontSize: "12px" }}
              to="/sample/Blob: Image Resize"
            >
              <div style={{ display: "flex" }}>
                <Icon iconName="FabricFolder" style={{ fontSize: "16px" }} />
                <div style={{ marginLeft: "10px" }}>Contributions</div>
              </div>
            </Link>
          </div>
        </div>
        <SearchBox
          placeholder="Search"
          value={this.state.filterText}
          onSearch={newValue => this.FilterTextChanged(newValue)}
          styles={searchBoxStyles}
        />
        <div className="content-header-sortbywrappper">
          <div className="content-header-count">
            Displaying {this.props.samples.length} results.
          </div>
          <div style={{ marginLeft: "auto" }}>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const ContentHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentHeader);

export default withRouter(ContentHeaderContainer);
