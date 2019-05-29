import React, { Component } from "react";
import * as Constants from "../shared/Constants";
import "./ItemTags.css";

class ItemTags extends Component {
  render() {
    // Tags contain technologies, language, solutionareas and custom tags
    let allTags = [];

    if (this.props.technologies) {
      allTags.push(...this.props.technologies);
    }
    if (
      this.props.language !== "" &&
      this.props.language !== Constants.NotApplicableLanguage
    ) {
      allTags.push(this.props.language);
    }
    if (this.props.solutionareas) {
      let solutionareas = this.props.solutionareas.filter(
        s => s !== Constants.OtherSolutionArea
      );
      allTags.push(...solutionareas);
    }

    if (this.props.tags) {
      allTags.push(...this.props.tags);
    }

    return (
      <div className="tagcontainer">
        Tags :
        {allTags.map((value, index) => (
          <span className="tag" key={index}>
            {value}
          </span>
        ))}
      </div>
    );
  }
}

export default ItemTags;
