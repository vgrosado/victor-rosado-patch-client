import '../../Components/UploadImageModal/UploadImageModal.scss'
import {v4} from 'uuid';
import { useState } from 'react';
import {storage} from '../../Firebase';
import {db} from '../../Firebase';
import {getDownloadURL, ref, uploadBytes, getStorage} from 'firebase/storage';
import {doc, updateDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';

function BookingModal({isOpen, closeModal}) {

    const [imageUpload, setImageUpload] = useState("");
    const [avatarUpload, setAvatarUpload] = useState("");
    const [backgroundUrl, setBackgroundUrl] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const {id} = useParams();
    const userId = id;
    const auth = getAuth();
    const user = auth.currentUser;
    
    
    async function uploadImage() {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `userbackgroundimages/${imageUpload.name + v4()}`);
        const userRef = doc(db, "users", `${userId}`)
        uploadBytes(imageRef, imageUpload).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setBackgroundUrl(url)
                console.log(backgroundUrl)
                updateDoc(userRef, {
                    backgroundimg: `${backgroundUrl}`
                })
            })
        }).catch((error) => {
            console.log(error.message);
        }) 
    };

    async function uploadAvatar(){
        if (user) {
            const avatarRef = ref(storage, `avatars/${avatarUpload.name}`);
            uploadBytes(avatarRef, avatarUpload).then(() => {
                getDownloadURL(avatarRef).then((url) => {
                    setAvatarUrl(url)
                })
                updateProfile(user, {
                photoURL: avatarUrl
                })
            }).catch((error) => {
                console.log(error.message);
            }) 
        }
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