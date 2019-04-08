import {
  createStore,
} from 'redux';

const initialState = {

  samples: [],
}

export const sampleReducer = (state = { initialState }, action) => {
  switch (action.type) {
    case 'SAMPLE_RECEIVED':
      return { ...state, samples: action.samples }
    default:
      return state;
  }
};

export function configureStore(
) {
  const store = createStore(sampleReducer, initialState);
  return store;
};

export const store = configureStore();