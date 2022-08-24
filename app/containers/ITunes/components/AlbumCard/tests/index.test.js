import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderProvider, renderWithIntl } from '@app/utils/testUtils';
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
  it('should call musicPlayer with proper index after a album is clicked', () => {
    const index = 1;
    const musicPlayer = jest.fn();
    const { getByTestId } = renderProvider(<AlbumCard index={index} musicPlayer={musicPlayer} />);
    fireEvent.click(getByTestId('album-card'));
    expect(musicPlayer).toBeCalledWith(index);
  });
});
