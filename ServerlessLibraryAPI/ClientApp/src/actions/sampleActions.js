import { sampleActionTypes } from "./actionTypes";

export const sampleActions = {
  getSamplesSuccess
};

function getSamplesSuccess(samples) {
  return {
    type: sampleActionTypes.GETSAMPLES_SUCCESS,
    samples
  };
}
