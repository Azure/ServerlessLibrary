import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Checkbox } from "office-ui-fabric-react/lib/index";
import { paramsToQueryString, queryStringToParams } from "../../helpers";
import "./SideBar.css";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: this.props.initialFilters
    };
  }

  isChecked(category, item) {
    return this.state.filters[category].includes(item);
  }

  checkboxclicked(ev, checked, category, item) {
    var currentFilters = this.state.filters;
    var categoryArray = currentFilters[category];
    if (!checked) {
      categoryArray = categoryArray.filter(i => i !== item);
    } else {
      categoryArray.push(item);
    }

    currentFilters[category] = categoryArray;
    this.setState({ filters: currentFilters }, () => this.ChangeUrl());
  }

  ChangeUrl() {
    var params = queryStringToParams(this.props.location.search);
    delete params["type"];
    delete params["language"];
    if (this.state.filters.types.length > 0) {
      params["type"] = this.state.filters.types.join();
    }
    if (this.state.filters.languages.length > 0) {
      params["language"] = this.state.filters.languages.join();
    }

    this.props.history.push(paramsToQueryString(params));
  }

  render() {
    const checkboxStyles = () => {
      return {
        root: {
          marginTop: "10px",
          marginBottom: "5px",
          color: "red"
        }
      };
    };
    return (
      <div>
        <h3 className="filterHeader">Filter by </h3>
        <div>
          <fieldset className="filterset">
            <summary>Type</summary>
            <div className="filterList">
              <Checkbox
                styles={checkboxStyles}
                label="Function app"
                defaultChecked={this.isChecked("types", "functionapp")}
                onChange={(ev, checked) =>
                  this.checkboxclicked(ev, checked, "types", "functionapp")
                }
              />
              <Checkbox
                label="Logic app"
                defaultChecked={this.isChecked("types", "logicapp")}
                onChange={(ev, checked) =>
                  this.checkboxclicked(ev, checked, "types", "logicapp")
                }
              />
            </div>
          </fieldset>
        </div>
        <div>
          <fieldset className="filterset">
            <summary>Language</summary>
            <div className="filterList">
              <Checkbox
                styles={checkboxStyles}
                label="C#"
                defaultChecked={this.isChecked("languages", "csharp")}
                onChange={(ev, checked) =>
                  this.checkboxclicked(ev, checked, "languages", "csharp")
                }
              />
              <Checkbox
                label="Javascript"
                defaultChecked={this.isChecked("languages", "javascript")}
                onChange={(ev, checked) =>
                  this.checkboxclicked(ev, checked, "languages", "javascript")
                }
              />
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

const SideBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);

export default withRouter(SideBarContainer);
