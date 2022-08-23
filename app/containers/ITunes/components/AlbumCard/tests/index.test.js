import React from 'react';
import { renderWithIntl } from '@app/utils/testUtils';
import AlbumCard from '../index';

describe('<AlbumCard /> tests', () => {
  it('should render and match the snapshot', () => {
    const { baseElement } = renderWithIntl(<AlbumCard />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should contain 1 album card component', () => {
    const { getAllByTestId } = renderWithIntl(<AlbumCard />);
    expect(getAllByTestId('album-card').length).toBe(1);
  });
  it('should render album details inside the card', () => {
    const trackName = 'test';
    const artistName = 'testArtist';
    const { getByTestId } = renderWithIntl(<AlbumCard trackName={trackName} artistName={artistName} />);
    expect(getByTestId('track-name')).toHaveTextContent(trackName);
    expect(getByTestId('artist-name')).toHaveTextContent(artistName);
  });
});
