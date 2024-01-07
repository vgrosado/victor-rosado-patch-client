import '../UploadMusicPage/UploadMusicPage.scss'
import Nav from '../../Components/Nav/Nav';
import { useEffect, useRef, useState } from 'react';
import { db, storage } from '../../Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, setDoc } from 'firebase/firestore';
import { TbVideoPlus } from "react-icons/tb";


function UploadMusicPage({ currentUser }) {

    const [updateTitle, setUpdateTitle] = useState("");
    const [updateArtist, setUpdateArtist] = useState("");
    const [vizUpload, setVizUpload] = useState("");
    const [trackUpload, setTrackUpload] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    // const [vizUrl, setVizUrl] = useState("");
    const vizUrl = useRef();
    const trackUrl = useRef();


    function uploadViz(vizFile) {
        console.log("Inside uploadViz:", vizFile); // Debugging log
        if (!vizFile) return;
        const vizRef = ref(storage, `/MediaPlayervideos/${vizFile.name}`);
        uploadBytes(vizRef, vizFile)
            .then(() => {
                getDownloadURL(vizRef)
                    .then((url) => {
                        vizUrl.current = url;
                        console.log(vizUrl.current)
                    })
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    //select mp3 file for media player
    function uploadTrack(trackFile) {
        console.log("Inside uploadViz:", trackFile); // Debugging log
        if (!trackFile) return;
        const musicRef = ref(storage, `/UserMusic/${trackFile.name}`);
        uploadBytes(musicRef, trackFile)
            .then(() => {
                getDownloadURL(musicRef)
                    .then((url) => {
                        trackUrl.current = url;
                        console.log(trackUrl.current)
                    })
            })
            .catch((error) => {
                console.log(error.message);
            });
    };



    //upload track object to currentusers Music collection
    function handleTrackUpload(e) {
        e.preventDefault();
        const userMusicCollectionRef = doc(collection(db, "users", `${currentUser?.uid}`, "Music"))
        setDoc(userMusicCollectionRef, {
            title: updateTitle,
            artist: updateArtist,
            track: trackUrl.current,
            video: vizUrl.current
        })
    };

    // Update the previewUrl state
    function vizPreview(event) {
        let selectedVid = event.target.files[0];
        setThumbnail(selectedVid);

        if (selectedVid) {
            const objectUrl = URL.createObjectURL(selectedVid);
            setThumbnail(objectUrl);
        }
    };

    useEffect(() => {
        if (vizUpload) {
            uploadViz(vizUpload);
        }
    }, [vizUpload]);
    
    useEffect(() => {
        if (trackUpload) {
            uploadTrack(trackUpload);
        }
    }, [trackUpload]);


    return (
        <section className='uploadmusicpage'>
            <div className='uploadmusicpage__background-container'>
                <video className='uploadmusicpage__vid' src={thumbnail} autoPlay loop muted></video>
                <div className='uploadmusicpage__info-container'>
                    <p className='uploadmusicpage__songtitle'></p>
                    <div className='uploadmusicpage__avatar-div'>
                        <label className='uploadmusicpagea__upload-background' htmlFor='viz-input' id='viz-iput'>
                            <TbVideoPlus size={60} color='grey' className='uploadmusicpage__edit-background-icon' />
                            <input
                                className='uploadmusicpage__upload-input'
                                id='viz-input'
                                name='viz-input'
                                type='file'
                                onChange={(event) => {
                                    const vizFile = event.target.files[0];
                                    console.log("Selected file:", vizFile); // Debugging log
                                    setVizUpload(vizFile); // Update the state with the selected file
                                    vizPreview(event);
                                }}/>
                        </label>
                    </div>
                </div>
            </div>
            <article className='uploadmusicpage__form-container'>
                <div className='uploadmusicpage__form-buttonscontainer'>
                    <label className='uploadmusicpage__form-musiclabel' htmlFor='music-input' id='music'>
                        <div className='uploadmusicpage__form-musicbutton'>Choose a track</div>
                        <input className='uploadmusicpage__form-musicinput' id='music-input' name='music-input' type='file'
                            onChange={(event) => {
                                const trackFile = event.target.files[0];
                                console.log("Selected file:", trackFile); // Debugging log
                                setTrackUpload(trackFile); // Update the state with the selected file
                            }}>
                        </input>
                    </label>
                    <button className='modal-overlay__upload-button' type='submit'
                        onClick={(e) => handleTrackUpload(e)

                        }>Upload</button>
                </div>
                <div className='uploadmusicpage__form'>
                    <label className='uploadmusicpage__input-label' htmlFor='title'>Title
                        <input autoComplete='off' className='uploadmusicpage__input' type='text' name='title' id='title'
                            onChange={(event) => { setUpdateTitle(event.target.value) }}>
                        </input>
                    </label>
                    <label className='uploadmusicpage__input-label' htmlFor='artist'>Artist
                        <input autoComplete='off' className='uploadmusicpage__input' type='text' name='Artist' id='Artist'
                            onChange={(event) => { setUpdateArtist(event.target.value) }}>
                        </input>
                    </label>
                </div>
            </article>
            <Nav currentUser={currentUser} />
        </section>
    )
};

export default UploadMusicPage;