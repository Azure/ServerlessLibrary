export const FunctionAppChanged = changedfilter => ({
  type: "FUNCTIONAPP_CHANGE",
  changedfilter
});

export const LogicAppChanged = changedfilter => ({
  type: "LOGICAPP_CHANGE",
  changedfilter
});

export const CsharpChanged = changedfilter => ({
  type: "CSHARP_CHANGE",
  changedfilter
});

export const JavascriptChanged = changedfilter => ({
  type: "JAVASCRIPT_CHANGE",
  changedfilter
});

export const FilterTextChanged = changedfilter => ({
  type: "FILTERTEXT_CHANGE",
  changedfilter
});

export const SortbyChanged = changedfilter => ({
  type: "SORTBY_CHANGE",
  changedfilter
});

export const samplesReceived = samples => ({
  type: "SAMPLE_RECEIVED",
  samples
});
