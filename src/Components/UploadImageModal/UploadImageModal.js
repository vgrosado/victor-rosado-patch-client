import '../../Components/UploadImageModal/UploadImageModal.scss'
import {v4} from 'uuid';
import { useState } from 'react';
import {storage} from '../../Firebase';
import {db} from '../../Firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {doc, updateDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';

function BookingModal({isOpen, closeModal}) {

    const [imageUpload, setImageUpload] = useState(null);
    const [avatarUpload, setAvatarUpload] = useState(null);
    const [url, setUrl] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const {id} = useParams();
    const artistId = id;
    
    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `userbackgroundimages/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            getDownloadURL(imageRef).then((url) => {
                console.log(url)
                setUrl(url)
            })
            const artRef = doc(db, "Artists", `${artistId}`)
            console.log(url)
            updateDoc(artRef, {
                backgroundimg: `${url}`
            })
        }).catch((error) => {
            console.log(error.message);
        }) 
    };

    const uploadAvatar = () => {
        if (avatarUpload == null) return;
        const avatarRef = ref(storage, `avatars/${avatarUpload.name + v4()}`);
        uploadBytes(avatarRef, avatarUpload).then(() => {
            getDownloadURL(avatarRef).then((avatarUrl) => {
                console.log(avatarUrl)
                setAvatarUrl(avatarUrl)
            })
            const artRef = doc(db, "Artists", `${artistId}`)
            console.log(avatarUrl)
            updateDoc(artRef, {
                image: `${avatarUrl}`
            })
        }).catch((error) => {
            console.log(error.message);
        })
    };

    

    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className='modal-overlay__content'>
            <button className='modal-overlay__button' htmlFor='avatar-input' onClick={uploadAvatar}>New profile picture</button>
            <button className='modal-overlay__button' htmlFor='background-input' onClick={uploadImage}>New background</button>
            <input className='modal-overlay__upload-input' id='avatar-input' type='file' onChange={(event) => {setAvatarUpload(event.target.files[0])}}></input>
            <input className='modal-overlay__upload-input' id='background-input' type='file' onChange={(event) => {setImageUpload(event.target.files[0])}}></input>
            </div>
                <span className="modal-overlay__close" onClick={closeModal}>
                </span>
        </div>
    )
};

export default BookingModal;