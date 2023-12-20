import './EditAvatarModal.scss'
import { useRef, useState } from 'react';
import { storage } from '../../Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

function EditAvatarModal({ isModalOpen, closeModal, currentUser }) {
    const [avatarUpload, setAvatarUpload] = useState("");
    const avatarUrl = useRef();

    function uploadAvatar() {
        if (avatarUpload == null) return;
        const avatarRef = ref(storage, `avatars/${avatarUpload?.name}`);
        uploadBytes(avatarRef, avatarUpload)
            .then(() => {
                getDownloadURL(avatarRef)
                    .then((url) => {
                        avatarUrl.current = url;
                        console.log(avatarUrl)
                    }).then(() => {
                        updateProfile(currentUser, {
                            photoURL: avatarUrl.current
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
                    <div className='modal-overlay__edit-avatar-div'><img className='modal-overlay__user-avatar' alt='avatar' src={currentUser?.photoURL} />
                        <label className='modal-overlay__upload-avatar' htmlFor='avatar-input' id='avatar'>
                            <div className='modal-overlay__input-button'>Choose a new photo</div>
                            <input className='modal-overlay__upload-input' id='avatar-input' name='avatar-input' type='file'
                                onChange={(event) => {
                                    setAvatarUpload(event.target.files[0])
                                }}></input>
                        </label>
                        <button className='modal-overlay__upload-button' type='submit' onClick={() => uploadAvatar()}>Upload</button>
                    </div>
                </div>
            </div>
            <span className="modal-overlay__close" onClick={closeModal}>
            </span>
        </div>
    )

};

export default EditAvatarModal;