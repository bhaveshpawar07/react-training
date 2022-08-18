/**
 *
 * Tests for ITunes container
 *
 *
 */

import React from 'react';
// import { fireEvent } from '@testing-library/dom';
import { renderProvider } from '@utils/testUtils';
import { ITunesTest as ITunes } from '../index';

describe('<ITunes /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ITunes />);
    expect(baseElement).toMatchSnapshot();
  });
});
