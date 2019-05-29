import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Checkbox } from "office-ui-fabric-react/lib/index";
import {
  paramsToQueryString,
  queryStringToParams,
  trackEvent
} from "../../helpers";

import * as Constants from "../shared/Constants";
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
    trackEvent(`/filter/change/${category}`, currentFilters);
  }

  ChangeUrl() {
    var params = queryStringToParams(this.props.location.search);
    delete params["technology"];
    delete params["language"];
    delete params["solutionarea"];
    if (this.state.filters.technologies.length > 0) {
      params["technology"] = this.state.filters.technologies.join();
    }
    if (this.state.filters.languages.length > 0) {
      params["language"] = this.state.filters.languages.join();
    }
    if (this.state.filters.solutionareas.length > 0) {
      params["solutionarea"] = this.state.filters.solutionareas.join();
    }

    this.props.history.push(paramsToQueryString(params));
  }

  render() {
    const checkboxStyles = index => {
      return {
        root: {
          marginTop: index === 0 ? "9px" : "0px",
          marginBottom: "5px"
        }
      };
    };

    return (
      <div className="sidebar-wrapper">
        <div className="filterby-title">Filter by</div>
        <div className="filterset">
          <span className="Filter-list-header">Technology</span>
          {Constants.technologies.map((technology, index) => (
            <Checkbox
              styles={checkboxStyles(index)}
              label={technology}
              key={technology}
              defaultChecked={this.isChecked("technologies", technology)}
              onChange={(ev, checked) =>
                this.checkboxclicked(ev, checked, "technologies", technology)
              }
            />
          ))}
        </div>

        <div className="filterset">
          <span className="Filter-list-header">Language</span>
          {Constants.languages.map((language, index) => (
            <Checkbox
              styles={checkboxStyles(index)}
              label={language}
              key={language}
              defaultChecked={this.isChecked("languages", language)}
              onChange={(ev, checked) =>
                this.checkboxclicked(ev, checked, "languages", language)
              }
            />
          ))}
        </div>

        <div className="filterset">
          <span className="Filter-list-header">Solution Area</span>
          {Constants.solutionAreas.map((solutionarea, index) => (
            <Checkbox
              styles={checkboxStyles(index)}
              label={solutionarea}
              key={solutionarea}
              defaultChecked={this.isChecked("solutionareas", solutionarea)}
              onChange={(ev, checked) =>
                this.checkboxclicked(ev, checked, "solutionareas", solutionarea)
              }
            />
          ))}
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
