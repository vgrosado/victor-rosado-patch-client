import { useEffect, useRef, useState } from 'react';
import Nav from '../../Components/Nav/Nav';
import '../EditProfile/EditProfile.scss';
import { FaPencil, FaUser } from 'react-icons/fa6';
import { TbCameraPlus } from "react-icons/tb";
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../Firebase';
import { getAuth, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import BookingModal from '../../Components/UploadImageModal/UploadImageModal';


function EditProfile({ currentUser, user, avatarUrl, setAvatarUrl}) {
    if (!currentUser) {
        <>Loading</>
    };

    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [updateUserName, setUpdateUserName] = useState(currentUser?.displayName);
    const [updateName, setUpdateName] = useState(user?.name);
    const [updateWebsite, setUpdateWebsite] = useState(user?.website);
    const [updateLocation, setUpdateLocation] = useState(user?.location);
    const [updateBio, setUpdateBio] = useState(user?.bio);
    const [imageUpload, setImageUpload] = useState(user?.backgroundimg?.current);
    const [avatarUpload, setAvatarUpload] = useState(null);
    const backgroundUrl = useRef(user?.backgroundimg?.current);
    const updatedUserData = {
        name: updateName,
        website: updateWebsite,
        location: updateLocation,
        bio: updateBio,
    };

    useEffect(() => {
        getAuth();
    },[currentUser?.photoURL])

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

    //upload/update user background image
    // function uploadImage() {
    //     // if (imageUpload === undefined) return;
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

    // const usersDocRef = doc(db, "users", `${id}`)
    // const getUser = async () => {
    //     await getDoc(usersDocRef)
    //         .then((doc) => {
    //             setUser(doc.data(), doc.id)
    //         })
    //         .catch(error => {
    //             console.log('error fetching video ID:s', error)
    //         });
    // };


    // useEffect(() => {
    //     getUser();
    // },[user])



    // function uploadAvatar() {
    //     if (avatarUpload == null) return;
    //     const avatarRef = ref(storage, `avatars/${avatarUpload?.name}`);
    //     uploadBytes(avatarRef, avatarUpload)
    //         .then(() => {
    //             getDownloadURL(avatarRef)
    //                 .then((url) => {
    //                     avatarUrl.current = url;
    //                     console.log(avatarUrl.current)
    //                 }).then(() => {
    //                      updateProfile(currentUser, {
    //                          photoURL: avatarUrl.current
    //                      });
                         
    //                  })
    //         }).catch((error) => {
    //             console.log(error.message);
    //         })
    // };



    
    function closeModal(){
        setModalOpen(false);
    };

    function openModal(){
        setModalOpen(true);
    };

    return (
        <section className='editprofile'>
            <div className='editprofile__background-container'>
                {!user?.backgroundimg?.current ? (<div className='user__header-background'></div>)
                    : (<img className='editprofile__header-background' src={user?.backgroundimg?.current} alt='user background' />)}
                <div className='editprofile__info-container'>
                    <div className='editprofile__avatar-div'>
                        {!currentUser?.photoURL ? 
                        (<div className='editprofile__avatar-empty'><FaUser size={60} className='user__avatar-placeholder' /> </div>) 
                        : 
                        (<div className='editprofile__edit-avatar-div'><img className='editprofile__user-avatar' alt='avatar' src={avatarUrl} />
                        {/* <label className='modal-overlay__upload-avatar' htmlFor='avatar-input' id='avatar'> */}
                            <TbCameraPlus onClick={openModal} size={40} className='editprofile__edit-avatar'/>
                            {/* <input className='modal-overlay__upload-input' id='avatar-input' name='avatar-input' type='file' 
                            onChange={(event) => {
                                setAvatarUpload(event.target.files[0])}}></input> */}
                        {/* </label> */}
                        </div>)}
                        {/* <button onClick={uploadAvatar}>Upload avatar</button> */}

                        {/* <label className='modal-overlay__upload-background' htmlFor='background-input' id='background'><FaPencil onClick={(event) => uploadImage(event)} size={12} />
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
                        <input autoComplete='off' className='editprofile__input' name='location' type='text' id='location' contentEditable={true} onChange={(event) => { setUpdateBio(event.target.value) }} value={updateBio}>
                        </input>
                    </label>
                    <button autoComplete='off' type='submit' className='editprofile__button' onClick={updateUser}>Submit</button>
                </div>
            </article>
            <BookingModal isModalOpen={isModalOpen} closeModal={closeModal} currentUser={currentUser} avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl}/>
            <Nav currentUser={currentUser} />
        </section>
    )

};

export default EditProfile;



