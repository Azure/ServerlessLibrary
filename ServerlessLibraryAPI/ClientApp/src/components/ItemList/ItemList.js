import React, { Component } from "react";
import {
  FocusZone,
  FocusZoneDirection
} from "office-ui-fabric-react/lib/FocusZone";
import { List } from "office-ui-fabric-react/lib/List";
import { Link } from "react-router-dom";
import ItemTags from "../ItemTags/ItemTags";
import MetricBar from "../MetricBar/MetricBar";

import "./ItemList.scss";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this._onRenderCell = this._onRenderCell.bind(this);
  }

  _onRenderCell(item, index) {
    return (
      <article>
        <div className="libraryitem">
          <div className="title">
            <Link className="titlelink" to={`/sample/${item.title}`}>
              {item.title}
            </Link>{" "}
          </div>
          <MetricBar
            numlikes="0"
            repository={item.repository}
            downloads={item.totaldownloads}
          />
          <p className="description">{item.description}</p>
          <ItemTags
            type={item.type}
            language={item.language}
            tags={item.tags}
          />
        </div>
      </article>
    );
  }

  render() {
    return (
      <div className="listcontainer">
        <FocusZone direction={FocusZoneDirection.vertical}>
          <List
            items={this.props.filteredSamples}
            onRenderCell={this._onRenderCell}
          />
        </FocusZone>
      </div>
    );
  }
}

export default ItemList;
