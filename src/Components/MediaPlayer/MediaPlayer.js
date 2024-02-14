import '../MediaPlayer/MediaPlayer.scss';
import EmptyMediaPlayer from '../EmptyMediaPlayer/EmptyMediaPlayer';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi'
import { TbVinyl } from "react-icons/tb";
import { useState, useEffect, useRef, useCallback } from 'react';
import TrackList from '../TrackList/Tracklist';

function MediaPlayer({ music, currentUser, user, getUserMusic }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [musicIndex, setMusicIndex] = useState(0);
    const [currentTrack, setCurrentTrack] = useState(music[musicIndex]);
    const playAnimationRef = useRef();
    const audioRef = useRef();
    const progressBarRef = useRef();

    function handleProgressChange() {
        audioRef.current.currentTime = progressBarRef.current.value;
    };

    useEffect(() => {
        setCurrentTrack(music[musicIndex]);
    }, [music, musicIndex]);


    function onLoadedMetadata() {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
        audioRef.current.currentTime = 0;
    };

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function formatTime(time) {
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
        // Clean up function when component is unmounted
        return () => {
            cancelAnimationFrame(playAnimationRef.current);

        };
    }, [isPlaying, audioRef, repeat]);


    function handlePrevious() {
        if (musicIndex === 0) {
            let lastTrackIndex = music.length - 1;
            setMusicIndex(lastTrackIndex);
            setCurrentTrack(music[lastTrackIndex]);
        } else {
            setMusicIndex((prev) => prev - 1);
            setCurrentTrack(music[musicIndex - 1]);
        }
    };

    function handleNext() {
        if (musicIndex >= music.length - 1) {
            setMusicIndex(0);
            setCurrentTrack(music[0]);
        } else {
            setMusicIndex((prev) => prev + 1);
        }
    };

    function handleSelectedTrack(trackObj) {
        setCurrentTrack(trackObj);
        console.log(currentTrack);
    };

    if (currentUser?.uid === user?.id && music?.length === 0) {
        return (
            <EmptyMediaPlayer
                currentUser={currentUser}
            />
        )
    }

    else if (currentUser?.uid !== user?.id && music?.length === 0) {
        return (
            <section className='mediaplayer'>
                <div className='mediaplayer__empty-alertdiv'>
                    <p className='mediaplayer__empty-alert'><p className='mediaplayer__empty-alert-user'>{user?.displayName}</p>has not uploaded any music yet. Please check back soon!</p>
                    <TbVinyl color='#ff7b00' size={80} />
                </div>
            </section>
        )

    } else
        return (
            <section className='mediaplayer'>
                <div className='mediaplayer__card'>
                    <div className='mediaplayer__song-div'>
                        <p className='mediaplayer__song-title'>{currentTrack?.title}</p>
                        <p className='mediaplayer__song-subtitle'>{currentTrack?.artist}</p>
                    </div>
                    {currentTrack?.video === null ? <img className='mediaplayer__vid' src={user?.avatar}/> :
                        <video className='mediaplayer__vid' src={currentTrack?.video} poster={currentTrack?.video} loop muted controls={false} />
                    }
                    <div className="mediaplayer__controls">
                        <input className='mediaplayer__progress-bar' ref={progressBarRef}
                            type="range"
                            defaultValue="0"
                            onChange={handleProgressChange} />
                        <div className='mediaplayer__time-div'>
                            <span className="mediaplayer__time">{formatTime(timeProgress)}</span>
                            <span className="mediaplayer__time">{formatTime(duration)}</span>
                        </div>
                        <audio ref={audioRef} type='audio/mp3' src={currentTrack?.track} onLoadedMetadata={onLoadedMetadata} />
                        <div className='mediaplayer__icon-div'>
                            <BiSkipPrevious onClick={handlePrevious} className='mediaplayer__icons' />
                            {isPlaying ? (<AiFillPauseCircle className='mediaplayer__play-pause' onClick={togglePlay} />)
                                : (<AiFillPlayCircle className='mediaplayer__play-pause' onClick={togglePlay} />)}
                            {music.length > 1 ? <BiSkipNext onClick={handleNext} className='mediaplayer__icons' /> : <BiSkipNext className='mediaplayer__icons' />}
                        </div>
                    </div>
                    <TrackList handleSelectedTrack={handleSelectedTrack} user={user} currentUser={currentUser} getUserMusic={getUserMusic} music={music} />
                </div>
            </section>
        )
};

export default MediaPlayer;