import { get } from 'lodash';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunes state domain
 */

export const selectITunesDomain = (state) => state.iTunes || initialState;

export const selectITunesData = () => createSelector(selectITunesDomain, (substate) => get(substate, 'tuneData'));

export const selectITunesError = () => createSelector(selectITunesDomain, (substate) => get(substate, 'tuneError'));

export const selectITunesName = () => createSelector(selectITunesDomain, (substate) => get(substate, 'tuneName'));

export const selectITunesLoading = () => createSelector(selectITunesDomain, (substate) => get(substate, 'loading'));
