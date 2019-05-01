import React, { Component } from "react";
import {
  FocusZone,
  FocusZoneDirection,
  List,
  Link as FabricLink
} from "office-ui-fabric-react";
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
    let likes = item.likes ? item.likes : 0;
    let dislikes = item.dislikes ? item.dislikes : 0;
    return (
      <article>
        <div className={this.disableHover ? "" : "libraryitemContainer"}>
          <div
            className={
              this.disableHover ? "libraryitem" : "libraryitem-withhover"
            }
          >
            <div className="title">
              <FabricLink
                as={Link}
                className="titlelink"
                to={`/sample/${item.id}`}
              >
                {item.title}
              </FabricLink>
            </div>
            <MetricBar
              likes={likes}
              dislikes={dislikes}
              author={item.author}
              id={item.id}
              downloads={item.totaldownloads}
              createddate={item.createddate}
            />
            <div className="description">{item.description}</div>
            <ItemTags
              technologies={item.technologies}
              language={item.language}
              tags={item.tags}
              solutionareas={item.solutionareas}
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
