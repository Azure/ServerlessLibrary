import React, { Component } from "react";
import { FocusZone, FocusZoneDirection, List } from "office-ui-fabric-react";
import { Link } from "react-router-dom";
import ItemTags from "../ItemTags/ItemTags";
import MetricBar from "../MetricBar/MetricBar";

import "./ItemList.scss";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this._onRenderCell = this._onRenderCell.bind(this);
    this.disableHover = this.props.disableHover || false;
  }

  _onRenderCell(item, index) {
    let likes = item.likes? item.likes : 0;
    return (
      <article>
        <div className={this.disableHover ? "" : "libraryitemContainer"}>
          <div
            className={
              this.disableHover ? "libraryitem" : "libraryitem-withhover"
            }
          >
            <div className="title">
              <Link className="titlelink" to={`/sample/${item.title}`}>
                {item.title}
              </Link>
            </div>
            <MetricBar
              numlikes={likes}
              repository={item.repository}
              template={item.template}
              downloads={item.totaldownloads}
            />
            <p className="description">{item.description}</p>
            <ItemTags
              type={item.type}
              language={item.language}
              tags={item.tags}
            />
          </div>
        </div>
      </article>
    );
  }

  render() {
    return (
      <div>
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
