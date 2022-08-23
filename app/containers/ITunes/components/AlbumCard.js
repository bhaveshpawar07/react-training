import React from 'react';
import PropTypes from 'prop-types';
import T from '@components/T';
import If from '@components/If';
import { Col } from 'antd';
import styled from 'styled-components';
const CustomCard = styled(Col)`
  && {
    width: 150px;
    display: flex;
    flex-direction: column;
  }
`;
const CustomImg = styled.img`
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
const CustomT = styled(T)`
  && {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-weight: ${(props) => props.fontWeight};
    font-size: ${(props) => props.fontSize}px;
  }
`;
export const AlbumCard = ({ artworkUrl100, trackName, trackExplicitness, artistName }) => {
  return (
    <CustomCard span={6}>
      <CustomImg src={artworkUrl100} borderRadius={20} />
      <CustomDiv>
        <CustomT text={trackName} fontWeight={'bold'} />
        <If condition={trackExplicitness === 'explicit'}>
          <CustomImg
            src="https://cdn-icons.flaticon.com/png/512/3097/premium/3097003.png?token=exp=1661161542~hmac=99d22989a8dc8287886e84079bddb458"
            width="15px"
          />
        </If>
      </CustomDiv>
      <CustomT text={artistName} fontSize={11} />
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
