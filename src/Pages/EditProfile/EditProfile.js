import { useEffect, useState } from 'react';
import Nav from '../../Components/Nav/Nav';
import '../EditProfile/EditProfile.scss';
import { FaImage, FaUser } from 'react-icons/fa6';
import { TbCameraPlus } from "react-icons/tb";
import {  useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { updateProfile } from 'firebase/auth';
import EditAvatarModal from '../../Components/EditAvatarModal/EditAvatarModal';
import DeleteUserModal from '../../Components/DeleteUserModal/DeleteUserModal';
import EditUserBackgroundModal from '../../Components/EditUserBackgroundModal/EditUserBackgroundModal';


function EditProfile({ currentUser, loggedUser, getUser }) {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isBackgroundModalOpen, setBackgroundModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [updateUserName, setUpdateUserName] = useState(currentUser?.displayName);
    const [updateName, setUpdateName] = useState(loggedUser?.name);
    const [updateWebsite, setUpdateWebsite] = useState(loggedUser?.website);
    const [updateLocation, setUpdateLocation] = useState(loggedUser?.location);
    const [updateGenre, setUpdateGenre] = useState(loggedUser?.genre);
    const [updateBio, setUpdateBio] = useState(loggedUser?.bio);
    const formValues = {
        updateUserName,
        updateName,
        updateWebsite,
        updateLocation,
        updateGenre,
        updateBio,
    };
    const updatedUserData = {
        name: updateName,
        website: updateWebsite,
        location: updateLocation,
        genre: updateGenre,
        bio: updateBio,
        displayName: updateUserName
    };


    useEffect(() => {
        if (loggedUser) {
            setUpdateUserName(loggedUser?.displayName || '');
            setUpdateName(loggedUser?.name || '');
            setUpdateWebsite(loggedUser?.website || '');
            setUpdateLocation(loggedUser?.location || '');
            setUpdateGenre(loggedUser?.genre || '');
            setUpdateBio(loggedUser?.bio || '');
        }
    }, [loggedUser]);

    //update user profile information
    async function updateUser(event) {
        event.preventDefault();
        updateProfile(currentUser, {
            displayName: updateName,
        }).then(() => {
            const usersDocRef = doc(db, "users", `${currentUser?.uid}`);
            updateDoc(usersDocRef, updatedUserData);
            console.log('it worked');
        }).catch((error) => {
            console.log(error.message);
        });

        navigate(`/Profile/${currentUser?.uid}`);
    };

    // Save form data to localStorage on bio change
    useEffect(() => {
        localStorage.setItem('formValues', JSON.stringify(formValues));
    }, []);

    // Load form data from localStorage on component mount
    useEffect(() => {
        const storedFormValues = JSON.parse(localStorage.getItem('formValues'));
        if (storedFormValues) {
            setUpdateUserName(storedFormValues.updateUserName || '');
            setUpdateName(storedFormValues.updateName || '');
            setUpdateWebsite(storedFormValues.updateWebsite || '');
            setUpdateLocation(storedFormValues.updateLocation || '');
            setUpdateGenre(storedFormValues.updateGenre || '');
            setUpdateBio(storedFormValues.updateBio || '');
        }
    }, []);

    function closeModal() {
        setModalOpen(false);
    };

    function openModal() {
        setModalOpen(true);
    };


    function closeBackgroundModal() {
        setBackgroundModalOpen(false);
    };

    function openBackgroundModal() {
        setBackgroundModalOpen(true);
    };


    function closeDeleteModal() {
        setDeleteModalOpen(false);
    };

    function openDeleteModal() {
        setDeleteModalOpen(true);
    };

    if (!currentUser) {
        <>Loading</>
    };



    return (
        <section className='editprofile'>
            <div className='editprofile__background-container'>
                {!loggedUser?.backgroundimg ? (<div className='user__header-background'></div>)
                    : (<img className='editprofile__header-background' src={loggedUser?.backgroundimg} alt='user background' />)}
                <div className='editprofile__info-container'>
                    <div className='editprofile__avatar-div'>
                        {!currentUser?.photoURL  ?
                            (<div className='editprofile__avatar-empty'><TbCameraPlus stroke='white' onClick={openModal} size={40} className='editprofile__edit-avatar' />
                                <FaUser onClick={openModal} size={60} className='user__avatar-placeholder' /> </div>)
                            :
                            <div className='editprofile__edit-avatar-div'><img className='editprofile__user-avatar' alt='avatar' src={currentUser?.photoURL} />
                                <TbCameraPlus stroke='white' onClick={openModal} size={30} className='editprofile__edit-avatar' />
                            </div>}
                            <div className='editprofile__edit-background' onClick={openBackgroundModal}><FaImage className='editprofile__background-icon' fill='white'/>Edit</div>
                    </div>
                </div>
            </div>
            <article className='editprofile__form-container'>
                <div className='editprofile__form'>
                    <label className='editprofile__input-label' htmlFor='name'>Name
                        <input autoComplete='off' className='editprofile__input' type='text' name='name' id='name' onChange={(event) => { setUpdateName(event.target.value) }} value={updateName}>
                        </input>
                    </label>
                    <label className='editprofile__input-label' htmlFor='username'>Username
                        <input autoComplete='off' className='editprofile__input' type='text' name='username' id='username' onChange={(event) => { setUpdateUserName(event.target.value) }} value={updateUserName}>
                        </input>
                    </label>
                    <label className='editprofile__input-label' htmlFor='username'>Website
                        <input autoComplete='off' className='editprofile__input' type='url' name='website' id='website' onChange={(event) => { setUpdateWebsite(event.target.value) }} value={updateWebsite}>
                        </input>
                    </label>
                    <label className='editprofile__input-label' htmlFor='bio'>Location
                        <input autoComplete='off' className='editprofile__input' name='location' type='text' id='location' onChange={(event) => { setUpdateLocation(event.target.value) }} value={updateLocation}>
                        </input>
                    </label>
                    <label className='editprofile__input-label' htmlFor='bio'>Genre
                        <input autoComplete='off' className='editprofile__input' placeholder='Add a genre so others can find you' name='genre' type='text' id='genre' onChange={(event) => { setUpdateGenre(event.target.value) }} value={updateGenre}>
                        </input>
                    </label>
                    <label className='editprofile__input-label' htmlFor='location'>Bio
                        <textarea autoComplete='off' className='editprofile__input' name='bio' type='text' id='location' onChange={(event) => { setUpdateBio(event.target.value) }} value={updateBio}>
                        </textarea>
                    </label>
                    <button autoComplete='off' type='submit' className='editprofile__button' onClick={updateUser}>Submit</button>
                    <p className='editprofile__delete-account' onClick={openDeleteModal}>Delete account</p>
                </div>
            </article>
            <DeleteUserModal isDeleteModalOpen={isDeleteModalOpen} closeDeleteModal={closeDeleteModal} currentUser={currentUser} />
            <EditAvatarModal isModalOpen={isModalOpen} closeModal={closeModal} currentUser={currentUser} />
            <EditUserBackgroundModal isBackgroundModalOpen={isBackgroundModalOpen} getUser={getUser} closeBackgroundModal={closeBackgroundModal} loggedUser={loggedUser} currentUser={currentUser}  />
            <Nav currentUser={currentUser} />
        </section>
    )

};

export default EditProfile;



