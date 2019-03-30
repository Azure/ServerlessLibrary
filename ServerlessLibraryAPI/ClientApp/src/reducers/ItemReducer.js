import {
  createStore,
} from 'redux';

const initialState = {

  samples: [],
  functionapp: true,
  logicapp: true,
  csharp: true,
  javascript: true,
  filterText: '',
  sortby: 'totaldownloads',
  filterchanged: false

}

export const sampleReducer = (state = { initialState }, action) => {
  switch (action.type) {
    case 'SAMPLE_RECEIVED':
      return { ...state, samples: action.samples }
    case 'FUNCTIONAPP_CHANGE':
      return { ...state, functionapp: action.changedfilter }
    case 'LOGICAPP_CHANGE':
      return { ...state, logicapp: action.changedfilter }
    case 'CSHARP_CHANGE':
      return { ...state, csharp: action.changedfilter }
    case 'JAVASCRIPT_CHANGE':
      return { ...state, javascript: action.changedfilter }
    case 'FILTERTEXT_CHANGE':
      return { ...state, filterText: action.changedfilter }
    case 'SORTBY_CHANGE':
      return { ...state, sortby: action.changedfilter }
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