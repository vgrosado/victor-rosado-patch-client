import { useEffect, useRef, useState } from 'react';
import Nav from '../../Components/Nav/Nav';
import '../EditProfile/EditProfile.scss';
import { FaPencil, FaUser } from 'react-icons/fa6';
import { useNavigate} from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../Firebase';
import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

function EditProfile({ currentUser, user }) {
    const navigate = useNavigate();
    const [updateUserName, setUpdateUserName] = useState(currentUser?.displayName);
    const [updateName, setUpdateName] = useState(user?.name);
    const [updateWebsite, setUpdateWebsite] = useState(user?.website);
    const [updateLocation, setUpdateLocation] = useState(user?.location);
    const [updateBio, setUpdateBio] = useState(user?.bio);
    const [imageUpload, setImageUpload] = useState();
    const [avatarUpload, setAvatarUpload] = useState("");
    const backgroundUrl= useRef();
    const [avatarUrl, setAvatarUrl] = useState("");
    const updatedUserData = {
        name: updateName,
        website: updateWebsite,
        location: updateLocation,
        bio: updateBio,
    };

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

    async function uploadImage() {
        if (imageUpload === undefined) return;
        const imageRef = ref(storage, `userbackgroundimages/${imageUpload?.name}`);
        const userRef = doc(db, "users", `${currentUser.uid}`)
        await uploadBytes(imageRef, imageUpload)
            .then(async () => {
                await getDownloadURL(imageRef)
                    .then(async (url) => {
                        backgroundUrl.current = url;
                        console.log("new background url " + backgroundUrl?.current)
                    }).then(async () => {
                        await updateDoc(userRef, {
                            backgroundimg: backgroundUrl
                        });
                    })
            }).catch((error) => {
                console.log(error.message);
            })
    };


    useEffect(() => {
        uploadImage();
        console.log("current user background " + user?.backgroundimg?.current)
    }, [imageUpload])

    // function uploadAvatar() {
    //     if (currentUser) {
    //         const avatarRef = ref(storage, `avatars/${avatarUpload.name}`);
    //         uploadBytes(avatarRef, avatarUpload).then(() => {
    //             getDownloadURL(avatarRef).then((url) => {
    //                 setAvatarUrl(url)
    //             })
    //             updateProfile(currentUser, {
    //                 photoURL: avatarUrl
    //             })
    //         }).catch((error) => {
    //             console.log(error.message);
    //         })
    //     }
    // };

    return (
        <section className='editprofile'>
            <div className='editprofile__background-container'>
                {!user?.backgroundimg.current ? (<div className='user__header-background'></div>)
                    : (<img className='editprofile__header-background' src={user?.backgroundimg.current} alt='user background' />)}
                <div className='editprofile__info-container'>
                    <div className='editprofile__avatar-div'>
                        {currentUser?.photoURL === undefined ? (<div className='editprofile__avatar-empty'><FaUser size={60} className='user__avatar-placeholder' /></div>) : (<img className='user__avatar' alt='avatar' src={currentUser?.photoURL} />)}
                        <label className='modal-overlay__upload-background' htmlFor='background-input' id='background'><FaPencil onClick={() => uploadImage} size={12} />
                            <input className='modal-overlay__upload-input' id='background-input' name='background-input' type='file' onChange={(event) => { setImageUpload(event.target.files[0]) }}></input>
                        </label>
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
            <Nav currentUser={currentUser} />
        </section>
    )

};

export default EditProfile;



