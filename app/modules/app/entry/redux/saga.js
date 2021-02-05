import { fork, call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';

import * as CONSTANTS from './constants';
import {
  entryListSuccess,
  entryListError,
  entryReportSuccess,
  entryReportError,
  entryLoadSuccess,
  entryLoadError,
  entrySaveSuccess,
  entrySaveError,
  entryDeleteSuccess,
  entryDeleteError,
} from './actions';
import { selectEntry } from './selectors';

export function* entryListRequest() {
  try {
    const data = yield call(request, 'entries', 'GET', null, true);
    yield put(entryListSuccess(data));
  } catch (err) {
    yield put(entryListError(err));
  }
}

export function* entryReportRequest() {
  try {
    const data = yield call(request, 'entries/report', 'GET', null, true);
    yield put(entryReportSuccess(data));
  } catch (err) {
    yield put(entryReportError(err));
  }
}

export function* entryLoadRequest(action) {
  try {
    const data = yield call(request, `entries/${action.id}`, 'GET', null, true);
    yield put(entryLoadSuccess(data));
  } catch (err) {
    yield put(entryLoadError(err));
  }
}

export function* entryDeleteRequest(action) {
  try {
    const data = yield call(request, `entries/${action.id}`, 'DELETE', null, true);
    yield put(entryDeleteSuccess(action.id, data));
  } catch (err) {
    yield put(entryDeleteError(err));
  }
}

export function* entrySaveRequest() {
  try {
    const state = yield select();
    const entry = selectEntry(state);
    const requestData = entry.get('entry').get('data').toJS();
    const id = entry.get('entry').get('id');
    let responseData = null;

    if (id === 'new') {
      responseData = yield call(request, 'entries', 'POST', { ...requestData }, true);
    } else {
      responseData = yield call(request, `entries/${id}`, 'PUT', { ...requestData }, true);
    }

    yield put(entrySaveSuccess(responseData));
    notify.success('Entry saved');
  } catch (err) {
    yield put(entrySaveError(err));
  }
}

export default [
  fork(takeLatest, CONSTANTS.ENTRY_LIST_REQUEST, entryListRequest),
  fork(takeLatest, CONSTANTS.ENTRY_REPORT_REQUEST, entryReportRequest),
  fork(takeLatest, CONSTANTS.ENTRY_LOAD_REQUEST, entryLoadRequest),
  fork(takeLatest, CONSTANTS.ENTRY_SAVE_REQUEST, entrySaveRequest),
  fork(takeLatest, CONSTANTS.ENTRY_DELETE_REQUEST, entryDeleteRequest),
];
