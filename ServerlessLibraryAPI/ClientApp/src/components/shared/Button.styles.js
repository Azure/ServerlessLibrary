import { mergeStyleSets } from "office-ui-fabric-react";

export const buttonStyles = {
  root: {
    fontSize: "12px",
    height: "25px",
    marginRight: "8px",
    minWidth: "0px",
    paddingRight: "10px",
    paddingLeft: "10px"
  },
  label: {
    fontWeight: "normal"
  }
};

const secondaryButtonAdditionalStyles = {
  root: {
    backgroundColor: "white",
    border: "1px solid #0078D7",
    color: "#0058AD"
  },
  rootHovered: {
    // backgroundColor: "white",
    border: "1px solid #0078D7",
    color: "#0058AD"
  }
};

export const secondaryButtonStyles = mergeStyleSets(
  buttonStyles,
  secondaryButtonAdditionalStyles
);
