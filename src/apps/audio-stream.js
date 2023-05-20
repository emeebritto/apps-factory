import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';


const Player = styled(ReactPlayer)`
  display: hidden;
  position: absolute;
  top: -100vh;
  left: 0;
  width: 0px;
  height: 0px;
`

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
    border-color: #2123A2;
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #2123A2;
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

const AudioStream = () => {
  const [playing, setPlaying] = useState(true);
  const [loop, setLoop] = useState(true);
  const [query, setQuery] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState("");
  const [cover, setCover] = useState('');
  const [url, setUrl] = useState("");
  const audioRef = useRef(null);

  const handlePlay = async() => {
    console.log({ query, lastQuery });
    if (query != lastQuery) return searchSound(query);
    setPlaying(state => !state);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleStop = () => {
    setPlaying(false);
    setUrl('');
  };

  const handleRepeat = () => {
    setLoop((state) => !state);
  };

  async function searchSound(query) {
    try {
      const response = await fetch(`https://musiky.neblika.com/api/v2/search/stream?q=${query} audio`);
      if (response.ok) {
        const data = await response.json();
        setTitle(data?.title || "unknown");
        setOwner(data?.channel.name || "unknown");
        setCover(data?.cover?.src?.url || "https://i.pinimg.com/474x/96/a2/b9/96a2b9240a365ec80e638ec6d3cce5ee.jpg");
        setUrl(data?.url || "");
        setPlaying(true);
        setLastQuery(query);
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Request failed with error:', error);
    }
  }

  return (
    <Container>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a song name"
      />
      {!!url.length &&
        <Player
          ref={(player) => audioRef.current = player}
          playing={playing}
          loop={loop}
          url={url}
          config={{
            file: {
              attributes: { autoPlay: 1, controls: 0 },
              forceAudio: true
            }
          }}
        />
      }
      <Button onClick={handlePlay}>Play/Pause</Button>
      <Button onClick={handleRepeat}>Repeat</Button>
      <Button onClick={handleStop}>Stop</Button>
    </Container>
  );
};

export default AudioStream;
