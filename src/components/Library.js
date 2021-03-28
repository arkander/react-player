import React    from 'react';
import LibrarySong from './LibrarySong';
const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus})=>{

    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="libray-songs">
                {
                    songs.map((song)=>(
                        <LibrarySong song={song} 
                                     key={song.id}  
                                     audioRef = {audioRef}                                   
                                     songs={songs}
                                     setSongs = {setSongs}
                                     isPlaying= {isPlaying}
                                     setCurrentSong={setCurrentSong}/>
                    ))
                }
            </div>
        </div>
    );
}

export default Library;
