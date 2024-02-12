import { useRef, useState } from 'react';
import '../EditUserBackgroundModal/EditUserBackgroundModal.scss';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../Firebase';

function EditUserBackgroundModal({isBackgroundModalOpen, closeBackgroundModal, currentUser, loggedUser, getUser}) {
    console.log(loggedUser?.backgroundimg)
    const [backgroundUpload, setBackgroundUpload] = useState("");
    const backgroundUrl = useRef();
    const [placeholder, setPlaceHolder] = useState(loggedUser?.backgroundimg)

    function uploadBackground() {
        if (backgroundUpload == null) return;
        const backgroundRef = ref(storage, `userbackgroundimages/${backgroundUpload?.name}`);
        const userDocRef = doc(db, "users", `${currentUser?.uid}`)
        uploadBytes(backgroundRef, backgroundUpload)
            .then(() => {
                getDownloadURL(backgroundRef)
                    .then((url) => {
                        backgroundUrl.current = url;
                        console.log(backgroundUrl)
                    }).then(() => {
                        updateDoc(userDocRef, {
                            backgroundimg: backgroundUrl.current
                        })
                    });
            }).catch((error) => {
                console.log(error.message);
            })
            getUser();
            closeBackgroundModal();
    };

    function placeHolderPreview(event) {
        let selectedFile = event.target.files[0];
        setPlaceHolder(selectedFile);

        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPlaceHolder(objectUrl); // Update the previewUrl state
        }
    };

    if (!isBackgroundModalOpen) return null;
    return (
        <div className="edituserbackgroundmodal">
        <div className='edituserbackgroundmodal__content'>
            <div className='edituserbackgroundmodal__background-div'>
                <div className='edituserbackgroundmodal__edit-background-div'><img className='edituserbackgroundmodal__user-background' alt='background image' src={placeholder} />
                    <label className='edituserbackgroundmodal__upload-background' htmlFor='avatar-input' id='avatar'>
                        <div className='edituserbackgroundmodal__input-button'>Choose a new background</div>
                        <input className='edituserbackgroundmodal__upload-input' id='avatar-input' name='avatar-input' type='file' accept='image/*'
                            onChange={(event) => {
                                setBackgroundUpload(event.target.files[0])
                                placeHolderPreview(event)
                            }}
                            ></input>
                    </label>
                    <button className='edituserbackgroundmodal__upload-button' type='submit' onClick={() => uploadBackground()}>Upload</button>
                </div>
            </div>
        </div>
        <span className="edituserbackgroundmodal__close" onClick={closeBackgroundModal}>
        </span>
    </div>
    )
};

export default EditUserBackgroundModal;