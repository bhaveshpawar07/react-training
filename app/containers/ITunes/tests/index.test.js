/**
 *
 * Tests for ITunes container
 *
 *
 */

import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { renderProvider, timeout } from '@utils/testUtils';
import { ITunesTest as ITunes } from '../index';
import { iTunesTypes } from '../reducer';
import { mapDispatchToProps } from '@app/containers/ITunes/index';
import { translate } from '@app/components/IntlGlobalProvider';

describe('<ITunes /> container tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ITunes dispatchGetItunesData={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchClearGithubRepos on empty change and after enter', async () => {
    const getItunesDataSpy = jest.fn();
    const clearItunesDataSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ITunes dispatchClearItunesData={clearItunesDataSpy} dispatchGetItunesData={getItunesDataSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'test' }
    });
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItunesDataSpy).toBeCalled();
    fireEvent.keyDown(getByTestId('search-bar'), {
      key: 'Enter',
      code: 13,
      charCode: 13
    });
    expect(clearItunesDataSpy).toBeCalledWith();
  });
  it('should call dispatchGetItunesData on some data change and after on enter ', async () => {
    const tuneName = 'test';
    const getItunesDataSpy = jest.fn();
    const clearItunesDataSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ITunes dispatchClearItunesData={clearItunesDataSpy} dispatchGetItunesData={getItunesDataSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: tuneName }
    });
    await timeout(500);
    expect(getItunesDataSpy).toBeCalledWith(tuneName);
    fireEvent.keyDown(getByTestId('search-bar'), {
      key: 'Enter',
      code: 13,
      charCode: 13
    });
  });
  it('should call dispatchGetItunesData on some data after submit clicked ', async () => {
    const tuneName = 'test';
    const getItunesDataSpy = jest.fn();
    const clearItunesDataSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ITunes dispatchClearItunesData={clearItunesDataSpy} dispatchGetItunesData={getItunesDataSpy} />
    );
    fireEvent.keyDown(getByTestId('search-bar'), { keyCode: 13, target: { value: tuneName } });
    await timeout(500);
    expect(getItunesDataSpy).toBeCalledWith(tuneName);
  });
  it('should  dispatchGetItunesData on update on mount if iTunesName is already persisted', async () => {
    const iTunesName = 'test';
    renderProvider(<ITunes iTunesName={iTunesName} iTunesData={null} dispatchGetItunesData={submitSpy} />);

    await timeout(500);
    expect(submitSpy).toBeCalledWith(iTunesName);
  });
  it('should validate mapDispatchToProps actions', async () => {
    const dispatchItunesSearchSpy = jest.fn();
    const tuneName = 'test';
    const actions = {
      dispatchGetItunesData: { tuneName, type: iTunesTypes.REQUEST_GET_ITUNES_DATA },
      dispatchClearItunesData: { type: iTunesTypes.CLEAR_ITUNES_DATA }
    };

    const props = mapDispatchToProps(dispatchItunesSearchSpy);
    props.dispatchGetItunesData(tuneName);
    expect(dispatchItunesSearchSpy).toHaveBeenCalledWith(actions.dispatchGetItunesData);

    await timeout(500);
    props.dispatchClearItunesData();
    expect(dispatchItunesSearchSpy).toHaveBeenCalledWith(actions.dispatchClearItunesData);
  });
  it('should render data, when data is present', async () => {
    const iTunesData = { results: [{ name: 'test' }] };
    const { getByTestId } = renderProvider(<ITunes iTunesData={iTunesData} dispatchGetItunesData={submitSpy} />);
    expect(getByTestId('dataRow')).toBeInTheDocument();
  });
  it('should render Skeleton when loading is true', async () => {
    const iTunesName = 'test';
    const { getByTestId, baseElement } = renderProvider(<ITunes dispatchGetItunesData={submitSpy} loading={true} />);
    fireEvent.change(getByTestId('search-bar'), { target: { value: iTunesName } });
    await timeout(500);
    expect(baseElement.getElementsByClassName('ant-skeleton').length).toBe(1);
  });
  it('should render error message, when api returns some error', () => {
    const iTunesError = translate('something_went_wrong');
    const { getByTestId } = renderProvider(<ITunes iTunesError={iTunesError} />);
    // expect(getByTestId('error-message').textContent).toBe(iTunesError);
    expect(getByTestId('error-message')).toHaveTextContent(iTunesError);
  });
  it('should show music playback after a album is clicked for the same album', async () => {
    const trackName = 'test';
    const iTunesData = { results: [{ trackName: trackName }] };
    const { getByTestId } = renderProvider(<ITunes iTunesData={iTunesData} dispatchGetItunesData={submitSpy} />);
    expect(getByTestId('dataRow')).toBeInTheDocument();
    expect(getByTestId('album-card')).toBeInTheDocument();
    await timeout(500);
    fireEvent.click(getByTestId('album-card'));
    expect(getByTestId('playback-control')).toBeInTheDocument();
    expect(getByTestId('playback-songName')).toHaveTextContent(trackName);
  });

  it('should show play button when pause is clicked and pause button when play is clicked', async () => {
    const trackName = 'test';
    const iTunesData = { results: [{ trackName: trackName }] };
    const { getByTestId } = renderProvider(<ITunes iTunesData={iTunesData} dispatchGetItunesData={submitSpy} />);

    expect(getByTestId('dataRow')).toBeInTheDocument();
    expect(getByTestId('album-card')).toBeInTheDocument();

    await timeout(500);
    fireEvent.click(getByTestId('album-card'));

    expect(getByTestId('playback-control')).toBeInTheDocument();
    expect(getByTestId('pause')).toBeInTheDocument();

    fireEvent.click(getByTestId('pause'));

    expect(getByTestId('play')).toBeInTheDocument();

    fireEvent.click(getByTestId('play'));

    expect(getByTestId('pause')).toBeInTheDocument();

    expect(getByTestId('pause')).toBeInTheDocument();
    const audioElement = getByTestId('audioElement');
    audioElement.dispatchEvent(new Event('ended'));
    expect(getByTestId('play')).toBeInTheDocument();
  });
});
