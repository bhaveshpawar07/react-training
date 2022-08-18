/**
 *
 * ITunes Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { Card, Input } from 'antd';
import { selectITunesData, selectITunesError, selectITunesName } from './selectors';
import saga from './saga';
import styled from 'styled-components';
import { iTunesCreators } from './reducer';

const { Search } = Input;
const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
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

export function ITunes({ dispatchGetItunesData }) {
  const handleOnChange = (name) => {
    dispatchGetItunesData(name);
  };

  return (
    <Container maxwidth="500" padding="10">
      <CustomCard title="Album Search">
        <T marginBottom={20} id="Search for any album" />
        <Search
          type="text"
          onChange={(e) => handleOnChange(e.target.value)}
          onSearch={(searchText) => handleOnChange(searchText)}
        />
      </CustomCard>
    </Container>
  );
}

ITunes.propTypes = {
  dispatchGetItunesData: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  iTunesData: selectITunesData(),
  iTunesName: selectITunesName(),
  iTunesError: selectITunesError()
});

function mapDispatchToProps(dispatch) {
  const { requestGetItunesData, clearItunesData } = iTunesCreators;
  return {
    dispatchGetItunesData: (name) => dispatch(requestGetItunesData(name)),
    dispatchClearItunesData: () => dispatch(clearItunesData())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'iTunes', saga }))(ITunes);

export const ITunesTest = compose(injectIntl)(ITunes);
