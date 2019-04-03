import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import SideBarContainer from '../../components/sidebar/SideBar'
import SearchBarContainer from '../../components/SearchBar/SearchBar'
import ItemList from '../../components/ItemList/ItemList'
import './Main.css';
import { samplesReceived } from '../../actions/FilterChangeActions'
import { connect } from 'react-redux';

class Main extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            initialFilters:this.getFiltersFromQueryParams(),
        }

        this.filterSamples=this.filterSamples.bind(this);
        this.getFiltersFromQueryParams = this.getFiltersFromQueryParams.bind(this);
        
    }
    getLocalFilteredSamples() {
        var currentfilters = this.getFiltersFromQueryParams();
        return this.filterSamples(this.props.samples,
            currentfilters
        )
    }

    filterSamples(samples, currentfilters) {
        var filter = new RegExp(currentfilters.filtertext, 'i');
        samples = samples.filter(el =>
            el.title.match(filter)
            || el.description.match(filter)
            || el.authortype.match(filter)
            || el.language.match(filter)
            || el.type.match(filter)
            || el.repository.replace('https://github.com/', '').match(filter)
            || (el.runtimeversion && el.runtimeversion.match(filter))
            || (el.tags && el.tags.some(x => x.match(filter)))
        )

        if (currentfilters.categories.types.length > 0) {
            samples = samples.filter(s => currentfilters.categories.types.includes(s.type));
        }

        if (currentfilters.categories.languages.length > 0) {
            samples = samples.filter(s => currentfilters.categories.languages.includes(s.language));
        }

        return this.Sort(samples, currentfilters.sortby);
    }


    Sort(list, sortby) {
        list = list.map(a => a);
        if (sortby === "totaldownloads") {
            list = list.sort(function (a, b) {
                return b.totaldownloads - a.totaldownloads;
            }
            );
        }
        else {
            list = list.sort(function (a, b) {
                var titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase()
                if (titleA < titleB) //sort string ascending
                    return -1
                if (titleA > titleB)
                    return 1
                return 0 //default return value (no sorting)
            }
            );
        }

        return list;
    }

    getFiltersFromQueryParams()
    {
        var queryString = this.props.location.search.substring(1);
        var filter={
            categories:{
                types:[],
                languages:[]
            },
            filtertext:'',
            sortby:'totaldownloads'
        }
        
        var params = this.queryStringToJSON(queryString);
       if (params.type && params.type.length>0)
       {
           filter.categories.types= params.type.split(',');
       }

       if (params.language && params.language.length>0)
       {
           filter.categories.languages= params.language.split(',');
       }

       if (params.filtertext && params.filtertext.length>0)
       {
           filter.filtertext= params.filtertext;
       }
       if (params.sortby && params.sortby.length>0)
       {
           filter.sortby= params.sortby;
       }

        return filter;
    }

    queryStringToJSON(queryString) {
        if(queryString.indexOf('?') > -1){
          queryString = queryString.split('?')[1];
        }
        var pairs = queryString.split('&');
        var result = {};
        pairs.forEach(function(pair) {
          pair = pair.split('=');
          result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return result;
      }



    render() {
        return (
            <div className="mainContainer">
                <div className="sidebar" >
                    <SideBarContainer initialFilters={this.state.initialFilters.categories} />
                </div>
                <div className="main">
                <button type="button" onClick={()=>this.props.history.push("/test")}>Click Me!</button> 
                    <SearchBarContainer initialSearchText={this.state.initialFilters.filtertext} initialSortBy={this.state.initialFilters.sortby} />
                    <ItemList filteredSamples={this.getLocalFilteredSamples()} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    samples: state.samples,
    filteredSamples: state.filteredSamples,
});

const mapDispatchToProps = {
    samplesReceived
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Main));

export default MainContainer;


