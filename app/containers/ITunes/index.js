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
import { Card, Input, Row, Skeleton } from 'antd';
import { selectITunesData, selectITunesError, selectITunesName } from './selectors';
import saga from './saga';
import styled from 'styled-components';
import { iTunesCreators } from './reducer';
import { debounce, isEmpty, get } from 'lodash';
import If from '@components/If';
import For from '@components/For';
import { AlbumCard } from './components/AlbumCard';

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
