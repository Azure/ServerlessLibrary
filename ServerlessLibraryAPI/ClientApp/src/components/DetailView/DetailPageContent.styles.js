export const pivotStyles = {
  root: {
    borderBottom: "1px solid rgba(105, 130, 155, 0.25)",
    paddingLeft: "15px",
    width: "80%"
  },
  text: {
    color: " #0058AD",
    fontSize: "14px"
  },
  link: {
    color: "black"
  },
  linkIsSelected: {
    selectors: {
      ":before": {
        color: "#161616",
        boxSizing: "border-box",
        borderBottom: "2px solid #161616"
      }
    }
  }
};

export const pivotItemContainerStyle = {
  marginLeft: "20px",
  width: "100%"
};

export const containerContentStyle = {
  overflowWrap: "break-word",
  whiteSpace: "pre-line",
  justifyContent: "center",
  overflowX: "hidden",
  width: "100%"
};
