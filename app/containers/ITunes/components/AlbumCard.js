import React from 'react';
import PropTypes from 'prop-types';
import T from '@components/T';
import If from '@components/If';
import { Col, Image } from 'antd';
import styled from 'styled-components';
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
const artistNameStyle = {
  fontSize: '10px'
};
const trackNameStyle = {
  fontWeight: 'bold'
};
const CustomCard = styled(Col)`
  && {
    width: 150px;
    display: flex;
    flex-direction: column;
  }
`;
const CustomImg = styled(Image)`
  && {
    border-radius: ${(props) => props.borderRadius}px;
  }
`;
const CustomDiv = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
`;
export const AlbumCard = ({ artworkUrl100, trackName, trackExplicitness, artistName }) => {
  return (
    <CustomCard style={divStyle} span={6}>
      <CustomImg src={artworkUrl100} borderRadius={20} />
      <CustomDiv>
        <T text={trackName} style={{ ...trackNameStyle, ...pStyle }} />
        <If condition={trackExplicitness === 'explicit'}>
          <CustomImg
            src="https://cdn-icons.flaticon.com/png/512/3097/premium/3097003.png?token=exp=1661161542~hmac=99d22989a8dc8287886e84079bddb458"
            width="15px"
          />
        </If>
      </CustomDiv>
      <T text={artistName} style={{ ...artistNameStyle, ...pStyle }} />
    </CustomCard>
  );
};

AlbumCard.propTypes = {
  artworkUrl100: PropTypes.string,
  trackName: PropTypes.string,
  trackExplicitness: PropTypes.string,
  artistName: PropTypes.string
};

export default AlbumCard;
