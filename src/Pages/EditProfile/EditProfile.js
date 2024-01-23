import { useRef, useState } from 'react';
import Nav from '../../Components/Nav/Nav';
import '../EditProfile/EditProfile.scss';
import { FaUser } from 'react-icons/fa6';
import { TbEdit } from "react-icons/tb";
import { FaImage } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../Firebase';
import {  updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import EditAvatarModal from '../../Components/EditAvatarModal/EditAvatarModal';
import DeleteUserModal from '../../Components/DeleteUserModal/DeleteUserModal';


function EditProfile({ currentUser, loggedUser }) {
    if (!currentUser) {
        <>Loading</>
    };
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [updateUserName, setUpdateUserName] = useState(currentUser?.displayName);
    const [updateName, setUpdateName] = useState(loggedUser?.name);
    const [updateWebsite, setUpdateWebsite] = useState(loggedUser?.website);
    const [updateLocation, setUpdateLocation] = useState(loggedUser?.location);
    const [updateBio, setUpdateBio] = useState(loggedUser?.bio);
    const [imageUpload, setImageUpload] = useState(loggedUser?.backgroundimg?.current);
    const backgroundUrl = useRef(loggedUser?.backgroundimg?.current);
    const updatedUserData = {
        name: updateName,
        website: updateWebsite,
        location: updateLocation,
        bio: updateBio,
        displayName: updateUserName
    };

    //update user profile information
    async function updateUser(event) {
        event.preventDefault();
        updateProfile(currentUser, {
            displayName: `${updateUserName}`
        }).then(() => {
            const usersDocRef = doc(db, "users", `${currentUser?.uid}`)
            updateDoc(usersDocRef, updatedUserData)
            console.log('itworked')
        }).catch((error) => {
            console.log(error.message)
        })
        navigate(`/Profile/${currentUser?.uid}`)
    };

    // upload/update user background image
    // function uploadImage() {
    //     if (imageUpload == undefined) return;
    //     const imageRef = ref(storage, `userbackgroundimages/${imageUpload?.name}`);
    //     const userRef = doc(db, "users", `${currentUser?.uid}`)
    //     uploadBytes(imageRef, imageUpload)
    //         .then(async () => {
    //             await getDownloadURL(imageRef)
    //                 .then(async (url) => {
    //                     backgroundUrl.current = url;
    //                     console.log("new background url " + user?.backgroundimg?.current)
    //                 }).then(async () => {
    //                     await updateDoc(userRef, {
    //                         backgroundimg: backgroundUrl
    //                     });
    //                 })
    //         }).catch((error) => {
    //             console.log(error.message);
    //         })
    // };

    function closeModal() {
        setModalOpen(false);
    };

    function openModal() {
        setModalOpen(true);
    };


    function closeDeleteModal() {
        setDeleteModalOpen(false);
    };

    function openDeleteModal() {
        setDeleteModalOpen(true);
    };

    return (
        <section className='editprofile'>
            <div className='editprofile__background-container'>
                {!loggedUser?.backgroundimg ? (<div className='user__header-background'></div>)
                    : (<img className='editprofile__header-background' src={loggedUser?.backgroundimg} alt='user background' />)}
                <div className='editprofile__info-container'>
                    <div className='editprofile__avatar-div'>
                        {!currentUser?.photoURL ?
                            (<div className='editprofile__avatar-empty'><TbCameraPlus stroke='white' onClick={openModal} size={40} className='editprofile__edit-avatar' />
                                <FaUser onClick={openModal} size={60} className='user__avatar-placeholder' /> </div>)
                            :
                            (<div className='editprofile__edit-avatar-div'><img className='editprofile__user-avatar' alt='avatar' src={currentUser?.photoURL} />
                                <TbCameraPlus stroke='white' onClick={openModal} size={30} className='editprofile__edit-avatar' />
                            </div>)}

                        {/* <label className='modal-overlay__upload-background' htmlFor='background-input' id='background'>
                            <div className='editprofile__edit-background' onClick={(event) => uploadImage(event)}> <FaImage fill='white'/>Replace</div>
                            <input className='modal-overlay__upload-input' id='background-input' name='background-input' type='file' onChange={(event) => { setImageUpload(event.target.files[0]) }}></input>
                        </label> */}
                    </div>
                </div>
            </div>
            <article className='editprofile__form-container'>
                <div className='editprofile__form'>
                    <label className='editprofile__input-label' htmlFor='name'>Name
                        <input autoComplete='off' className='editprofile__input' type='text' name='name' id='name' contentEditable={true} onChange={(event) => { setUpdateName(event.target.value) }} value={updateName}>
                        </input>
                    </label>
                    <label className='editprofile__input-label' htmlFor='username'>Username
                        <input autoComplete='off' className='editprofile__input' type='text' name='username' id='username' contentEditable={true} onChange={(event) => { setUpdateUserName(event.target.value) }} value={updateUserName}>
                        </input>
                    </label>
                    <label className='editprofile__input-label' htmlFor='username'>Website
                        <input autoComplete='off' className='editprofile__input' type='url' name='website' id='website' contentEditable={true} onChange={(event) => { setUpdateWebsite(event.target.value) }} value={updateWebsite}>
                        </input>
                    </label>
                    <label className='editprofile__input-label' htmlFor='bio'>Location
                        <input autoComplete='off' className='editprofile__input' name='bio' type='text' id='bio' contentEditable={true} onChange={(event) => { setUpdateLocation(event.target.value) }} value={updateLocation}>
                        </input>
                    </label>
                    <label className='editprofile__input-label' htmlFor='location'>Bio
                        <textarea autoComplete='off' className='editprofile__input' name='location' type='text' id='location' contentEditable={true} onChange={(event) => { setUpdateBio(event.target.value) }} value={updateBio}>
                        </textarea>
                    </label>
                    <button autoComplete='off' type='submit' className='editprofile__button' onClick={updateUser}>Submit</button>
                    <p className='editprofile__delete-account' onClick={openDeleteModal}>Delete account</p>
                </div>
            </article>
            <DeleteUserModal isDeleteModalOpen={isDeleteModalOpen} closeDeleteModal={closeDeleteModal} currentUser={currentUser} />
            <EditAvatarModal isModalOpen={isModalOpen} closeModal={closeModal} currentUser={currentUser} />
            <Nav currentUser={currentUser} />
        </section>
    )

};

export default EditProfile;



