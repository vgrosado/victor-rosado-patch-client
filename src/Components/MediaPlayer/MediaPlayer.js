import '../MediaPlayer/MediaPlayer.scss';
import {AiOutlinePlayCircle, AiOutlinePauseCircle} from 'react-icons/ai'
import {BiSkipPreviousCircle, BiSkipNextCircle} from 'react-icons/bi'
import { useState } from 'react';

function MediaPlayer({artist}) {
    console.log(artist)
 

    const [isplaying, setisPlaying] = useState(false);
    const togglePlay = () => {
        setisPlaying(!isplaying)

    }

    const artistMusic = artist.music;
    
    if (!artistMusic) {
        return <p>Loading</p>
    } 

    return (
       
        <section className='mediaplayer'> 
            <div className='mediaplayer__card'>
            {artistMusic.map((track)=> (
        <div key={track.id}> <p key={track.id} className='mediaplayer__song-title'>{track.title}</p> 
        <audio key={track.id} controls typeof='audio/mp3' src={track.track}/>
        </div>
    
       ))}
                <div className='mediaplayer__icon-div'>
                    <BiSkipPreviousCircle className='mediaplayer__icons'/>
                    {isplaying ? (<AiOutlinePauseCircle className='mediaplayer__play-pause' onClick={togglePlay}/>)
                    : (<AiOutlinePlayCircle className='mediaplayer__play-pause' onClick={togglePlay}/>) }
                    <BiSkipNextCircle className='mediaplayer__icons'/>
                </div>
            </div>
        </section>
    )
}

export default MediaPlayer;