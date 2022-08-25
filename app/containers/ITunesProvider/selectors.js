import { get } from 'lodash';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunes state domain
 */

export const selectITunesDomain = (state) => state.iTunesProviderReducer || initialState;

export const selectITunesData = () => createSelector(selectITunesDomain, (substate) => get(substate, 'tuneData'));

export const selectITunesError = () => createSelector(selectITunesDomain, (substate) => get(substate, 'tuneError'));

export const selectITunesName = () => createSelector(selectITunesDomain, (substate) => get(substate, 'tuneName'));

export const selectITunesLoading = () => createSelector(selectITunesDomain, (substate) => get(substate, 'loading'));

export const selectSongData = () => createSelector(selectITunesDomain, (substate) => get(substate, 'songData'));

export const selectSongError = () => createSelector(selectITunesDomain, (substate) => get(substate, 'songError'));

export const selectSongId = () => createSelector(selectITunesDomain, (substate) => get(substate, 'songId'));
