import { mergeStyleSets } from "@uifabric/styling";

const labelStyles = {
  root: {
    fontSize: "13px",
    lineHeight: "18px",
    height: "21px",
    paddingBottom: "1px",
    paddingTop: 0
  }
};

export const textFieldStyles = {
  root: {
    marginBottom: "10px"
  },

  field: {
    fontSize: "12px",
    paddingLeft: "7px",
    selectors: {
      "::placeholder": {
        fontSize: "12px"
      }
    }
  },
  subComponentStyles: {
    label: labelStyles
  }
};

export const singleLineFieldStyles = mergeStyleSets(textFieldStyles, {
  fieldGroup: {
    height: "23px"
  }
});
