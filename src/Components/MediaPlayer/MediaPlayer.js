import '../MediaPlayer/MediaPlayer.scss';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi'
import { useState, useEffect, useRef, useCallback } from 'react';
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
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const playAnimationRef = useRef();
    const audioRef = useRef();
    const progressBarRef = useRef();

    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    };

    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }


    const formatTime = (time) => {
        if (time && !isNaN(time)) {
            const hours = Math.floor(time / 120);
            const formatHours =
                hours < 10 ? `0${hours}` : `${hours}`;
            const minutes = Math.floor(time % 60);
            const formatMinutes =
                minutes < 10 ? `0${minutes}` : `${minutes}`;
            return `${formatHours}:${formatMinutes}`;
        }
        return '00:00';
    };


    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        );
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
                playAnimationRef.current = requestAnimationFrame(repeat);
            } else {
                audioRef.current.pause();
                cancelAnimationFrame(playAnimationRef.current);
            }
        }
    }, [isPlaying, audioRef, repeat]);


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

                <div className="mediaplayer__controls">
                    <input className='mediaplayer__progress-bar' ref={progressBarRef}
                        type="range"
                        defaultValue="0"
                        onChange={handleProgressChange} />
                    <div className='mediaplayer__time-div'>
                        <span className="mediaplayer__time">{formatTime(timeProgress)}</span>
                        <span className="mediaplayer__time">{formatTime(duration)}</span>
                    </div>
                    <audio ref={audioRef} type='audio/mp3' src={music[0].track} onLoadedMetadata={onLoadedMetadata} />
                    <div className='mediaplayer__icon-div'>
                        <BiSkipPrevious className='mediaplayer__icons' />
                        {isPlaying ? (<AiFillPauseCircle className='mediaplayer__play-pause' onClick={togglePlay} />)
                            : (<AiFillPlayCircle className='mediaplayer__play-pause' onClick={togglePlay} />)}
                        <BiSkipNext className='mediaplayer__icons' />
                    </div>
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