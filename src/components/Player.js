import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause, faRandom, faRedo } from '@fortawesome/free-solid-svg-icons';
import { calculatePercentage } from '../util';

const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songs,
  setSongs,
  songInfo,
  setSongInfo,
  playerState,
  setPlayerState,
  shuffleHandler,
}) => {
  // Event Handlers
  const playSongHandler = () => {
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };
  const timeUpdateHandler = ({ target }) => {
    const currentTime = target.currentTime;
    const duration = target.duration;
    const animationPercentage = calculatePercentage(currentTime, duration);
    setSongInfo({ ...songInfo, currentTime, duration, animationPercentage });
  };
  const dragHandler = ({ target }) => {
    audioRef.current.currentTime = target.value;
    setSongInfo({ ...songInfo, currentTime: target.value });
  };
  const skipTrackHandler = async (direction) => {
    const songSource = playerState.shuffle ? playerState.shuffleSongs : songs;
    const currentIndex = songSource.findIndex((song) => song.id === currentSong.id);
    const newSongIndex = direction === 'skip-forward' ? currentIndex + 1 : currentIndex - 1;
    const newSong =
      newSongIndex < 0 ? songSource[songSource.length - 1] : newSongIndex === songSource.length ? songSource[0] : songSource[newSongIndex];
    await setCurrentSong(newSong);
  };
  const onEndedHandler = () => {
    if (playerState.repeat) return audioRef.current.play();
    skipTrackHandler('skip-forward');
  };
  // Functions
  const getTime = (time) => Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
  // Add Styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={{ background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` }} className="track">
          <input min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" onChange={dragHandler} />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-main">
        <div className="play-options">
          <FontAwesomeIcon
            className="shuffle"
            size="lg"
            icon={faRandom}
            onClick={shuffleHandler}
            style={playerState.shuffle ? { color: currentSong.color[0] } : { color: '#333' }}
          />
        </div>
        <div className="play-control">
          <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
          <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
          <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight} />
        </div>
        <div className="play-options">
          <FontAwesomeIcon
            className="repeat"
            size="lg"
            icon={faRedo}
            onClick={() => setPlayerState({ ...playerState, repeat: !playerState.repeat })}
            style={playerState.repeat ? { color: currentSong.color[0] } : { color: '#333' }}
          />
        </div>
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={onEndedHandler}
      />
    </div>
  );
};

export default Player;
