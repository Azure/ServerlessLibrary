import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Checkbox } from 'office-ui-fabric-react/lib/index';
import { FunctionAppChanged, LogicAppChanged, JavascriptChanged, CsharpChanged } from '../../actions/FilterChangeActions'

import './SideBar.css';

class SideBar extends Component {
 
    constructor(props){
        super(props);
        this.state={
          initialFilters:this.props.initialFilters
        }
    }

    isChecked(category, item)
    {
        return this.state.initialFilters[category].includes(item);
    }

    checkboxclicked(ev, checked, category, item){
        var currentFilters= this.state.initialFilters;
        var categoryArray =currentFilters[category];
        if (!checked)
        {
            categoryArray = categoryArray.filter((i) => i!==item);
        }
        else
        {
            categoryArray.push(item);
        }

        currentFilters[category]=categoryArray;

         var queryString = this.props.location.search.substring(1);
        var params = this.queryStringToJSON(queryString);

       delete params["type"];
       delete params["language"];
       if (this.state.initialFilters.types.length>0)
       {
           params["type"] = this.state.initialFilters.types.join();
       }
       if (this.state.initialFilters.languages.length>0)
       {
           params["language"] = this.state.initialFilters.languages.join();
       }

        queryString = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        }).join('&');
        
        // this.props.history.push("?" +queryString);
        this.setState({initialFilters:currentFilters}, ()=>this.ChangeUrl());
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

    ChangeUrl()
    {
        var queryString = this.props.location.search.substring(1);
        var params = this.queryStringToJSON(queryString);

       delete params["type"];
       delete params["language"];
       if (this.state.initialFilters.types.length>0)
       {
           params["type"] = this.state.initialFilters.types.join();
       }
       if (this.state.initialFilters.languages.length>0)
       {
           params["language"] = this.state.initialFilters.languages.join();
       }

        queryString = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
        }).join('&');

        this.props.history.push("?" +queryString);
    }

    render() {
        const checkboxStyles = () => {
            return {
                root: {
                    marginTop: '10px',
                    marginBottom: '5px',
                    color: 'red'
                }
            };
        };
        return (
            <div >
                <h3 className="filterHeader">Filter by </h3>
                <div>
                    <fieldset className="filterset">
                        <summary>
                            Type
                        </summary>
                        <div className="filterList">
                            <Checkbox styles={checkboxStyles} label="Function app" defaultChecked={this.isChecked("types", "functionapp")} onChange={(ev, checked) => this.checkboxclicked(ev,checked, "types", "functionapp")} />
                            <Checkbox label="Logic app" defaultChecked={this.isChecked("types", "logicapp")} onChange={(ev, checked) => this.checkboxclicked(ev,checked, "types", "logicapp")} />
                        </div>
                    </fieldset>
                </div>
                <div>
                    <fieldset className="filterset">
                        <summary>
                            Language
                        </summary>
                        <div className="filterList">
                            <Checkbox styles={checkboxStyles} label="C#" defaultChecked={this.isChecked("languages", "csharp")} onChange={(ev, checked) => this.checkboxclicked(ev,checked, "languages", "csharp" )} />
                            <Checkbox label="Javascript" defaultChecked={this.isChecked("languages", "javascript")} onChange={(ev, checked) => this.checkboxclicked(ev,checked, "languages", "javascript")} />
                        </div>
                    </fieldset>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    functionapp: state.functionapp,
    logicapp: state.logicapp,
    csharp: state.csharp,
    javascript: state.javascript
});


const mapDispatchToProps = {
    FunctionAppChanged,
    LogicAppChanged,
    JavascriptChanged,
    CsharpChanged
};

const SideBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBar);

export default withRouter(SideBarContainer);
