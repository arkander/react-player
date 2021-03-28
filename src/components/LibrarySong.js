import React from 'react';

const LibraySong = ({song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs})=>{

const songSelectHandler = async ()=>{  

    await setCurrentSong(song);
   
    const newSongs = songs.map((s)=>{
        if(s.id === song.id){
            return {...s, active:true}
        }
        return {...s, active:false}
    });
    setSongs(newSongs);
    if(isPlaying){
        audioRef.current.play();
    }
}


return (

    <div className={`library-song ${song.active ? 'selected' : ''}`}  onClick={songSelectHandler} >
        <img src={song.cover} alt={song.name}></img>
        <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
        </div>
        
    </div>
);

}

export default LibraySong;