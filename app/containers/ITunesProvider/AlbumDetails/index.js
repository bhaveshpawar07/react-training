/**
 *
 * AlbumDetails Container
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectITunesData, selectITunesLoading, selectSongData, selectSongError, selectSongId } from '../selectors';
import saga from '../saga';
import { useParams } from 'react-router-dom';
import { iTunesCreators } from '../reducer';
import { Card } from 'antd';
import T from '@components/T';
import PlayBack from '../ITunes/components/PlayBack/index';
import If from '@components/If';
import { PlayCircleFilled } from '@ant-design/icons';

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
const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
  }
`;
const CustomDiv = styled.div`
  && {
    display: flex;
    align-items: center;
    max-width: ${(props) => props.maxwidth}px;
  }
`;
const SongDetailsDiv = styled.div`
  && {
    margin-left: 20px;
  }
`;
const CustomImg = styled.img`
  && {
    border-radius: ${(props) => props.borderRadius}px;
    box-shadow: 0px 6px 15px 5px #888888;
  }
`;
const CustomT = styled(T)`
  && {
    font-size: ${(props) => props.fontSize}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 150px;
  }
`;

export function AlbumDetails({
  songId,
  songData,
  iTunesData,
  songError,
  loading,
  dispatchGetSongDetails,
  dispatchClearSongDetails,
  dispatchSetSongDetails
}) {
  const { id } = useParams();
  const [currentSong, setCurrentSong] = useState({
    songName: '',
    img: '',
    previewUrl: '',
    play: false,
    pause: true,
    progress: 0
  });
  useEffect(() => {
    const getFromStore = iTunesData?.results?.find((song) => song.trackId == id);

    !getFromStore ? dispatchGetSongDetails(id) : dispatchSetSongDetails(getFromStore);

    return () => dispatchClearSongDetails();
  }, []);
  const playSong = () => {
    const songDetails = {
      songName: songData?.trackName,
      img: songData?.artworkUrl60,
      previewUrl: songData?.previewUrl,
      play: true,
      pause: false
    };
    setCurrentSong(songDetails);
  };
  return (
    <Container maxwidth="700" padding="10">
      <CustomCard>
        <CustomDiv maxwidth="300">
          <CustomImg borderRadius={10} src={songData?.artworkUrl100} />
          <SongDetailsDiv>
            <CustomT title={`Track Name: ${songData?.trackName}`} text={songData?.trackName} fontSize={20} />
            <CustomT title={`Artist Name: ${songData?.artistName}`} text={songData?.artistName} fontSize={14} />
            <CustomT
              title={`Collection Name: ${songData?.collectionCensoredName}`}
              text={songData?.collectionCensoredName}
              fontSize={12}
            />
            <PlayCircleFilled
              data-testid="play-song"
              style={{ fontSize: '20px' }}
              onClick={() => playSong()}
              title={`Listen: ${songData?.trackName}`}
            />
          </SongDetailsDiv>
        </CustomDiv>
      </CustomCard>
      <If condition={currentSong.songName}>
        <PlayBack currentSong={currentSong} setCurrentSong={setCurrentSong} />
      </If>
    </Container>
  );
}

AlbumDetails.propTypes = {
  songId: PropTypes.any,
  songData: PropTypes.object,
  iTunesData: PropTypes.object,
  songError: PropTypes.any,
  loading: PropTypes.bool,
  dispatchGetSongDetails: PropTypes.func,
  dispatchClearSongDetails: PropTypes.func,
  dispatchSetSongDetails: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  songId: selectSongId(),
  iTunesData: selectITunesData(),
  songData: selectSongData(),
  songError: selectSongError(),
  loading: selectITunesLoading()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetSongDetails, requestSetSongDetails, clearSongDetails } = iTunesCreators;
  return {
    dispatchGetSongDetails: (songId) => dispatch(requestGetSongDetails(songId)),
    dispatchSetSongDetails: (songDetails) => dispatch(requestSetSongDetails(songDetails)),
    dispatchClearSongDetails: () => dispatch(clearSongDetails())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'albumDetails', saga }))(AlbumDetails);

export const AlbumDetailsTest = compose(injectIntl)(AlbumDetails);
