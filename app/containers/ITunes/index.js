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
import { selectSomePayLoad } from './selectors';
import saga from './saga';

export function ITunes() {
  return (
    <div>
      <T id={'ITunes'} />
    </div>
  );
}

ITunes.propTypes = {
  somePayLoad: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  somePayLoad: selectSomePayLoad()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'iTunes', saga }))(ITunes);

export const ITunesTest = compose(injectIntl)(ITunes);
