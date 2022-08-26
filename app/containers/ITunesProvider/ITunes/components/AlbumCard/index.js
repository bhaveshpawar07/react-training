import React from 'react';
import PropTypes from 'prop-types';
import T from '@components/T';
import If from '@components/If';
import { Col } from 'antd';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Icon from '@ant-design/icons';

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
const ESvg = () => (
  <svg width="25px" height="25px" viewBox="0 0 76 76">
    <path
      fill="#000000"
      fillOpacity="1"
      strokeWidth="0.2"
      strokeLinejoin="round"
      d="M 49.3103,53.8333L 29.8036,53.8333L 29.8036,21.3222L 48.3814,21.3222L 48.3814,27.36L 37.2347,27.36L 37.2347,34.3262L 47.9169,34.3262L 47.9169,40.3644L 37.2347,40.3644L 37.2347,47.7956L 49.3103,47.7956L 49.3103,53.8333 Z "
    />
  </svg>
);
const EIcon = (props) => <Icon data-testId="explicit-svg" component={ESvg} {...props} />;
export const AlbumCard = ({ trackId, artworkUrl100, trackName, trackExplicitness, artistName, index, musicPlayer }) => {
  const history = useHistory();
  const showDetails = (trackId) => {
    history.push(`/details/${trackId}`);
  };
  return (
    <CustomCard span={6} data-testid="album-card">
      <CustomImg
        src={artworkUrl100}
        borderRadius={20}
        data-testid="album-songImage"
        onClick={() => musicPlayer(index)}
      />
      <CustomDiv data-testid="album-viewDetails" onClick={() => showDetails(trackId)}>
        <CustomT data-testid="track-name" text={trackName} fontWeight={'bold'} />
        <If condition={trackExplicitness === 'explicit'}>
          <EIcon />
        </If>
      </CustomDiv>
      <CustomT data-testid="artist-name" text={artistName} fontSize={11} />
    </CustomCard>
  );
};

AlbumCard.propTypes = {
  trackId: PropTypes.number,
  artworkUrl100: PropTypes.string,
  trackName: PropTypes.string,
  trackExplicitness: PropTypes.string,
  artistName: PropTypes.string,
  index: PropTypes.number,
  musicPlayer: PropTypes.func
};

export default AlbumCard;
