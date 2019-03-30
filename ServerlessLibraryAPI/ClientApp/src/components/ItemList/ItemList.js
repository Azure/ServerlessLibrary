import React, { Component } from 'react';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { List } from 'office-ui-fabric-react/lib/List';
import { Link } from 'react-router-dom'
import ItemTags from '../ItemTags/ItemTags';

import './ItemList.scss'

class ItemList extends Component {
    constructor(props) {
        super(props);
        this._onRenderCell = this._onRenderCell.bind(this);
    }

    getAutherName(repository) {
        var parser = document.createElement('a');
        parser.href = repository;
        var pathArray = parser.pathname.split('/');
        var username = pathArray.length > 1 ? pathArray[1] : null;
        return username;
    }

    _onRenderCell(item, index) {

        let username = this.getAutherName(item.repository);
        let downloads = item.totaldownloads;
        let lastupdated; 
        if (item.lastupdated)
        {
            lastupdated = <span>| Last updated: {item.lastupdated} days ago</span>
        }
        return (

            <article>
                <div className="libraryitem">
                    <div className="title"><Link className="titlelink" to={`/sample/${item.title}`}> {item.title}</Link> </div>
                    <div className="metrics" >
                        <span>By: {username} | {downloads}  downloads {lastupdated}</span>
                        <IconButton iconProps={{ iconName: 'LikeSolid' }} title="Like" ariaLabel="Like" onClick={() => console.log("liked")} />
                        <span>5</span>
                        <IconButton iconProps={{ iconName: 'DisLikeSolid' }} title="Like" ariaLabel="Like" onClick={() => console.log("liked")} />
                        <span>2</span>
                    </div>
                    <p className="description"  >{item.description}</p>
                    <ItemTags type={item.type} language={item.language} tags={item.tags} ></ItemTags>
                </div>
            </article>
        );
    }

    render() {
        return (
            <div className="listcontainer">
                <FocusZone direction={FocusZoneDirection.vertical}>
                    <List items={this.props.filteredSamples} onRenderCell={this._onRenderCell} />
                </FocusZone>
            </div>
        )
    }
}

export default ItemList;
