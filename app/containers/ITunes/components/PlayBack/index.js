import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import T from '@components/T';
import If from '@components/If';
import { Progress } from 'antd';
import styled from 'styled-components';

const PlayDiv = styled.div`
  && {
    background: black;
    color: white;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    width: 690px;
    border-radius: 10px 10px 0px 0px;
    box-shadow: 0px 0px 10px 8px #888888;
  }
`;
const PlayAlbumInfo = styled.div`
  && {
    display: flex;
    align-items: center;
    margin-left: 15px;
  }
`;
const PlayAlbumControl = styled.div`
  && {
    width: 35%;
    margin-right: 35px;
  }
`;

const PlayBack = ({ currentSong, setCurrentSong }) => {
  let audioRef = useRef('');
  return (
    <PlayDiv>
      <PlayAlbumInfo>
        <img src={currentSong.img} />
        <T text={currentSong.songName} style={{ marginLeft: '10px' }} />
      </PlayAlbumInfo>
      <If
        condition={currentSong.play}
        otherwise={
          <PlayCircleFilled
            style={{ fontSize: '25px' }}
            onClick={() => {
              audioRef.current.play();
              setCurrentSong({ ...currentSong, play: true });
            }}
          />
        }
      >
        <PauseCircleFilled
          style={{ fontSize: '25px' }}
          onClick={() => {
            audioRef.current.pause();
            setCurrentSong({ ...currentSong, play: false });
          }}
        />
      </If>
      <PlayAlbumControl>
        <Progress percent={currentSong.progress} status="active" size="small" showInfo={false} />
      </PlayAlbumControl>
      <audio
        autoPlay
        src={currentSong.previewUrl}
        ref={audioRef}
        onEnded={() => setCurrentSong({ ...currentSong, play: false, progress: 0 })}
        onTimeUpdate={() =>
          setCurrentSong({
            ...currentSong,
            progress: (audioRef.current.currentTime / audioRef.current.duration) * 100
          })
        }
      />
    </PlayDiv>
  );
};

PlayBack.propTypes = {
  currentSong: PropTypes.object,
  setCurrentSong: PropTypes.func
};

export default PlayBack;
