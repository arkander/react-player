import React  from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons';


const Player = ({currentSong, setCurrentSong, isPlaying, setIsPlaying, audioRef, setSongInfo, songInfo , songs})=>{

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


    const skipTrackHandler = (direction)=>{
        let currentIndex = songs.findIndex((song)=>song.id === currentSong.id);
        if(direction === 'skip-foward'){
            setCurrentSong(songs[(currentIndex + 1) % songs.length] );
        }else{
            currentIndex = ((currentIndex - 1) % songs.length < 0 ) ? songs.length -1 : (currentIndex - 1) % songs.length;
           setCurrentSong(songs[currentIndex]);
        }
    }
  
return (

    <div className="player">
        <div className="time-control">
            <p>{getTime(songInfo.currentTime)}</p>
            <input type="range" min={0} max={songInfo.duration  } value={songInfo.currentTime} onChange={dragHandler}/>
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