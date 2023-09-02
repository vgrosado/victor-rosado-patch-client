import '../MediaPlayer/MediaPlayer.scss';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi'
import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';
import { useParams } from 'react-router-dom';

function MediaPlayer({ music }) {


    // useEffect(() => {
    //     const musicRef = doc(db, "Music", "1")
    //     getDoc(musicRef)
    //     .then((doc) => {
    //         setMusic(doc.data())
    //         console.log(music)
    //     })
    //     .catch(error => {
    //         console.log('error fetching video ID:s', error)
    //     });
    // }, [])


    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef();
    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    useEffect(() => {
        if (audioRef.current) { // Ensure audioRef.current is defined
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    if (!music || music.length === 0) {
        return <p>Loading</p>
    }

    return (

        <section className='mediaplayer'>
            <div className='mediaplayer__card'>
                <div className='mediaplayer__song-div'>
                    <p className='mediaplayer__song-title'>{music[0].title}</p>
                    <p className='mediaplayer__song-subtitle'>{music[0].artist}</p>
                </div>
                <div className="mediaplayer__song-subtitle">
                    <span className="mediaplayer__song-subtitle"></span>
                    <input ref={progressBarRef} 
                        type="range" 
                        defaultValue="0"
                        onChange={handleProgressChange}/>
                    <span className="mediaplayer__song-subtitle"></span>
                </div>
                <audio ref={audioRef} type='audio/mp3' src={music[0].track}></audio>
                <div className='mediaplayer__icon-div'>
                    <BiSkipPrevious className='mediaplayer__icons' />
                    {isPlaying ? (<AiFillPauseCircle className='mediaplayer__play-pause' onClick={togglePlay} />)
                        : (<AiFillPlayCircle className='mediaplayer__play-pause' onClick={togglePlay} />)}
                    <BiSkipNext className='mediaplayer__icons' />
                </div>
                {/* {artistMusic.map((track)=> (
        <div key={track.id}> <p key={track.id} className='mediaplayer__song-title'>{track.title}</p> 
        <audio key={track.id} controls typeof='audio/mp3' src={track.track}/>
        </div>
        ))} */}
            </div>
        </section>
    )
}

export default MediaPlayer;