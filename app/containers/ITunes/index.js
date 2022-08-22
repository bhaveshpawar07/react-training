/*
 *
 * ITunes Container
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { Card, Input, Col, Row, Skeleton } from 'antd';
import { selectITunesData, selectITunesError, selectITunesName } from './selectors';
import saga from './saga';
import styled from 'styled-components';
import { iTunesCreators } from './reducer';
import { debounce, isEmpty, get } from 'lodash';
import If from '@components/If';
import For from '@components/For';
import { T as MyT } from '@components/T';

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

const divStyle = {
  width: '150px',
  display: 'flex',
  flexDirection: 'column'
};
const pStyle = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
};
const imgStyle = {
  borderRadius: '15px'
};
const detailsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '10px '
};
const artistNameStyle = {
  fontSize: '10px'
};
const trackNameStyle = {
  fontWeight: 'bold'
};

const AlbumCard = ({ artworkUrl100, trackName, trackExplicitness, artistName }) => {
  return (
    <Col style={divStyle} span={6}>
      <img src={artworkUrl100} style={imgStyle} />
      <div style={detailsStyle}>
        <MyT text={trackName} style={{ ...trackNameStyle, ...pStyle }} />
        <If condition={trackExplicitness == 'explicit'}>
          <img
            src="https://cdn-icons.flaticon.com/png/512/3097/premium/3097003.png?token=exp=1661161542~hmac=99d22989a8dc8287886e84079bddb458"
            width="15px"
          />
        </If>
      </div>
      <MyT text={artistName} style={{ ...artistNameStyle, ...pStyle }} />
    </Col>
  );
};

export function ITunes({ intl, dispatchGetItunesData, dispatchClearItunesData, iTunesData, iTunesName }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(iTunesData, 'results', null);
    if (loaded) {
      setLoading(false);
    }
  }, [iTunesData]);

  useEffect(() => {
    if (iTunesName && !iTunesData?.results?.length) {
      dispatchGetItunesData(iTunesName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = (name) => {
    if (!isEmpty(name)) {
      dispatchGetItunesData(name);
      setLoading(true);
    } else {
      dispatchClearItunesData();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);
  const renderList = (iTunesData) => {
    const items = get(iTunesData, 'results', []);
    return (
      <If condition={!isEmpty(items) || loading}>
        <Skeleton loading={loading} active>
          <Row gutter={[16, 16]} data-testid="dataRow">
            <For of={items} noParent renderItem={(item, index) => <AlbumCard key={index} {...item} />} />
          </Row>
        </Skeleton>
      </If>
    );
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
    </Container>
  );
}

ITunes.propTypes = {
  intl: PropTypes.Object,
  dispatchGetItunesData: PropTypes.func,
  iTunesData: PropTypes.any,
  dispatchClearItunesData: PropTypes.func,
  iTunesName: PropTypes.string
};

AlbumCard.propTypes = {
  artworkUrl100: PropTypes.string,
  trackName: PropTypes.string,
  trackExplicitness: PropTypes.string,
  artistName: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  iTunesData: selectITunesData(),
  iTunesName: selectITunesName(),
  iTunesError: selectITunesError()
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
