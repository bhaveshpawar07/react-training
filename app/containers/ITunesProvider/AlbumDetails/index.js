/**
 *
 * AlbumDetails Container
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectITunesData, selectLoading, selectSongData, selectSongError, selectSongId } from '../selectors';
import saga from '../saga';
import { useParams } from 'react-router-dom';
import { iTunesCreators } from '../reducer';
import { Card } from 'antd';
import T from '@components/T';

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
  useEffect(() => {
    const getFromStore = iTunesData?.results?.find((song) => song.trackId == id);
    if (!getFromStore) {
      dispatchGetSongDetails(id);
    } else {
      songData = {
        resultCount: 1,
        results: [getFromStore]
      };
      dispatchSetSongDetails(songData);
    }
    return () => dispatchClearSongDetails();
  }, []);
  return (
    <Container maxwidth="700" padding="10">
      <CustomCard>
        <CustomDiv maxwidth="300">
          <CustomImg borderRadius={10} src={songData?.results?.[0]?.artworkUrl100} />
          <SongDetailsDiv>
            <CustomT
              title={`Track Name: ${songData?.results?.[0]?.trackName}`}
              text={songData?.results?.[0]?.trackName}
              fontSize={20}
            />
            <CustomT
              title={`Artist Name: ${songData?.results?.[0]?.artistName}`}
              text={songData?.results?.[0]?.artistName}
              fontSize={14}
            />
            <CustomT
              title={`Collection Name: ${songData?.results?.[0]?.collectionCensoredName}`}
              text={songData?.results?.[0]?.collectionCensoredName}
              fontSize={12}
            />
          </SongDetailsDiv>
        </CustomDiv>
      </CustomCard>
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
  loading: selectLoading()
});

function mapDispatchToProps(dispatch) {
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
