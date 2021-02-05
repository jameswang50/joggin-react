import { fromJS } from 'immutable';
import * as CONSTANTS from './constants';

const newEntry = {
  duration: 0,
  distance: 0,
  date: new Date(),
};

const initalState = fromJS({
  entries: {
    list: [],
    loading: false,
  },
  report: {
    list: [],
    loading: false,
  },
  entry: {
    id: '',
    data: {},
    error: [],
    loading: false,
  },
});

function entryReducer(state = initalState, action) {
  switch (action.type) {
    case CONSTANTS.LOAD_NEW_ENTRY:
      return state.set('entry', fromJS({
        data: newEntry,
        id: 'new',
        error: [],
        loading: false,
      }));
    case CONSTANTS.ENTRY_LIST_REQUEST:
      return state.setIn(['entries', 'loading'], true);
    case CONSTANTS.ENTRY_LIST_SUCCESS:
      return state.setIn(['entries', 'list'], fromJS(action.data))
        .setIn(['entries', 'loading'], false);
    case CONSTANTS.ENTRY_LIST_ERROR:
      return state.setIn(['entries', 'loading'], false);
    case CONSTANTS.ENTRY_REPORT_REQUEST:
      return state.setIn(['report', 'loading'], true);
    case CONSTANTS.ENTRY_REPORT_SUCCESS:
      return state.setIn(['report', 'list'], fromJS(action.data))
        .setIn(['report', 'loading'], false);
    case CONSTANTS.ENTRY_REPORT_ERROR:
      return state.setIn(['report', 'loading'], false);
    case CONSTANTS.ENTRY_DELETE_REQUEST:
      return state.setIn(['entries', 'loading'], true)
        .setIn(['entry', 'loading'], true);
    case CONSTANTS.ENTRY_DELETE_SUCCESS:
      {
        const entryList = state.getIn(['entries', 'list']);
        const filteredList = entryList.filter((entry) => entry.get('_id') !== action.id);
        return state.setIn(['entries', 'list'], fromJS(filteredList))
          .setIn(['entries', 'loading'], false)
          .setIn(['entry', 'loading'], false);
      }
    case CONSTANTS.ENTRY_DELETE_ERROR:
      return state.setIn(['entries', 'loading'], false)
        .setIn(['entry', 'loading'], false);
    case CONSTANTS.ENTRY_LOAD_REQUEST:
      return state.setIn(['entry', 'loading'], true);
    case CONSTANTS.ENTRY_LOAD_SUCCESS:
      return state.setIn(['entry', 'data'], fromJS(action.data))
        .setIn(['entry', 'id'], action.data._id)
        .setIn(['entry', 'loading'], false);
    case CONSTANTS.ENTRY_LOAD_ERROR:
      return state.setIn(['entry', 'loading'], false);
    case CONSTANTS.ENTRY_SAVE_REQUEST:
      return state.setIn(['entry', 'loading'], true)
        .setIn(['entry', 'error'], fromJS([]));
    case CONSTANTS.ENTRY_SAVE_SUCCESS:
      return state
        .setIn(['entry', 'id'], action.data._id)
        .setIn(['entry', 'data', 'id'], action.data._id)
        .setIn(['entry', 'loading'], false);
    case CONSTANTS.ENTRY_SAVE_ERROR:
      return state.setIn(['entry', 'loading'], false)
        .setIn(['entry', 'error'], fromJS(action.data.error));
    case CONSTANTS.UPDATE_ENTRY_FIELD:
      return state.setIn(['entry', 'data', action.field], action.value);
    default:
  }

  return state;
}

export default entryReducer;
