import { useState } from 'react';
import '../EditUserBackgroundModal/EditUserBackgroundModal.scss';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../Firebase';

function EditUserBackgroundModal({ isBackgroundModalOpen, closeBackgroundModal, currentUser, userInfo, setBackgroundUrl, backgroundPlaceHolder, setBackgroundPlaceHolder }) {

    const [backgroundUpload, setBackgroundUpload] = useState("");

    function uploadBackground() {
        if (backgroundUpload == null) return;
        const backgroundRef = ref(storage, `userbackgroundimages/${backgroundUpload?.name}`);
        const userDocRef = doc(db, "users", `${currentUser?.uid}`)
        uploadBytes(backgroundRef, backgroundUpload)
            .then(() => getDownloadURL(backgroundRef))
            .then((url) => {
                setBackgroundUrl(url)
                console.log(url)
                updateDoc(userDocRef, {
                    backgroundimg: url
                })
            })
            .then(() => {
                alert('Image successfully uploaded!')
                closeBackgroundModal();
            })
            .catch((error) => {
                console.log(error.message);
            })
    };

    //update placeholder with selected input
    function placeHolderPreview(event) {
        let selectedFile = event.target.files[0];
        setBackgroundPlaceHolder(selectedFile);

        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setBackgroundPlaceHolder(objectUrl); 
        }
    };

    if (!isBackgroundModalOpen) return null;
    return (
        <div className="edituserbackgroundmodal">
            <div className='edituserbackgroundmodal__content'>
                    <div className='edituserbackgroundmodal__edit-background-div'><img className='edituserbackgroundmodal__user-background' alt='background image' src={backgroundPlaceHolder ? backgroundPlaceHolder : userInfo?.backgroundimg} />
                        <label className='edituserbackgroundmodal__upload-background' htmlFor='avatar-input' id='avatar'>
                            <div className='edituserbackgroundmodal__input-button'>Choose a new background</div>
                            <input className='edituserbackgroundmodal__upload-input' id='avatar-input' name='avatar-input' type='file' accept='image/*'
                                onChange={(event) => {
                                    setBackgroundUpload(event.target.files[0])
                                    placeHolderPreview(event)
                                }}
                            ></input>
                        </label>
                        {backgroundUpload ?
                        <button className='edituserbackgroundmodal__upload-button' type='submit' onClick={() => uploadBackground()}>Upload</button>
                        :<button className='edituserbackgroundmodal__upload-button-disabled' disabled type='submit'>Upload</button> }
                    </div>
                </div>
            <span className="edituserbackgroundmodal__close" onClick={closeBackgroundModal}>
            </span>
        </div>
    )
};

export default EditUserBackgroundModal;