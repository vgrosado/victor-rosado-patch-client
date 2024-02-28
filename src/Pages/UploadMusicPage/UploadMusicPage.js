import '../UploadMusicPage/UploadMusicPage.scss'
import Nav from '../../Components/Nav/Nav';
import { useEffect, useRef, useState } from 'react';
import { db, storage } from '../../Firebase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection} from 'firebase/firestore';
import { FaPhotoVideo } from "react-icons/fa";
import { v4 } from 'uuid';

function UploadMusicPage({ currentUser, setLoading, active, setActive }) {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateArtist, setUpdateArtist] = useState("");
    const [vizUpload, setVizUpload] = useState("");
    const [trackUpload, setTrackUpload] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [trackPreview, setTrackPreview] = useState("")
    const vizUrl = useRef(null);
    const trackUrl = useRef();
    const trackid = v4();


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
        const uploadTrack = uploadBytesResumable(musicRef, trackFile);

        uploadTrack.on('state_changed',
            (snapshot) => {
                // Handle progress updates here
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.log(error.message);
            },
            () => {
                // Upload completed successfully, you can handle it here if needed
                console.log("Upload completed successfully");

                // Get the download URL after successful upload completion
                getDownloadURL(musicRef)
                    .then((url) => {
                        // Set the download URL to the appropriate state or ref
                        trackUrl.current = url;
                        console.log(trackUrl.current);
                    })
                    .catch((error) => {
                        console.log("Error retrieving download URL:", error.message);
                    });
            }
        );
    }

    //upload track object to currentusers Music collection
    function handleTrackUpload(e) {
        e.preventDefault();
        const userMusicCollectionRef = collection(db, "users", `${currentUser?.uid}`, "Music");
        addDoc(userMusicCollectionRef, {
            title: updateTitle,
            artist: updateArtist,
            track: trackUrl.current,
            video: vizUrl.current,
            id: trackid
        })
        setUpdateArtist("")
        setUpdateTitle("")
        setThumbnail("")
        setTrackPreview("")
        setUploadProgress(null)
        setTrackUpload(null)
        alert('Track successfully uploaded!')
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

    function trackPre(event) {
        let selectedTrack = event.target.files[0];
        setTrackPreview(selectedTrack);
        console.log(trackPreview)
    };

    useEffect(() => {
        setActive('upload')
    },[])

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
                {thumbnail ? <> <video className='uploadmusicpage__vid' src={thumbnail} poster={thumbnail} autoPlay loop muted></video>
                    <label className='uploadmusicpagea__upload-background' htmlFor='viz-input' id='viz-iput'>
                        <input
                            className='uploadmusicpage__upload-input'
                            id='viz-input'
                            name='viz-input'
                            type='file'
                            accept='image/*,video/*'
                            onChange={(event) => {
                                const vizFile = event.target.files[0];
                                console.log("Selected file:", vizFile); // Debugging log
                                setVizUpload(vizFile); // Update the state with the selected file
                                vizPreview(event);
                            }} />
                            <div className='uploadmusicpage__instructions-replace'>Replace</div>
                    </label>
                    
                </> :
                    <div className='uploadmusicpage__info-container'>
                        <div className='uploadmusicpage__visualizer-div'>
                            <label className='uploadmusicpage__uploadlabel-container' htmlFor='viz-input' id='viz-iput'>
                            <FaPhotoVideo size={60} color='grey' className='uploadmusicpage__edit-background-icon' />
                                <div className='uploadmusicpage__instructions'>Upload an image or short video</div>
                                <input
                                    className='uploadmusicpage__upload-input'
                                    id='viz-input'
                                    name='viz-input'
                                    type='file'
                                    accept='image/*,video/*'
                                    onChange={(event) => {
                                        const vizFile = event.target.files[0];
                                        console.log("Selected file:", vizFile); // Debugging log
                                        setVizUpload(vizFile); // Update the state with the selected file
                                        vizPreview(event);
                                    }} />
                            </label>
                        </div>
                    </div>}
            </div>
            <article className='uploadmusicpage__form-container'>
                <p className='uploadmusicpage__progress-title'>{trackPreview.name}</p>
                {uploadProgress ? <div className="uploadmusicpage__progress-container">
                    <div className="uploadmusicpage__progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                </div> : ""}
                <div className='uploadmusicpage__form-buttonscontainer'>
                    <label className='uploadmusicpage__form-musiclabel' htmlFor='music-input' id='music'>
                        {!trackUpload ? <div className='uploadmusicpage__form-inputbutton'>Choose a track</div> : <div></div>}
                        <input className='uploadmusicpage__form-musicinput' id='music-input' name='music-input' type='file' accept='audio/*'
                            onChange={(event) => {
                                const trackFile = event.target.files[0];
                                console.log("Selected file:", trackFile); // Debugging log
                                setTrackUpload(trackFile);
                                trackPre(event) // Update the state with the selected file
                            }}>
                        </input>
                    </label>
                </div>
                <div className='uploadmusicpage__form'>
                    <label className='uploadmusicpage__input-label' htmlFor='title'>Title</label>
                        <input autoComplete='off' className='uploadmusicpage__input' type='text' name='title' id='title' placeholder='Title...' value={updateTitle}
                            onChange={(event) => { setUpdateTitle(event.target.value) }}>
                        </input>
                    
                    <label className='uploadmusicpage__input-label' htmlFor='artist'>Artist</label>
                        <input autoComplete='off' className='uploadmusicpage__input' type='text' name='Artist' id='Artist' placeholder='Artist...' value={updateArtist}
                            onChange={(event) => { setUpdateArtist(event.target.value) }}>
                        </input>
                </div>
                {uploadProgress !== 100 ? <button className='uploadmusicpage__uploadbutton-disabled' disabled type='submit'
                    onClick={(e) => handleTrackUpload(e)}>Upload</button> : <button className='uploadmusicpage__uploadbutton' type='submit'
                    onClick={(e) => handleTrackUpload(e)}>Upload</button>}
            </article>
            <Nav active={active} setLoading={setLoading} currentUser={currentUser} />
        </section>
    )
};

export default UploadMusicPage;