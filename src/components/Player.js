import React  from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons';


const Player = ({currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo , songs, setSongs})=>{

    const activeLibraryHandler = (nextprev)=>{
        const newSongs = songs.map((s)=>{
            if(s.id === nextprev.id){
                return {...s, active:true}
            }
            return {...s, active:false}
        });
        setSongs(newSongs);
    }

    const playSongHandler = ()=>{
        if(isPlaying){
           audioRef.current.pause(); 
        }else{
            audioRef.current.play();            
        }
        setIsPlaying(!isPlaying);        
    }

    const getTime = (time)=>{        
        return Math.floor(time/60) + ":" + ('0' + Math.floor(time % 60)).slice(-2);
    }

    const dragHandler = (e)=>{
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo ,currentTime:e.target.value})
    }


    const skipTrackHandler = async (direction)=>{
        let currentIndex = songs.findIndex((song)=>song.id === currentSong.id);
        if(direction === 'skip-foward'){
            await setCurrentSong(songs[(currentIndex + 1) % songs.length] );
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }else{
            currentIndex = ((currentIndex - 1) % songs.length < 0 ) ? songs.length -1 : (currentIndex - 1) % songs.length;
            await setCurrentSong(songs[currentIndex]);
            activeLibraryHandler(songs[currentIndex]);
        }
        if(isPlaying){
            audioRef.current.play();
        }
        
    }

    const trackAnim = {
        transform:`translateX(${songInfo.animationPercentage}%)`
    }

  
return (

    <div className="player">
        <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>
            <div className="track" 
                 style={{background:`linear-gradient(to right , ${currentSong.color[0]}, ${currentSong.color[1]})`}}>
                <input type="range" min={0} max={songInfo.duration  } value={songInfo.currentTime} onChange={dragHandler}/>
                <div className="animate-track" style={trackAnim}></div>
            </div>
            
            <p>{getTime(songInfo.duration)}</p>            
        </div>
        <div className="play-control">

            <FontAwesomeIcon className="skip-back" 
                             size="2x" icon={faAngleLeft} 
                             onClick={()=>skipTrackHandler('skip-back')}/>
            <FontAwesomeIcon className="play" size="2x" icon={ isPlaying ? faPause :  faPlay } onClick={playSongHandler}/>            
            <FontAwesomeIcon className="skip-foward" 
                             size="2x" 
                             onClick={()=>skipTrackHandler('skip-foward')}
                             icon={faAngleRight}/>

        </div>
        
    </div>
);

}

export default Player;