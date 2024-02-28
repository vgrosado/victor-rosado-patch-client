import { useEffect, useState } from 'react';
import Nav from '../../Components/Nav/Nav';
import '../EditProfile/EditProfile.scss';
import { FaImage, FaUser } from 'react-icons/fa6';
import { TbCameraPlus } from "react-icons/tb";
import { useNavigate} from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { updateProfile } from 'firebase/auth';
import EditAvatarModal from '../../Components/EditAvatarModal/EditAvatarModal';
import DeleteUserModal from '../../Components/DeleteUserModal/DeleteUserModal';
import EditUserBackgroundModal from '../../Components/EditUserBackgroundModal/EditUserBackgroundModal';


function EditProfile({ currentUser, setLoading, setActive, active }) {
    const navigate = useNavigate();
    const [backgroundPlaceHolder, setBackgroundPlaceHolder] = useState();
    const [userInfo, setUserInfo] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [isBackgroundModalOpen, setBackgroundModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [updateUserName, setUpdateUserName] = useState(currentUser?.displayName);
    const [updateName, setUpdateName] = useState(userInfo?.name);
    const [updateWebsite, setUpdateWebsite] = useState(userInfo?.website);
    const [updateLocation, setUpdateLocation] = useState(userInfo?.location);
    const [updateGenre, setUpdateGenre] = useState(userInfo?.genre);
    const [updateBio, setUpdateBio] = useState(userInfo?.bio);
	const [backgroundUrl, setBackgroundUrl] = useState(userInfo?.backgroundimg);
	const [avatarUrl, setAvatarUrl] = useState(userInfo?.avatar);
    const [updatedUserData, setUpdatedUserData] = useState({
        name: updateName,
        website: updateWebsite,
        location: updateLocation,
        genre: updateGenre,
        bio: updateBio,
        displayName: updateUserName
    })

    const formValues = {
        updateUserName,
        updateName,
        updateWebsite,
        updateLocation,
        updateGenre,
        updateBio,
    };

    useEffect(() => {
        setUpdatedUserData({
            name: updateName,
            website: updateWebsite,
            location: updateLocation,
            genre: updateGenre,
            bio: updateBio,
            displayName: updateUserName
        })
    }, [updateName, updateBio, updateGenre, updateLocation, updateUserName, updateWebsite])

    //get singlular user per profile
    async function getUserInfo() {
        const userDocRef = doc(db, "users", `${currentUser?.uid}`)
        getDoc(userDocRef)
            .then((doc) => {
                setUserInfo(doc.data(), doc.id)
            })
            .catch(error => {
                console.log('error fetching video ID:s', error)
            });
    }

    useEffect(() => {
        getUserInfo();
        setActive('profile')
    }, [currentUser?.uid, avatarUrl, backgroundUrl, backgroundPlaceHolder])

	console.log(userInfo)
	console.log(userInfo?.backgroundimg)
	console.log(userInfo?.avatar)

    useEffect(() => {
        if (userInfo) {
            setUpdateUserName(userInfo?.displayName || '');
            setUpdateName(userInfo?.name || '');
            setUpdateWebsite(userInfo?.website || '');
            setUpdateLocation(userInfo?.location || '');
            setUpdateGenre(userInfo?.genre || '');
            setUpdateBio(userInfo?.bio || '');
        }
    }, [userInfo]);

    //update user profile information
    async function updateUser(event) {
        event.preventDefault();
        updateProfile(currentUser, {
            displayName: updateName,
        }).then(() => {
            const usersDocRef = doc(db, "users", `${currentUser?.uid}`);
            updateDoc(usersDocRef, updatedUserData);
        }).catch((error) => {
            console.log(error.message);
        });
        alert('Information successfully updated!')
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
                {!userInfo?.backgroundimg ? (<div className='user__header-background'></div>)
                    : (<img className='editprofile__header-background' src={userInfo?.backgroundimg} alt='user background' />)}
                <div className='editprofile__info-container'>
                    <div className='editprofile__avatar-div'>
                        {!userInfo?.avatar ?
                            (<div className='editprofile__avatar-empty'><TbCameraPlus stroke='white' onClick={openModal} size={40} className='editprofile__edit-avatar' />
                                <FaUser onClick={openModal} size={60} className='user__avatar-placeholder' /> </div>)
                            :
                            <div className='editprofile__edit-avatar-div'><img className='editprofile__user-avatar' alt='avatar' src={userInfo?.avatar} />
                                <TbCameraPlus stroke='white' onClick={openModal} size={30} className='editprofile__edit-avatar' />
                            </div>}
                        <div className='editprofile__edit-background' onClick={openBackgroundModal}><FaImage className='editprofile__background-icon' fill='white' />Edit Background</div>
                    </div>
                </div>
            </div>
            <article className='editprofile__form-container'>
                <div className='editprofile__form'>
                    <label className='editprofile__input-label' htmlFor='name'>Name</label>
                        <input autoComplete='off' className='editprofile__input' type='text' name='name' id='name' onChange={(event) => { setUpdateName(event.target.value) }} value={updateName}>
                        </input>
                    <label className='editprofile__input-label' htmlFor='username'>Username</label>
                        <input autoComplete='off' className='editprofile__input' type='text' name='username' id='username' onChange={(event) => { setUpdateUserName(event.target.value) }} value={updateUserName}>
                        </input>
                    <label className='editprofile__input-label' htmlFor='username'>Website</label>
                        <input autoComplete='off' className='editprofile__input' type='url' name='website' id='website' onChange={(event) => { setUpdateWebsite(event.target.value) }} value={updateWebsite}>
                        </input>
                    <label className='editprofile__input-label' htmlFor='bio'>Location</label>
                        <input autoComplete='off' className='editprofile__input' name='location' type='text' id='location' onChange={(event) => { setUpdateLocation(event.target.value) }} value={updateLocation}>
                        </input>
                    <label className='editprofile__input-label' htmlFor='bio'>Genre</label>
                        <input autoComplete='off' className='editprofile__input' placeholder='Add a genre so others can find you' name='genre' type='text' id='genre' onChange={(event) => { setUpdateGenre(event.target.value) }} value={updateGenre}>
                        </input>
                    <label className='editprofile__input-label' htmlFor='location'>Bio</label>
                        <textarea autoComplete='off' className='editprofile__input-bio' name='bio' type='text' id='location' onChange={(event) => { setUpdateBio(event.target.value) }} value={updateBio}>
                        </textarea>
                    <button autoComplete='off' type='submit' className='editprofile__button' onClick={updateUser}>Submit</button>
                    <p className='editprofile__delete-account' onClick={openDeleteModal}>Delete account</p>
                </div>
            </article>
            <DeleteUserModal isDeleteModalOpen={isDeleteModalOpen} closeDeleteModal={closeDeleteModal} currentUser={currentUser} setLoading={setLoading}/>
            <EditAvatarModal setAvatarUrl={setAvatarUrl} avatarUrl={avatarUrl} isModalOpen={isModalOpen} closeModal={closeModal} currentUser={currentUser} />
            <EditUserBackgroundModal setBackgroundUrl={setBackgroundUrl} isBackgroundModalOpen={isBackgroundModalOpen} getUserInfo={getUserInfo} closeBackgroundModal={closeBackgroundModal} userInfo={userInfo} setBackgroundPlaceHolder={setBackgroundPlaceHolder} backgroundPlaceHolder={backgroundPlaceHolder} currentUser={currentUser} />
            <Nav active={active} setLoading={setLoading}  currentUser={currentUser} />
        </section>
    )

};

export default EditProfile;



