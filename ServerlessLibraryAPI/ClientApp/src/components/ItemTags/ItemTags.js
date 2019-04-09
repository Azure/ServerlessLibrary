import React, { Component } from "react";
import "./ItemTags.css";

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
    let width = "17";
    let svgIcon;
    if (this.props.type === "functionapp") {
      svgIcon = (
        <svg
          width={width}
          height={width}
          className="functionslogo"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 64 54"
          enableBackground="new 0 -10 64 54"
          xmlSpace="preserve"
        >
          <g>
            <path
              fill="#3999C6"
              d="M63.6,32.4c0.6-0.6,0.5-1.7,0-2.3L60.5,27L46.7,13.6c-0.6-0.6-1.5-0.6-2.2,0l0,0c-0.6,0.6-0.8,1.7,0,2.3 L59,30.1c0.6,0.6,0.6,1.7,0,2.3L44.2,47.1c-0.6,0.6-0.6,1.7,0,2.3l0,0c0.6,0.6,1.7,0.5,2.2,0l13.7-13.6c0,0,0,0,0.1-0.1L63.6,32.4z"
            />
            <path
              fill="#3999C6"
              d="M0.4,32.4c-0.6-0.6-0.5-1.7,0-2.3L3.5,27l13.8-13.4c0.6-0.6,1.5-0.6,2.2,0l0,0c0.6,0.6,0.8,1.7,0,2.3 L5.3,30.1c-0.6,0.6-0.6,1.7,0,2.3l14.5,14.7c0.6,0.6,0.6,1.7,0,2.3l0,0c-0.6,0.6-1.7,0.5-2.2,0L3.6,36c0,0,0,0-0.1-0.1L0.4,32.4z"
            />
            <polygon
              fill="#FCD116"
              points="47.6,2.5 28.1,2.5 17.6,32.1 30.4,32.2 20.4,61.5 48,22.4 34.6,22.4 	"
            />
            <polygon
              opacity="0.3"
              fill="#FF8C00"
              enableBackground="new    "
              points="34.6,22.4 47.6,2.5 37.4,2.5 26.6,27.1 39.4,27.2 20.4,61.5 48,22.4 	"
            />
          </g>
        </svg>
      );
    } else if (this.props.type === "logicapp") {
      svgIcon = (
        <svg
          v-if="type === 'logicapp'"
          width={width}
          height={width}
          className="logicappslogo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 51.8"
        >
          <g>
            <path
              fill="#59b4d9"
              d="M26 21.3v-5h-2.5v5c0 .9-.8 1.7-2.1 2.1l-3.4.7c-2.3.7-3.9 2.5-3.9 4.5v5.7h2.5v-5.7c0-.9.8-1.7 2.1-2.1l3.4-.8c2.3-.6 3.9-2.4 3.9-4.4z"
            />
            <path
              fill="#7fba00"
              d="M19.6 36.9v-4.6c0-1.1-.9-2-2-2H13c-1.1 0-2 .9-2 2v4.6c0 1.1.9 2 2 2h4.6c1.1 0 2-.9 2-2z"
            />
            <path
              fill="#59b4d9"
              d="M23.2 21.3v-5h2.5v5c0 .9.8 1.7 2.1 2.1l4.2.9c2.3.7 3.9 2.5 3.9 4.5v5.7h-2.5v-5.7c0-.9-.8-1.7-2.1-2.1l-4.2-.9c-2.3-.7-3.9-2.5-3.9-4.5z"
            />
            <path
              fill="#7fba00"
              d="M30.4 37.1v-4.6c0-1.1.9-2 2-2H37c1.1 0 2 .9 2 2v4.6c0 1.1-.9 2-2 2h-4.6c-1.1 0-2-.9-2-2z"
            />
            <path fill="#59b4d9" d="M23.2 16.3H26v4.8h-2.8z" />
            <path
              fill="#0072c6"
              d="M26.5 11.7v3.7h-3.7v-3.7h3.7m.8-2.8H22c-1.1 0-2 .9-2 2v5.3c0 1.1.9 2 2 2h5.3c1.1 0 2-.9 2-2v-5.3c0-1.1-.9-2-2-2z"
            />
            <path
              fill="#59b4d9"
              d="M7.9 44.4c-2.1 0-3.6-.4-4.5-1.1-.9-.8-1.3-2.1-1.3-4V28.9c0-1.7-.7-2.6-2.1-2.6v-2.6c1.4 0 2.1-.9 2.1-2.7V10.8c0-1.9.4-3.3 1.3-4.1s2.4-1.1 4.5-1.1v2.6c-1.5 0-2.3.8-2.3 2.5v10c0 2.3-.7 3.7-2.2 4.3 1.4.6 2.2 2 2.2 4.3v9.9c0 .9.2 1.6.5 2 .4.4.9.6 1.7.6l.1 2.6c-.1 0 0 0 0 0zM42.1 5.6c2.1 0 3.6.4 4.5 1.1.9.8 1.3 2.1 1.3 4v10.4c0 1.7.7 2.6 2.1 2.6v2.6c-1.4 0-2.1.9-2.1 2.7v10.1c0 1.9-.4 3.3-1.3 4.1-.9.8-2.4 1.2-4.5 1.2v-2.6c1.5 0 2.3-.8 2.3-2.5v-10c0-2.3.7-3.7 2.2-4.3-1.4-.6-2.2-2-2.2-4.3v-9.9c0-.9-.2-1.6-.5-2-.4-.4-.9-.6-1.7-.6l-.1-2.6z"
            />
          </g>
        </svg>
      );
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
          {svgIcon}
          <span>{itemTypeToDisplay}</span>
        </span>
        {languageTag}
        {tags}
      </div>
    );
  }
}

export default ItemTags;
