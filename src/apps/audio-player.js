import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Input = styled.input`
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  color: #000;
  background-color: white;
  transition: 0.3s;
  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const AudioPlayer = () => {
  const [url, setUrl] = useState('');
  const audioRef = useRef(null);

  const handlePlay = () => {
    audioRef.current.play();
  };

  const handlePause = () => {
    audioRef.current.pause();
  };

  const handleStop = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setUrl('');
  };

  const handleRepeat = () => {
    audioRef.current.loop = !audioRef.current.loop;
  };

  return (
    <Container>
      <Input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter audio URL"
      />
      <audio ref={audioRef} src={url} loop />
      <Button onClick={handlePlay}>Play</Button>
      <Button onClick={handlePause}>Pause</Button>
      <Button onClick={handleRepeat}>Repeat</Button>
      <Button onClick={handleStop}>Stop</Button>
    </Container>
  );
};

export default AudioPlayer;
