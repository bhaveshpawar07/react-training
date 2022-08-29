import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderProvider, renderWithIntl, timeout } from '@utils/testUtils';
import AlbumCard from '../index';
import { useHistory } from 'react-router-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
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
  it('should render explicit svg if the track is explicit', () => {
    const trackName = 'test';
    const trackExplicitness = 'explicit';
    const { getByTestId } = renderWithIntl(<AlbumCard trackName={trackName} trackExplicitness={trackExplicitness} />);
    expect(getByTestId('track-name')).toHaveTextContent(trackName);
    expect(getByTestId('explicit-svg')).toBeInTheDocument;
  });
  it('should call musicPlayer with proper index after a album is clicked', () => {
    const index = 1;
    const musicPlayer = jest.fn();
    const { getByTestId } = renderProvider(<AlbumCard index={index} musicPlayer={musicPlayer} />);
    fireEvent.click(getByTestId('album-songImage'));
    expect(musicPlayer).toBeCalledWith(index);
  });
  it('should redirect to AlbumDetails when clicked on clickable component', async () => {
    const history = createBrowserHistory();
    const trackId = 1;

    const { getByTestId } = renderProvider(
      <Router history={history}>
        <AlbumCard trackId={trackId} />
      </Router>
    );
    const h = useHistory();
    const historySpy = jest.spyOn(h, 'push');
    fireEvent.click(getByTestId('album-viewDetails'));
    await timeout(500);
    expect(historySpy).toHaveBeenCalledWith(`/details/${trackId}`);
  });
});
