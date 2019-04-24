import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  FocusZone,
  FocusZoneDirection,
  List,
  Link as FabricLink
} from "office-ui-fabric-react";
import { mergeStyleSets } from "office-ui-fabric-react";
import ItemTags from "../ItemTags/ItemTags";
import MetricBar from "../MetricBar/MetricBar";

import "./ItemList.scss";
import { commonLinkStyles } from "../shared/Link.styles";

class ItemList extends Component {
  constructor(props) {
    super(props);
    this._onRenderCell = this._onRenderCell.bind(this);
    this.disableHover = this.props.disableHover || false;
  }

  _onRenderCell(item, index) {
    const customLinkStyles = mergeStyleSets(commonLinkStyles, {
      root: {
        fontSize: "24px"
      }
    });

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
            <div>
              <FabricLink
                styles={customLinkStyles}
                as={Link}
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
