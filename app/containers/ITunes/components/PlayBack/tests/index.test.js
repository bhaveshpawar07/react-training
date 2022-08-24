import React from 'react';
import { renderWithIntl } from '@app/utils/testUtils';
import PlayBack from '../index';
describe('<PlayBack /> tests', () => {
  it('should render and match the snapshot', () => {
    const song = { img: 'test', songName: 'test' };
    const { baseElement } = renderWithIntl(<PlayBack currentSong={song} />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should render pause button when play=true', () => {
    const song = { img: 'test', songName: 'test', play: true };
    const { getByTestId } = renderWithIntl(<PlayBack currentSong={song} />);
    expect(getByTestId('pause')).toBeInTheDocument();
  });
  it('should render play button when play=false', () => {
    const song = { img: 'test', songName: 'test', play: false };
    const { getByTestId } = renderWithIntl(<PlayBack currentSong={song} />);
    expect(getByTestId('play')).toBeInTheDocument();
  });
});
