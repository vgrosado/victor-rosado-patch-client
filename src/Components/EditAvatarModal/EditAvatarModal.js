import './EditAvatarModal.scss'
import { useRef, useState } from 'react';
import { storage } from '../../Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

function EditAvatarModal({ isModalOpen, closeModal, currentUser }) {
    const [avatarUpload, setAvatarUpload] = useState("");
    const avatarUrl = useRef();
    const [placeholder, setPlaceHolder] = useState(currentUser?.photoURL)

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
            closeModal();
    };

    function placeHolderPreview(event) {
        let selectedFile = event.target.files[0];
        setPlaceHolder(selectedFile);

        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPlaceHolder(objectUrl); // Update the previewUrl state
        }
    };

    if (!isModalOpen) return null;
    return (
        <div className="modal-overlay">
            <div className='modal-overlay__content'>
                <div className='modal-overlay__avatar-div'>
                    <div className='modal-overlay__edit-avatar-div'><img className='modal-overlay__user-avatar' alt='avatar' src={placeholder} />
                        <label className='modal-overlay__upload-avatar' htmlFor='avatar-input' id='avatar'>
                            <div className='modal-overlay__input-button'>Choose a new photo</div>
                            <input className='modal-overlay__upload-input' id='avatar-input' name='avatar-input' type='file'
                                onChange={(event) => {
                                    setAvatarUpload(event.target.files[0])
                                    placeHolderPreview(event)
                                }}
                                ></input>
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