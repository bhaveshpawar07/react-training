/**
 *
 * AlbumDetails Container
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectLoading, selectSongData, selectSongError, selectSongId } from './selectors';
import saga from './saga';
import { useParams } from 'react-router-dom';
import { albumDetailsCreators } from './reducer';

export function AlbumDetails({
  songId,
  songData,
  songError,
  loading,
  dispatchGetSongDetails,
  dispatchClearSongDetails
}) {
  const { id } = useParams();
  useEffect(() => {
    if (songData?.results?.[0]?.trackId != id) {
      dispatchGetSongDetails(id);
    }

    return () => dispatchClearSongDetails();
  }, []);
  return (
    <div>
      {/* <T id={id} /> */}
      {songData?.results?.[0]?.trackName}
    </div>
  );
}

AlbumDetails.propTypes = {
  songId: PropTypes.any,
  songData: PropTypes.object,
  songError: PropTypes.any,
  loading: PropTypes.bool,
  dispatchGetSongDetails: PropTypes.func,
  dispatchClearSongDetails: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  songId: selectSongId(),
  songData: selectSongData(),
  songError: selectSongError(),
  loading: selectLoading()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongDetails, clearSongDetails } = albumDetailsCreators;
  return {
    dispatchGetSongDetails: (songId) => dispatch(requestGetSongDetails(songId)),
    dispatchClearSongDetails: () => dispatch(clearSongDetails())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'albumDetails', saga }))(AlbumDetails);

export const AlbumDetailsTest = compose(injectIntl)(AlbumDetails);
