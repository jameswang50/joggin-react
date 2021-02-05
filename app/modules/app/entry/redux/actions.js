import * as CONSTANTS from './constants';

export function entryListRequest() {
  return {
    type: CONSTANTS.ENTRY_LIST_REQUEST,
  };
}

export function entryListSuccess(data) {
  return {
    type: CONSTANTS.ENTRY_LIST_SUCCESS,
    data,
  };
}

export function entryListError(data) {
  return {
    type: CONSTANTS.ENTRY_LIST_ERROR,
    data,
  };
}

export function entryReportRequest() {
  return {
    type: CONSTANTS.ENTRY_REPORT_REQUEST,
  };
}

export function entryReportSuccess(data) {
  return {
    type: CONSTANTS.ENTRY_REPORT_SUCCESS,
    data,
  };
}

export function entryReportError(data) {
  return {
    type: CONSTANTS.ENTRY_REPORT_ERROR,
    data,
  };
}

export function entryLoadRequest(id) {
  return {
    type: CONSTANTS.ENTRY_LOAD_REQUEST,
    id,
  };
}

export function entryLoadSuccess(data) {
  return {
    type: CONSTANTS.ENTRY_LOAD_SUCCESS,
    data,
  };
}

export function entryLoadError(data) {
  return {
    type: CONSTANTS.ENTRY_LOAD_ERROR,
    data,
  };
}

export function entryDeleteRequest(id) {
  return {
    type: CONSTANTS.ENTRY_DELETE_REQUEST,
    id,
  };
}

export function entryDeleteSuccess(id, data) {
  return {
    type: CONSTANTS.ENTRY_DELETE_SUCCESS,
    id,
    data,
  };
}

export function entryDeleteError(data) {
  return {
    type: CONSTANTS.ENTRY_DELETE_ERROR,
    ...data,
  };
}

export function entrySaveRequest() {
  return {
    type: CONSTANTS.ENTRY_SAVE_REQUEST,
  };
}

export function entrySaveSuccess(data) {
  return {
    type: CONSTANTS.ENTRY_SAVE_SUCCESS,
    data,
  };
}

export function entrySaveError(data) {
  return {
    type: CONSTANTS.ENTRY_SAVE_ERROR,
    data,
  };
}

export function loadNewEntry() {
  return {
    type: CONSTANTS.LOAD_NEW_ENTRY,
  };
}

export function updateEntryField(field, value) {
  return {
    type: CONSTANTS.UPDATE_ENTRY_FIELD,
    field,
    value,
  };
}
