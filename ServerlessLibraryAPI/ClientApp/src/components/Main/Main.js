import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SideBarContainer from "../../components/sidebar/SideBar";
import ContentHeaderContainer from "../ContentHeader/ContentHeader";
import ItemList from "../../components/ItemList/ItemList";
import "./Main.css";
import { queryStringToParams } from "../../helpers";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialFilters: this.getFiltersFromQueryParams()
    };
  }

  filteredSamples() {
    let samples = this.props.samples;
    let currentfilters = this.getFiltersFromQueryParams();
    let filter = new RegExp(currentfilters.filtertext, "i");
    samples = samples.filter(
      el =>
        el.title.match(filter) ||
        el.description.match(filter) ||
        el.authortype.match(filter) ||
        el.language.match(filter) ||
        el.type.match(filter) ||
        el.repository.replace("https://github.com/", "").match(filter) ||
        (el.runtimeversion && el.runtimeversion.match(filter)) ||
        (el.tags && el.tags.some(x => x.match(filter)))
    );

    if (currentfilters.categories.types.length > 0) {
      samples = samples.filter(s =>
        currentfilters.categories.types.includes(s.type)
      );
    }

    if (currentfilters.categories.languages.length > 0) {
      samples = samples.filter(s =>
        currentfilters.categories.languages.includes(s.language)
      );
    }

    return this.Sort(samples, currentfilters.sortby);
  }

  Sort(list, sortby) {
    list = list.map(a => a);
    if (sortby === "totaldownloads") {
      list = list.sort(function(a, b) {
        return b.totaldownloads - a.totaldownloads;
      });
    } else {
      list = list.sort(function(a, b) {
        var titleA = a.title.toLowerCase(),
          titleB = b.title.toLowerCase();
        if (titleA < titleB)
          //sort string ascending
          return -1;
        if (titleA > titleB) return 1;
        return 0; //default return value (no sorting)
      });
    }

    return list;
  }

  getFiltersFromQueryParams() {
    var filter = {
      categories: {
        types: [],
        languages: []
      },
      filtertext: "",
      sortby: "totaldownloads"
    };

    var params = queryStringToParams(this.props.location.search);
    if (params.type && params.type.length > 0) {
      filter.categories.types = params.type.split(",");
    }

    if (params.language && params.language.length > 0) {
      filter.categories.languages = params.language.split(",");
    }

    if (params.filtertext && params.filtertext.length > 0) {
      filter.filtertext = params.filtertext;
    }
    if (params.sortby && params.sortby.length > 0) {
      filter.sortby = params.sortby;
    }

    return filter;
  }
  render() {
    return (
      <div id="mainContainer">
        <div id="sidebar">
          <SideBarContainer
            initialFilters={this.state.initialFilters.categories}
          />
        </div>
        <div id="content">
          <div id="contentheader">
            <ContentHeaderContainer
              initialSearchText={this.state.initialFilters.filtertext}
              initialSortBy={this.state.initialFilters.sortby}
              samples={this.filteredSamples()}
            />
          </div>
          <div id="list">
            <ItemList filteredSamples={this.filteredSamples()} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  samples: state.samples
});

const MainContainer = connect(mapStateToProps)(withRouter(Main));

export default MainContainer;
