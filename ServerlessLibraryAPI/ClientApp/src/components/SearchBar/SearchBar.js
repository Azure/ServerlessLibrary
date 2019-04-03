import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { FilterTextChanged, SortbyChanged } from '../../actions/FilterChangeActions'

import './SearchBar.css';

class SearchBar extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            initialSearchText:this.props.initialSearchText,
            initialSortKey:this.props.initialSortKey
        }
    }

    FilterTextChanged(newValue){
        console.log(newValue);
        var queryString = this.props.location.search.substring(1);
        var params = this.queryStringToJSON(queryString);
        delete params["filtertext"];
        if (newValue && newValue!=="")
        {
            params["filtertext"] = newValue;
        }

        this.setState({initialSearchText:newValue});
        queryString = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        }).join('&');
        this.props.history.push("?" +queryString);
    }

    SortbyChanged(newValue){
        var queryString = this.props.location.search.substring(1);
        var params = this.queryStringToJSON(queryString);
        delete params["sortby"];
        if (newValue==="atoz")
        {
            params["sortby"] = newValue;
        }
        queryString = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        }).join('&');
        this.props.history.push("?" +queryString);
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
        const dropdownStyles = () => {
            return {
                root: {
                    marginTop: '10px',
                    marginBottom: '5px',
                    color: 'red',
                    display: 'flex'
                },
                label: {
                    display: 'inline-block',
                    marginRight: '10px'
                }
            };
        };
        return (
            <div className="searchbarContainer">
                <h3>Azure serverless community library</h3>
                <div>
                    <SearchBox
                        placeholder="Search"
                        value={this.state.initialSearchText}
                        onSearch={newValue => this.FilterTextChanged(newValue)}
                    />
                </div>
                <div className="sortbybox">
                    <Dropdown
                        defaultSelectedKey={this.state.initialSortKey}
                        options={[
                            { key: 'totaldownloads', text: 'Most downloads' },

                            { key: 'atoz', text: 'A to Z' },

                        ]}
                        label="Sort By"
                        styles={dropdownStyles}
                        onChange={(ev, item) => this.SortbyChanged(item.key)} 
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    filterText: state.filterText,
});

const mapDispatchToProps = {
    FilterTextChanged,
    SortbyChanged
};

const SearchBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);

export default withRouter(SearchBarContainer);

