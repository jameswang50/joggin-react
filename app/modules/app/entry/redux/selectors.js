import { createSelector } from 'reselect';

const selectEntry = (state) => state.get('app').get('entry');

const makeSelectEntryList = () => createSelector(
  selectEntry,
  (entryState) => entryState.getIn(['entries', 'list']),
);

const makeSelectEntryListLoading = () => createSelector(
  selectEntry,
  (entryState) => entryState.getIn(['entries', 'loading']),
);

const makeSelectEntryReport = () => createSelector(
  selectEntry,
  (entryState) => entryState.getIn(['report', 'list']),
);

const makeSelectEntryReportLoading = () => createSelector(
  selectEntry,
  (entryState) => entryState.getIn(['report', 'loading']),
);

const makeSelectEntry = () => createSelector(
  selectEntry,
  (entryState) => entryState.getIn(['entry', 'data']),
);

const makeSelectEntryLoading = () => createSelector(
  selectEntry,
  (entryState) => entryState.getIn(['entry', 'loading']),
);

export {
  selectEntry,
  makeSelectEntryList,
  makeSelectEntryListLoading,
  makeSelectEntry,
  makeSelectEntryLoading,
  makeSelectEntryReport,
  makeSelectEntryReportLoading,
};
