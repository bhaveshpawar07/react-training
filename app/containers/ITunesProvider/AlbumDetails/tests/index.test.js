/**
 *
 * Tests for AlbumDetails container
 *
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { AlbumDetailsTest as AlbumDetails } from '../index';

describe('<AlbumDetails /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<AlbumDetails dispatchGetSongDetails={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });
});
