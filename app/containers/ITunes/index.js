/*
 *
 * ITunes Container
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { Card, Input, Row, Skeleton } from 'antd';
import { selectITunesData, selectITunesError, selectITunesName, selectITunesLoading } from './selectors';
import saga from './saga';
import styled from 'styled-components';
import { iTunesCreators } from './reducer';
import { debounce, isEmpty, get } from 'lodash';
import If from '@components/If';
import For from '@components/For';
import T from '@components/T';
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

export function ITunes({
  intl,
  dispatchGetItunesData,
  dispatchClearItunesData,
  iTunesData,
  iTunesName,
  iTunesError,
  loading
}) {
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
