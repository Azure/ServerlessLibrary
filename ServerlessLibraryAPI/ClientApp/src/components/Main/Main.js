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
      initialFilters: this.getFiltersFromQueryParams(),
      showContentHeaderShadow: false
    };

    this.onListScrollEvent = this.onListScrollEvent.bind(this);
  }

  filteredSamples() {
    let samples = this.props.samples;
    let currentfilters = this.getFiltersFromQueryParams();
    let filter = new RegExp(currentfilters.filtertext, "i");
    samples = samples.filter(
      el =>
        el.title.match(filter) ||
        el.description.match(filter) ||
        el.language.match(filter) ||
        el.repository.replace("https://github.com/", "").match(filter) ||
        (el.tags && el.tags.some(x => x.match(filter))) ||
        (el.technologies && el.technologies.some(x => x.match(filter))) ||
        (el.solutionareas && el.solutionareas.some(x => x.match(filter))) ||
        (el.author && el.author.match(filter))
    );

    if (currentfilters.categories.technologies.length > 0) {
      samples = samples.filter(s =>
        s.technologies.some(t =>
          currentfilters.categories.technologies.includes(t)
        )
      );
    }

    if (currentfilters.categories.languages.length > 0) {
      samples = samples.filter(s =>
        currentfilters.categories.languages.includes(s.language)
      );
    }

    if (currentfilters.categories.solutionareas.length > 0) {
      samples = samples.filter(s =>
        s.solutionareas.some(a =>
          currentfilters.categories.solutionareas.includes(a)
        )
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
    } else if (sortby === "createddate") {
      list.sort(function(a, b) {
        let dateA = new Date(a.createddate),
          dateB = new Date(b.createddate);
        return dateB - dateA;
      });
    } else {
      list = list.sort(function(a, b) {
        let titleA = a.title.toLowerCase(),
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
        technologies: [],
        languages: [],
        solutionareas: []
      },
      filtertext: "",
      sortby: "totaldownloads"
    };

    var params = queryStringToParams(this.props.location.search);
    if (params.technology && params.technology.length > 0) {
      filter.categories.technologies = params.technology.split(",");
    }

    if (params.language && params.language.length > 0) {
      filter.categories.languages = params.language.split(",");
    }

    if (params.solutionarea && params.solutionarea.length > 0) {
      filter.categories.solutionareas = params.solutionarea.split(",");
    }
    if (params.filtertext && params.filtertext.length > 0) {
      filter.filtertext = params.filtertext;
    }
    if (params.sortby && params.sortby.length > 0) {
      filter.sortby = params.sortby;
    }

    return filter;
  }

  onListScrollEvent(e) {
    let element = e.target;
    if (element.scrollTop > 0) {
      !this.state.showContentHeaderShadow &&
        this.setState({ showContentHeaderShadow: true });
    } else {
      this.state.showContentHeaderShadow &&
        this.setState({ showContentHeaderShadow: false });
    }
  }
  render() {
    const contentheaderShadowStyle = {
      boxShadow: this.state.showContentHeaderShadow
        ? "0 4px 6px -6px #222"
        : "none"
    };

    return (
      <div id="mainContainer">
        <div id="sidebar">
          <SideBarContainer
            initialFilters={this.state.initialFilters.categories}
          />
        </div>
        <div id="content">
          <div id="contentheader" style={contentheaderShadowStyle}>
            <ContentHeaderContainer
              initialSearchText={this.state.initialFilters.filtertext}
              initialSortBy={this.state.initialFilters.sortby}
              samples={this.filteredSamples()}
            />
          </div>
          <div id="list" onScroll={this.onListScrollEvent}>
            <div className="list-container">
              <ItemList filteredSamples={this.filteredSamples()} />
            </div>
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
