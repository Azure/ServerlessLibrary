import React, { Component } from "react";
import { registerIcons, Icon } from "office-ui-fabric-react";
import { ReactComponent as FunctionappSvg } from "../../assets/functionapp.svg";
import { ReactComponent as LogicappSvg } from "../../assets/logicapp.svg";

import "./ItemTags.css";

registerIcons({
  icons: {
    "functionapp-svg": <FunctionappSvg className="svg" />,
    "logicapp-svg": <LogicappSvg className="svg" />
  }
});
class ItemTags extends Component {
  ToDisplayType(value) {
    if (!value) {
      return "";
    }
    var type = value.toLowerCase();
    if (type === "functionapp") {
      return "Function App";
    } else if (type === "logicapp") {
      return "Logic App";
    } else {
      return value;
    }
  }
  ToDisplayLanguage(value) {
    if (!value) {
      return "";
    }
    var language = value.toLowerCase();
    if (language === "csharp") {
      return "C#";
    } else if (language === "javascript") {
      return "JavaScript";
    } else if (language === "python") {
      return "Python";
    } else if (language === "java") {
      return "Java";
    } else if (language === "na") {
      return "";
    } else {
      return value;
    }
  }

  render() {
    let svgIconName;
    if (this.props.type === "functionapp") {
      svgIconName = "functionapp-svg";
    } else if (this.props.type === "logicapp") {
      svgIconName = "logicapp-svg";
    }

    let itemTypeToDisplay = this.ToDisplayType(this.props.type);

    let languageTag;
    if (this.props.language !== "" && this.props.language !== "na") {
      let itemLanguageToDisplay = this.ToDisplayLanguage(this.props.language);
      languageTag = <span className="tag">{itemLanguageToDisplay}</span>;
    }

    let tags;
    if (this.props.tags) {
      tags = this.props.tags.map((value, index) => {
        return (
          <span className="tag" key={index}>
            {value}
          </span>
        );
      });
    }

    return (
      <div className="tagcontainer">
        Tags :
        <span className="tag">
          <Icon iconName={svgIconName} />
          <span>{itemTypeToDisplay}</span>
        </span>
        {languageTag}
        {tags}
      </div>
    );
  }
}

export default ItemTags;
