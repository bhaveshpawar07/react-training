import { get } from 'lodash';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the albumDetails state domain
 */

const selectAlbumDetailsDomain = (state) => state.albumDetails || initialState;

export const selectAlbumDetails = () => createSelector(selectAlbumDetailsDomain, (substate) => substate);

export const selectSongData = () => createSelector(selectAlbumDetailsDomain, (substate) => get(substate, 'songData'));
export const selectSongError = () => createSelector(selectAlbumDetailsDomain, (substate) => get(substate, 'songError'));
export const selectSongId = () => createSelector(selectAlbumDetailsDomain, (substate) => get(substate, 'songId'));
export const selectLoading = () => createSelector(selectAlbumDetailsDomain, (substate) => get(substate, 'loading'));
