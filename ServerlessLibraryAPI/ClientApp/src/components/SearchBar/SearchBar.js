import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { FilterTextChanged, SortbyChanged } from '../../actions/FilterChangeActions'

import './SearchBar.css';

class SearchBar extends Component {
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
                        value={this.props.filterText}
                        onSearch={newValue => this.props.FilterTextChanged(newValue)}
                    />
                </div>
                <div className="sortbybox">
                    <Dropdown
                        defaultSelectedKey="totaldownloads"
                        options={[
                            { key: 'totaldownloads', text: 'Most downloads' },

                            { key: 'atoz', text: 'A to Z' },

                        ]}
                        label="Sort By"
                        styles={dropdownStyles}
                        onChange={(ev, item) => this.props.SortbyChanged(item.key)} 
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

export default SearchBarContainer;

