import { useEffect, useState } from 'react';
import Nav from '../../Components/Nav/Nav';
import '../EditProfile/EditProfile.scss';
import { FaUser } from 'react-icons/fa6';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { updateProfile } from 'firebase/auth';


function EditProfile({ currentUser }) {

    const [users, setUsers] = useState({});
    const navigate = useNavigate();
    const [updateUserName, setUpdateUserName] = useState("");
    const [updateName, setUpdateName] = useState("");
    const [updateWebsite, setUpdateWebsite] = useState("");
    const [updateLocation, setUpdateLocation] = useState("");
    const [updateBio, setUpdateBio] = useState("");
    const updatedUserData = {
        name: updateName,
        website: updateWebsite,
        location: updateLocation,
        bio: updateBio,
    }
    const { id } = useParams();
    const usersId = id;

    useEffect(() => {
        const usersDocRef = doc(db, "users", `${usersId}`)
        getDoc(usersDocRef)
            .then((doc) => {
                setUsers(doc.data(), doc.id)
            })
            .catch(error => {
                console.log('error fetching video ID:s', error)
            });
    }, [usersId])

    function updateUser(event) {
        event.preventDefault();
        updateProfile(currentUser,{
            displayName: updateUserName
        }).then(() => {
                const usersDocRef = doc(db, "users", `${usersId}`)
                updateDoc(usersDocRef, updatedUserData)
                console.log('itworked')
            }).catch((error) => {
                console.log(error.message)
            })
            navigate(`/Profile/${currentUser?.uid}`)
    };


    return (
        <section className='editprofile'>
            <div className='editprofile__background-container'>
                {users?.backgroundimg === undefined ? (<div className='user__header-background'></div>)
                    : (<img className='editprofile__header-background' src={users?.backgroundimg} alt='user background' />)}
                <div className='editprofile__info-container'>
                    <div className='editprofile__avatar-div'>
                        {currentUser?.photoURL === undefined ? (<div className='editprofile__avatar-empty'><FaUser size={60} className='user__avatar-placeholder' /></div>) : (<img className='user__avatar' alt='avatar' src={currentUser?.photoURL} />)}
                    </div>
                </div>
            </div>
            <article className='editprofile__form-container'>
                <div className='editprofile__form'>
                    <label className='editprofile__input-label' htmlFor='name'>Name
                        <input autoComplete='off' className='editprofile__input' type='text' name='name' id='name' contentEditable={true} onChange={(event) => { setUpdateName(event.target.value) }} placeholder={users?.name}>
                        </input>
                    </label>
                    <label className='editprofile__input-label' htmlFor='username'>Username
                        <input autoComplete='off' className='editprofile__input' type='text' name='username' id='username' contentEditable={true} onChange={(event) => { setUpdateUserName(event.target.value) }} placeholder={currentUser?.displayName}>
                        </input>
                    </label>
                    <label className='editprofile__input-label' htmlFor='username'>Website
                        <input autoComplete='off' className='editprofile__input' type='url' name='website' id='website' contentEditable={true} onChange={(event) => { setUpdateWebsite(event.target.value) }} placeholder={users?.website}>
                        </input>
                    </label>
                    <label className='editprofile__input-label' htmlFor='bio'>Location
                        <input autoComplete='off' className='editprofile__input' name='bio' type='text' id='bio' contentEditable={true} onChange={(event) => { setUpdateLocation(event.target.value) }} placeholder={users?.location}>
                        </input>
                    </label>
                    <label className='editprofile__input-label' htmlFor='location'>Bio
                        <input autoComplete='off' className='editprofile__input' name='location' type='text' id='location' contentEditable={true} onChange={(event) => { setUpdateBio(event.target.value) }} placeholder={users?.bio}>
                        </input>
                    </label>
                    <button autoComplete='off' type='submit' className='editprofile__button' onClick={updateUser}>Submit</button>
                </div>
            </article>
            <Nav />
        </section>
    )

};

export default EditProfile;



