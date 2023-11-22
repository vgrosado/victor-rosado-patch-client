
import '../UserProfile/UserProfile.scss';
import { useEffect, useState } from 'react';
import { doc, getDoc, getDocs, collection,  updateDoc } from "firebase/firestore";
import { db } from '../../Firebase';
import { Link, useParams } from 'react-router-dom';
import MediaPlayer from '../../Components/MediaPlayer/MediaPlayer';
import Nav from '../../Components/Nav/Nav';
import ReviewForm from '../../Components/ReviewForm/ReviewForm';
import Booking from '../../Components/Booking/Booking';
import UploadImageModal from '../../Components/UploadImageModal/UploadImageModal'
import { FaUser } from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import { SlPencil } from 'react-icons/sl';


function UserProfile({currentUser}) {
    const { id } = useParams();
    const usersId = id;
    const artistId = id;
    const [artist, setArtist] = useState({});
    const [user, setUser] = useState({});
    const [encorePage, setEncorePage] = useState(false);
    const [musicPage, setMusicPage] = useState(true);
    const [bookingPage, setBookingPage] = useState(false);
    const [music, setMusic] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const artistDocRef = doc(db, "Artists", `${artistId}`)
        getDoc(artistDocRef)
            .then((doc) => {
                setArtist(doc.data(), doc.id)
            })
            .catch(error => {
                console.log('error fetching video ID:s', error)
            });
    }, [artist])

    useEffect(() => {
        const getArtists = async () => {
            const musicData = await getDocs(collection(db, "Artists", `${artistId}`, "Music",));
            setMusic(musicData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };
        getArtists();
    }, [artistId]);

    useEffect(() => {
        const usersDocRef = doc(db, "users", `${currentUser?.uid}`)
        getDoc(usersDocRef)
            .then((doc) => {
                setUser(doc.data(), doc.id)
            })
            .catch(error => {
                console.log('error fetching video ID:s', error)
            });
    }, [user])

    function handleFollow() {
        const artistDocRef = doc(db, "Artists", `${artistId}`)
        updateDoc(artistDocRef, {followers: artist?.followers + 1})
        .then(() => {
            console.log(user?.followers)
        })
    }

    function handleNavToEncore() {
        setEncorePage(true)
        setMusicPage(false)
        setBookingPage(false)
    }

    function handleNavToMusic() {
        setEncorePage(false)
        setMusicPage(true)
        setBookingPage(false)
    }

    function handleNavToBooking() {
        setEncorePage(false)
        setMusicPage(false)
        setBookingPage(true)
    }

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    if (currentUser?.uid && !artist) {
        return (<>
            <section className='user'>
                <div className='user__background-container'>
                    { user?.backgroundimg === undefined ? (<div className='user__header-background'></div>) 
                    : (<img className='user__header-background' src={user?.backgroundimg} alt='user background'/>)}
                    <div className='user__info-container'>
                        <div className='user__avatar-div'>
                            {currentUser?.photoURL === undefined ? (<div className='user__avatar-empty'><FaUser size={60} className='user__avatar-placeholder' /></div>) : (<img className='user__avatar' alt='avatar' src={currentUser?.photoURL} />)}
                        </div>
                    </div>
                </div>
                <article className='user__stats-container'>
                    <div className='user__details-container'>
                        <div className='user__info-div'>
                            <p className='user__name'>{user?.name}</p>
                            <p className='user__username'>{currentUser?.displayName}</p>
                            <p className='user__location'></p>
                        </div>
                        <div className='user__button-div'>
                            <Link className='user__button-link' to={`/EditProfile/${currentUser?.uid}`}><button className='user__button'>Edit Profile<SlPencil className='user__edit-icon' size={12}/></button></Link>
                        </div>
                    </div>
                    <p className='user__bio'>{user?.bio}</p>
                    <div className='user__stats'>
                        <div className='user__nav-div'>
                            <div className='user__rating-div'>
                                <p className='user__stats-title'>Voltage</p>
                                <p className='user__rating'>{user?.rating}</p>
                            </div>
                            <p onClick={handleNavToMusic} className='user__nav-item'>Music</p>
                        </div>
                        <div className='user__nav-div'>
                            <div className='user__followers-div'>
                                <p className='user__stats-title'>Followers</p>
                                <p className='user__followers'>{user?.followers}</p>
                            </div>
                            <p onClick={handleNavToEncore} className='user__nav-item'>Encore</p>
                        </div>
                        <div className='user__booking-div'>
                            <p onClick={handleNavToBooking} className='user__nav-item'>Booking</p>
                        </div>
                    </div>
                    {musicPage && (<MediaPlayer music={music} />)}
                    {encorePage && (<ReviewForm artist={artist} />)}
                    {bookingPage && (<Booking artist={artist} />)}
                </article>
                <UploadImageModal isOpen={isModalOpen} closeModal={closeModal} />
                <Nav openModal={openModal} />
            </section>
        </>)
    }
    else
        return (
            <>
                <section className='user'>
                    <div className='user__background-container'>
                        <img className='user__header-background' src={artist.backgroundimg} alt='user background' />
                        <div className='user__info-container'>
                            <div className='user__avatar-div'>
                                <img className='user__avatar' alt='avatar' src={artist.image} />
                            </div>
                        </div>
                    </div>
                    <article className='user__stats-container'>
                        <div className='user__details-container'>
                            <div className='user__info-div'>
                                <p className='user__name'>{artist.name}</p>
                                <p className='user__username'>{artist.username}</p>
                                <p className='user__location'>{artist.location}</p>
                            </div>
                            <div className='user__button-div'>
                                <button className='user__button' onClick={handleFollow}>+ Follow</button>
                            </div>
                        </div>
                        <p className='user__bio'>{artist.description}</p>
                        <div className='user__stats'>
                            <div className='user__nav-div'>
                                <div className='user__rating-div'>
                                    <p className='user__stats-title'>Voltage</p>
                                    <p className='user__rating'>{artist.rating}</p>
                                </div>
                                <p onClick={handleNavToMusic} className='user__nav-item'>Music</p>
                            </div>
                            <div className='user__nav-div'>
                                <div className='user__followers-div'>
                                    <p className='user__stats-title'>Followers</p>
                                    <p className='user__followers'>{artist.followers}</p>
                                </div>
                                <p onClick={handleNavToEncore} className='user__nav-item'>Encore</p>
                            </div>
                            <div className='user__booking-div'>
                                <p onClick={handleNavToBooking} className='user__nav-item'>Booking</p>
                            </div>
                        </div>
                        {musicPage && (<MediaPlayer music={music} />)}
                        {encorePage && (<ReviewForm artist={artist} />)}
                        {bookingPage && (<Booking artist={artist} />)}
                    </article>
                    <UploadImageModal isOpen={isModalOpen} closeModal={closeModal} />
                    <Nav openModal={openModal} />
                </section>
            </>
        )
};
export default UserProfile;