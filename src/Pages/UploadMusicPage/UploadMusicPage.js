import '../UploadMusicPage/UploadMusicPage.scss'
import Nav from '../../Components/Nav/Nav';
import { useRef, useState } from 'react';
import { db, storage } from '../../Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { TbEdit } from 'react-icons/tb';
import { useParams } from 'react-router-dom';

function UploadMusicPage({ currentUser }) {
    const {id} = useParams();
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateArtist, setUpdateArtist] = useState("");
    const [vizUpload, setVizUpload] = useState("");
    const vizUrl = useRef();
    const [thumbnail, setThumbnail] = useState();

    function uploadViz() {
        if (vizUpload == null) return;
        const vizRef = ref(storage, `/MediaPlayervideos/${vizUpload?.name}`);
        uploadBytes(vizRef, vizUpload)
            .then(() => {
                getDownloadURL(vizRef)
                    .then((url) => {
                        vizUrl.current = url;
                        console.log(vizUrl)
                    }).then(() => {
                        const userMusicCollectionRef = doc(collection(db, "users", `${currentUser?.uid}`, "Music"))
                        setDoc(userMusicCollectionRef,  {
                            title: updateTitle,
                            artist: updateArtist,
                            // track: newTrack,
                            video: vizUrl.current
                        });
                    })
            }).catch((error) => {
                console.log(error.message);
            })
    };

    function vizPreview(event) {
        let selectedVid = event.target.files[0];
        setThumbnail(selectedVid);

        if (selectedVid) {
            const objectUrl = URL.createObjectURL(selectedVid);
            setThumbnail(objectUrl); // Update the previewUrl state
        }
    };


    return (
        <section className='uploadmusicpage'>
            <div className='uploadmusicpage__background-container'>
                    <video className='uploadmusicpage__vid' src={thumbnail} autoPlay loop muted></video>
                <div className='uploadmusicpage__info-container'>
                    <div className='uploadmusicpage__avatar-div'>
                        <label className='uploadmusicpageay__upload-background' htmlFor='viz-input' id='background'>
                            <TbEdit className='uploadmusicpage__edit-background-icon' size={30} onClick={(event) => uploadViz(event)} />
                            <input className='uploadmusicpage__upload-input' id='viz-input' name='viz-input' type='file' onChange={(event) => {
                                setVizUpload(event.target.files[0])
                                vizPreview(event)
                            }}>
                            </input>
                        </label>
                    </div>
                </div>
            </div>
            <article className='uploadmusicpage__form-container'>
                <div className='uploadmusicpage__form'>
                    <label className='uploadmusicpage__input-label' htmlFor='title'>Title
                        <input autoComplete='off' className='uploadmusicpage__input' type='text' name='title' id='title' contentEditable={true} onChange={(event) => { setUpdateTitle(event.target.value) }}>
                        </input>
                    </label>
                    <label className='uploadmusicpage__input-label' htmlFor='artist'>Artist
                        <input autoComplete='off' className='uploadmusicpage__input' type='text' name='Artist' id='Artist' contentEditable={true} onChange={(event) => { setUpdateArtist(event.target.value) }}>
                        </input>
                    </label>
                </div>
            </article>
            <Nav currentUser={currentUser} />
        </section>
    )
};

export default UploadMusicPage;