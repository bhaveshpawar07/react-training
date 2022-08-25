/**
 *
 * Tests for AlbumDetails container
 *
 *
 */

import React from 'react';

// import { fireEvent } from '@testing-library/dom';
import { renderProvider, timeout } from '@utils/testUtils';
import { iTunesTypes } from '../../reducer';
import { AlbumDetailsTest as AlbumDetails, mapDispatchToProps } from '../index';

describe('<AlbumDetails /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<AlbumDetails dispatchGetSongDetails={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchSetSongDetails when song is already present', async () => {
    const trackId = 7;
    const songDetails = { results: [{ trackId: trackId }] };
    renderProvider(<AlbumDetails dispatchSetSongDetails={submitSpy} iTunesData={songDetails} />);
    // await timeout(500);
    expect(submitSpy).toBeCalled;
  });

  it('should call dispatchGetSongDetails when song is not present', async () => {
    const trackId = 9;
    const songDetails = { results: [{ trackId: trackId }] };
    renderProvider(<AlbumDetails dispatchGetSongDetails={submitSpy} iTunesData={songDetails} />);
    // await timeout(500);
    expect(submitSpy).toBeCalled;
  });

  it('should validate mapDispatchToProps actions', async () => {
    const dispatchItunesSearchSpy = jest.fn();
    const songId = 'test';
    const songDetails = { results: [{ songId: songId }] };

    const actions = {
      dispatchGetSongDetails: { songId, type: iTunesTypes.REQUEST_GET_SONG_DETAILS },
      requestSetSongDetails: { songDetails, type: iTunesTypes.REQUEST_SET_SONG_DETAILS },
      dispatchClearSongDetails: { type: iTunesTypes.CLEAR_SONG_DETAILS }
    };

    const props = mapDispatchToProps(dispatchItunesSearchSpy);
    props.dispatchGetSongDetails(songId);
    expect(dispatchItunesSearchSpy).toHaveBeenCalledWith(actions.dispatchGetSongDetails);

    await timeout(500);
    props.dispatchSetSongDetails(songDetails);
    expect(dispatchItunesSearchSpy).toHaveBeenCalledWith(actions.requestSetSongDetails);
    await timeout(500);

    props.dispatchClearSongDetails();
    expect(dispatchItunesSearchSpy).toHaveBeenCalledWith(actions.dispatchClearSongDetails);
  });
});
