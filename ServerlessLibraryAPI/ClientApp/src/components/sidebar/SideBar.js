import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'office-ui-fabric-react/lib/index';
import { FunctionAppChanged, LogicAppChanged, JavascriptChanged, CsharpChanged } from '../../actions/FilterChangeActions'

import './SideBar.css';

class SideBar extends Component {
 
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
                            <Checkbox styles={checkboxStyles} label="Function app" checked={this.props.functionapp} onChange={(ev, checked) => this.props.FunctionAppChanged(checked)} />
                            <Checkbox label="Logic app" checked={this.props.logicapp} onChange={(ev, checked) => this.props.LogicAppChanged(checked)} />
                        </div>
                    </fieldset>
                </div>
                <div>
                    <fieldset className="filterset">
                        <summary>
                            Language
                        </summary>
                        <div className="filterList">
                            <Checkbox styles={checkboxStyles} label="C#" checked={this.props.csharp} onChange={(ev, checked) => this.props.CsharpChanged(checked)} />
                            <Checkbox label="Javascript" checked={this.props.javascript} onChange={(ev, checked) => this.props.JavascriptChanged(checked)} />
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

export default SideBarContainer;
