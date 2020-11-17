// Styles
import './styles/app.scss';
// Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
// Import Data
import Data from './data';
import { useState, useRef, useEffect } from 'react';

export default function App() {
  // Ref
  const audioRef = useRef();
  // State
  const [songs, setSongs] = useState(Data());
  const [currentSong, setCurrentSong] = useState(songs[Math.floor(Math.random() * (songs.length - 1))]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [playerState, setPlayerState] = useState({
    repeat: false,
    shuffle: false,
    shuffleSongs: [],
  });
  // Use Effect
  useEffect(() => {
    // Add Active State
    const updateSongs = songs.map((el) => {
      el.active = el.id === currentSong.id ? true : false;
      return el;
    });
    setSongs(updateSongs);
    if (isPlaying) audioRef.current.play();
  }, [currentSong]);
  // Handlers
  const shuffleHandler = () => {
    const shuffle = !playerState.shuffle;
    let newSongs = [];
    if (shuffle) {
      newSongs = [...songs];
      for (let i = newSongs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = newSongs[i];
        newSongs[i] = newSongs[j];
        newSongs[j] = temp;
      }
    }
    setPlayerState({ ...playerState, shuffle, shuffleSongs: newSongs });
  };
  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songs={songs}
        setSongs={setSongs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        playerState={playerState}
        setPlayerState={setPlayerState}
        shuffleHandler={shuffleHandler}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        currentSong={currentSong}
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
    </div>
  );
}
