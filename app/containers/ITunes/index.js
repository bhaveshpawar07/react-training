/*
 *
 * ITunes Container
 *
 */

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { Card, Input, Row, Skeleton, Progress } from 'antd';
import { selectITunesData, selectITunesError, selectITunesName, selectITunesLoading } from './selectors';
import saga from './saga';
import styled from 'styled-components';
import { iTunesCreators } from './reducer';
import { debounce, isEmpty, get } from 'lodash';
import If from '@components/If';
import For from '@components/For';
import T from '@components/T';
import { AlbumCard } from './components/AlbumCard';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';

const { Search } = Input;
const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
  }
`;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;
const PlayDiv = styled.div`
  && {
    background: black;
    color: white;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    width: 690px;
    border-radius: 10px 10px 0px 0px;
    box-shadow: 0px 0px 10px 8px #888888;
  }
`;
const PlayAlbumInfo = styled.div`
  && {
    display: flex;
    align-items: center;
    margin-left: 15px;
  }
`;
const PlayAlbumControl = styled.div`
  && {
    width: 35%;
    margin-right: 35px;
  }
`;
export function ITunes({
  intl,
  dispatchGetItunesData,
  dispatchClearItunesData,
  iTunesData,
  iTunesName,
  iTunesError,
  loading
}) {
  const [currentSong, setCurrentSong] = useState({
    songName: '',
    img: '',
    previewUrl: '',
    play: false,
    pause: true,
    progress: 0
  });
  useEffect(() => {
    if (iTunesName && !iTunesData?.results?.length) {
      dispatchGetItunesData(iTunesName);
    }
  }, []);

  const handleOnChange = (name) => {
    if (!isEmpty(name)) {
      dispatchGetItunesData(name);
    } else {
      dispatchClearItunesData();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);
  const musicPlayer = (index) => {
    const selectedSong = iTunesData.results[index];
    const songDetails = {
      songName: selectedSong.trackName,
      img: selectedSong.artworkUrl60,
      previewUrl: selectedSong.previewUrl,
      play: true,
      pause: false
    };
    setCurrentSong(songDetails);
  };
  const renderList = (iTunesData) => {
    const items = get(iTunesData, 'results', []);
    return (
      <If condition={!isEmpty(items) || loading}>
        <Skeleton loading={loading} active>
          <Row gutter={[16, 16]} data-testid="dataRow" style={{ marginBottom: '60px' }}>
            <For
              of={items}
              noParent
              renderItem={(item, index) => <AlbumCard key={index} {...item} index={index} musicPlayer={musicPlayer} />}
            />
          </Row>
        </Skeleton>
      </If>
    );
  };
  const renderError = () => {
    let iTuneError;
    if (iTunesError) {
      iTuneError = iTunesError;
    } else if (isEmpty(iTunesName)) {
      iTuneError = 'album_search_default';
    }
    return (
      !loading &&
      iTuneError && (
        <CustomCard title={intl.formatMessage({ id: 'album_list' })}>
          <If condition={iTunesError} otherwise={<T data-testid="default-message" id={iTuneError} />}>
            <T data-testid="error-message" id={iTunesError} />
          </If>
        </CustomCard>
      )
    );
  };
  const playSong = () => {
    let audioRef = useRef('');
    if (currentSong.songName) {
      // console.log(audioRef.current.currentTime());
      return (
        <PlayDiv>
          <PlayAlbumInfo>
            <img src={currentSong.img} />
            <T text={currentSong.songName} style={{ marginLeft: '10px' }} />
          </PlayAlbumInfo>
          <If
            condition={currentSong.play}
            otherwise={
              <PlayCircleFilled
                style={{ fontSize: '25px' }}
                onClick={() => {
                  audioRef.current.play();
                  setCurrentSong({ ...currentSong, play: true });
                }}
              />
            }
          >
            <PauseCircleFilled
              style={{ fontSize: '25px' }}
              onClick={() => {
                audioRef.current.pause();
                setCurrentSong({ ...currentSong, play: false });
              }}
            />
          </If>
          <PlayAlbumControl>
            <Progress percent={currentSong.progress} status="active" size="small" showInfo={false} />
          </PlayAlbumControl>
          <audio
            autoPlay
            src={currentSong.previewUrl}
            ref={audioRef}
            onEnded={() => setCurrentSong({ ...currentSong, play: false, progress: 0 })}
            onTimeUpdate={() =>
              setCurrentSong({
                ...currentSong,
                progress: (audioRef.current.currentTime / audioRef.current.duration) * 100
              })
            }
          />
        </PlayDiv>
      );
    }
  };
  return (
    <Container maxwidth="700" padding="10">
      <CustomCard title={intl.formatMessage({ id: 'album_search' })}>
        <T marginBottom={20} id="search_for_album" />
        <Search
          type="text"
          defaultValue={iTunesName}
          data-testid="search-bar"
          onChange={(e) => debouncedHandleOnChange(e.target.value)}
          onSearch={(searchText) => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderList(iTunesData)}
      {renderError()}
      {playSong()}
    </Container>
  );
}

ITunes.propTypes = {
  intl: PropTypes.object,
  dispatchGetItunesData: PropTypes.func,
  iTunesData: PropTypes.any,
  dispatchClearItunesData: PropTypes.func,
  iTunesName: PropTypes.string,
  iTunesError: PropTypes.string,
  loading: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  iTunesData: selectITunesData(),
  iTunesName: selectITunesName(),
  iTunesError: selectITunesError(),
  loading: selectITunesLoading()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetItunesData, clearItunesData } = iTunesCreators;
  return {
    dispatchGetItunesData: (name) => dispatch(requestGetItunesData(name)),
    dispatchClearItunesData: () => dispatch(clearItunesData())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, withConnect, injectSaga({ key: 'iTunes', saga }))(ITunes);

export const ITunesTest = compose(injectIntl)(ITunes);
