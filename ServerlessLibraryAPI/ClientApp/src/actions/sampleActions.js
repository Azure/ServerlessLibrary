import { sampleActionTypes } from "./actionTypes";

export const sampleActions = {
  getSamplesSuccess,
  addSampleSuccess
};

function getSamplesSuccess(samples) {
  return {
    type: sampleActionTypes.GETSAMPLES_SUCCESS,
    samples
  };
}

function addSampleSuccess(sample) {
  return {
    type: sampleActionTypes.ADDSAMPLE_SUCCESS,
    sample
  };
}
