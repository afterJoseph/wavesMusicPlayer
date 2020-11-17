import LibrarySong from './LibrarySong';

const Library = ({ songs, setSongs, setCurrentSong, currentSong, audioRef, setIsPlaying, isPlaying, libraryStatus }) => {
  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            setCurrentSong={setCurrentSong}
            songs={songs}
            key={song.id}
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
