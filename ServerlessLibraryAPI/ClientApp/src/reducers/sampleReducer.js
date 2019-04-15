import { sampleActionTypes } from "../actions/actionTypes";
import initialState from "./initialState";

export default function sampleReducer(state = initialState.samples, action) {
  switch (action.type) {
    case sampleActionTypes.GETSAMPLES_SUCCESS:
      return action.samples;
    case sampleActionTypes.ADDSAMPLE_SUCCESS:
      return [...state, { ...action.sample }];
    default:
      return state;
  }
}
