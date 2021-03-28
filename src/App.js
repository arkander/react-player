import React, {useState, useRef} from 'react';

import './styles/app.scss';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import data from './data';
import Nav from "./components/Nav";


function App() {

  const[songs, setSongs] = useState(data());
  const[currentSong, setCurrentSong] = useState(songs[0]);
  const[isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const [songInfo, setSongInfo] = useState({currentTime:0, duration:0, animationPercentage:0});

  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration || 0;
    const roundedCurrentTime = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round((roundedCurrentTime / roundedDuration) * 100 );
    setSongInfo({...songInfo, currentTime, duration, animationPercentage});
  }
  const songEndHandler = async ()=>{
    let currentIndex = songs.findIndex((song)=>song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length] );
    if(isPlaying){
      audioRef.current.play();
    }
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : '' }`}>
      <Nav libraryStatus = {libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}/>

      <Player currentSong={currentSong} 
              setCurrentSong = {setCurrentSong}
              isPlaying={isPlaying}
              audioRef= {audioRef}
              setSongInfo={setSongInfo}
              songInfo={songInfo}
              songs={songs}
              setSongs = {setSongs}
              setIsPlaying={setIsPlaying}/>

      <Library  songs={songs}
                audioRef = {audioRef}
                idPlaying = {isPlaying}
                setSongs = {setSongs}
                libraryStatus = {libraryStatus} 
                setLibraryStatus={setLibraryStatus}
                setCurrentSong={setCurrentSong}/>

      <audio src={currentSong.audio} 
               ref={audioRef} 
               onTimeUpdate={timeUpdateHandler}
               onEnded={songEndHandler}
               onLoadedMetadata={timeUpdateHandler}></audio>
    </div>
  );
}

export default App;
