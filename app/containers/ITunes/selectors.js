import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the iTunes state domain
 */

const selectITunesDomain = (state) => state.iTunes || initialState;

export const selectITunes = () => createSelector(selectITunesDomain, (substate) => substate);

export const selectSomePayLoad = () => createSelector(selectITunesDomain, (substate) => substate.somePayLoad);
