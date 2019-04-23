import { sampleActionTypes } from "./actionTypes";

export const sampleActions = {
  getSamplesSuccess,
  sampleSubmittedSuccess
};

function getSamplesSuccess(samples) {
  return {
    type: sampleActionTypes.GETSAMPLES_SUCCESS,
    samples
  };
}

function sampleSubmittedSuccess(sample) {
  return {
    type: sampleActionTypes.SAMPLESUBMITTED_SUCCESS,
    sample
  };
}
