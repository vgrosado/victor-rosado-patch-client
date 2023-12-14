import '../../Components/UploadImageModal/UploadImageModal.scss'
import { v4 } from 'uuid';
import { useRef, useState } from 'react';
import { storage } from '../../Firebase';
import { db } from '../../Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { FaImagePortrait, FaImages } from "react-icons/fa6";
import { TbCameraPlus } from 'react-icons/tb';


function BookingModal({ isModalOpen, closeModal, currentUser, avatarUrl, setAvatarUrl}) {

    const [imageUpload, setImageUpload] = useState("");
    const [avatarUpload, setAvatarUpload] = useState("");
    const [backgroundUrl, setBackgroundUrl] = useState("");


    // function uploadImage() {
    //     if (imageUpload == null) return;
    //     const imageRef = ref(storage, `userbackgroundimages/${imageUpload.name + v4()}`);
    //     const userRef = doc(db, "users", `${userId}`)
    //     uploadBytes(imageRef, imageUpload).then(() => {
    //         getDownloadURL(imageRef).then((url) => {
    //             setBackgroundUrl(url)
    //             console.log(backgroundUrl)
    //             updateDoc(userRef, {
    //                 backgroundimg: `${backgroundUrl}`
    //             })
    //         })
    //     }).catch((error) => {
    //         console.log(error.message);
    //     })
    // };


    function uploadAvatar() {
        if (avatarUpload == null) return;
        const avatarRef = ref(storage, `avatars/${avatarUpload?.name}`);
        uploadBytes(avatarRef, avatarUpload)
            .then(() => {
                getDownloadURL(avatarRef)
                    .then((url) => {
                        setAvatarUrl(url)
                    }).then(() => {
                        updateProfile(currentUser, {
                            photoURL: avatarUrl
                        });

                    })
            }).catch((error) => {
                console.log(error.message);
            })
    };

    if (!isModalOpen) return null;
    return (
        <div className="modal-overlay">
            <div className='modal-overlay__content'>
                <div className='modal-overlay__avatar-div'>
                    <div className='modal-overlay__edit-avatar-div'><img className='modal-overlay__user-avatar' alt='avatar' src={avatarUrl} />
                        <label className='modal-overlay__upload-avatar' htmlFor='avatar-input' id='avatar'>
                            <div className='modal-overlay__input-button'>Choose a new photo</div>
                            <input className='modal-overlay__upload-input' id='avatar-input' name='avatar-input' type='file'
                                onChange={(event) => {
                                    setAvatarUpload(event.target.files[0])
                                }}></input>
                        </label>
                        <button className='modal-overlay__upload-button' type='submit' onClick={() => uploadAvatar()}>New profile picture</button>
                    </div>
                </div>
            </div>
            <span className="modal-overlay__close" onClick={closeModal}>
            </span>
        </div>
    )

};

export default BookingModal;