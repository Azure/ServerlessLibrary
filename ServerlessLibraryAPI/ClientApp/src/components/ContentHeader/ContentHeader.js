import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  SearchBox,
  Dropdown,
  Icon,
  Link as FabricLink
} from "office-ui-fabric-react";
import { Link } from "react-router-dom";
import {
  paramsToQueryString,
  queryStringToParams,
  trackEvent
} from "../../helpers";
import { registerIcons } from "office-ui-fabric-react";
import { ReactComponent as ContributionSvg } from "../../assets/contribution.svg";
import "./ContentHeader.css";

registerIcons({
  icons: {
    "contribution-svg": <ContributionSvg className="svg" />
  }
});

class ContentHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: this.props.initialSearchText,
      sortby: this.props.initialSortBy
    };
  }

  filterTextChanged(newValue) {
    var params = queryStringToParams(this.props.location.search);
    delete params["filtertext"];
    if (newValue && newValue !== "") {
      params["filtertext"] = newValue;
    }

    this.setState({ filterText: newValue });
    this.props.history.push(paramsToQueryString(params));
    trackEvent("/filter/change/searchtext", newValue);
  }

  sortbyChanged(newValue) {
    var params = queryStringToParams(this.props.location.search);
    delete params["sortby"];
    if (newValue === "atoz") {
      params["sortby"] = newValue;
    }
    this.setState({ sortby: newValue });
    this.props.history.push(paramsToQueryString(params));
    trackEvent("/sortby/change", newValue);
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
            <FabricLink
              as={Link}
              to="/contribute"
              className="content-header-contributionLink"
            >
              <div className="contributionLink-content">
                <Icon iconName="contribution-svg" />
                <div className="contribution-link-text">Contributions</div>
              </div>
            </FabricLink>
          </div>
        </div>
        <SearchBox
          placeholder="Search"
          value={this.state.filterText}
          onSearch={newValue => this.filterTextChanged(newValue)}
          onClear={() => this.filterTextChanged("")}
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
              onChange={(ev, item) => this.sortbyChanged(item.key)}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const ContentHeaderContainer = connect(mapStateToProps)(ContentHeader);

export default withRouter(ContentHeaderContainer);
