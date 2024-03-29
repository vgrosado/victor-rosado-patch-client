
import '../UserProfile/UserProfile.scss';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from '../../Firebase';
import { Link, useParams } from 'react-router-dom';
import MediaPlayer from '../../Components/MediaPlayer/MediaPlayer';
import Nav from '../../Components/Nav/Nav';
import ReviewForm from '../../Components/ReviewForm/ReviewForm';
import Booking from '../../Components/Booking/Booking';
import { IoLocationOutline } from "react-icons/io5";
import { LuLink } from "react-icons/lu";
import { SlPencil } from 'react-icons/sl';
import { PiVinylRecord } from "react-icons/pi";


function UserProfile({ currentUser, getBookings, bookings, setLoading, active, setActive }) {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [encorePage, setEncorePage] = useState(false);
    const [musicPage, setMusicPage] = useState(true);
    const [bookingPage, setBookingPage] = useState(false);
    const [music, setMusic] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    //get singlular user per profile
    async function getUser() {
        const userDocRef = doc(db, "users", `${id}`)
        getDoc(userDocRef)
            .then((doc) => {
                setUser(doc.data(), doc.id)
            })
            .catch(error => {
                console.log('error fetching video ID:s', error)
            });
    }

    async function getUserMusic() {
        const userMusicData = await getDocs(collection(db, "users", `${id}`, "Music",));
        setMusic(userMusicData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };

    useEffect(() => {
        getUser();
        getUserMusic();
        setActive('profile');
    }, [id]);


    function followFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
    };


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

    function openModal() {
        setModalOpen(true);
    };

    console.log(currentUser?.uid)
    console.log(user?.id)

    if (currentUser?.uid === user?.id) {
        return (<>
            <section className='user'>
                <div className='user__background-container'>
                    {!user?.backgroundimg ? (<div className='user__header-background'></div>)
                        : (<img className='user__header-background' src={user?.backgroundimg} alt='user background' />)}
                    <div className='user__info-container'>
                        <div className='user__avatar-div'>
                            {!currentUser?.photoURL ? (<div className='user__avatar-empty'><img className='user__avatar' alt='dj' src='https://source.boringavatars.com/beam/120/Maria%20Mitchell?colors=ff7b00,191919,ffffff?square' /></div>)
                                : (<img className='user__avatar' alt='avatar' src={currentUser?.photoURL} />)}
                            <div className='user__banner-div'><h2 className='user__banner'>{user?.displayName}</h2></div>
                        </div>
                    </div>
                </div>
                <article className='user__stats-container'>
                    <div className='user__details-container'>
                        <div className='user__info-div'>
                            <h2 className='user__heading'>About</h2>
                            <div className='user__button-div'>
                                <Link className='user__button-link' to={`/EditProfile/${currentUser?.uid}`}>
                                    <button className='user__button'>Edit Profile<SlPencil className='user__edit-icon' size={12} /></button>
                                </Link>
                            </div>
                        </div>
                        <p className='user__bio'>{user?.bio === null ? "Add a bio" : user?.bio}</p>
                        <div className='user__stats'>
                            <div className='user__rating-div'>
                                <p className='user__stats-title'>Voltage</p>
                                <p className='user__rating'>{user?.rating}</p>
                            </div>
                            <div className='user__followers-div'>
                                <p className='user__stats-title'>Bookings</p>
                                <p className='user__followers'>{followFormatter(user?.bookings)}</p>
                            </div>
                        </div>
                    </div>
                    {user?.genre === "" ? "" : <div className='user__genre-div'>
                        <PiVinylRecord stroke='grey' fill='grey' size={14} />
                        <p className='user__genre'>{user?.genre === null ? "Add a genre" : user?.genre}</p>
                    </div>}
                    <div className='user__contacts-container'>
                        <div className='user__location-div'>
                            <IoLocationOutline stroke='grey' strokeWidth={3} size={12} />
                            <p className='user__location'>{user?.location === null ? "Add your location" : user?.location}</p>
                        </div>
                        <div className='user__website-div'>
                            <LuLink stroke='grey' strokeWidth={3} size={12} />
                            {user?.website === null ? <p className='user__website'>Add a website</p> :
                                <Link to={user?.website} className='user__website'>{user?.website === null ? "Add your website" : user?.website}</Link>
                            }
                        </div>
                    </div>

                    <div className='user__nav-div'>
                        <p onClick={handleNavToMusic} className={musicPage && !encorePage && !bookingPage ? 'user__nav-item-active' : 'user__nav-item'}>MUSIC</p>
                        <p onClick={handleNavToEncore} className={encorePage && !bookingPage && !musicPage ? 'user__nav-item-active' : 'user__nav-item'}>ENCORE</p>
                        <p onClick={handleNavToBooking} className={bookingPage && !encorePage && !musicPage ? 'user__nav-item-active' : 'user__nav-item'}>BOOKING</p>
                    </div>
                    {musicPage && (<MediaPlayer currentUser={currentUser} user={user} music={music} getUserMusic={getUserMusic} />)}
                    {encorePage && (<ReviewForm currentUser={currentUser} user={user} />)}
                    {bookingPage && (<Booking getBookings={getBookings} currentUser={currentUser} bookings={bookings} user={user} />)}
                </article>
                {!currentUser ? <></> : <Nav active={active} currentUser={currentUser} setLoading={setLoading} user={user} openModal={openModal} />}
            </section >
        </>)
    }
    else if (user?.id !== currentUser?.uid) {
        return (
            <>
                <section className='user'>
                    <div className='user__background-container'>
                        {!user?.backgroundimg ? (<div className='user__header-background'></div>)
                            : (<img className='user__header-background' src={user?.backgroundimg} alt='user background' />)}
                        <div className='user__info-container'>
                            <div className='user__avatar-div'>
                                {!user?.avatar ? (<div className='user__avatar-empty'><img className='user__avatar' alt='dj' src='https://source.boringavatars.com/beam/120/Maria%20Mitchell?colors=ff7b00,191919,ffffff?square' /></div>)
                                    : (<img className='user__avatar' alt='avatar' src={user?.avatar} />)}
                                <div className='user__banner-div'><h2 className='user__banner'>{user?.displayName}</h2></div>
                            </div>
                        </div>
                    </div>

                    <article className='user__stats-container'>
                        <div className='user__details-container'>
                            <div className='user__info-div'>
                                <h2 className='user__heading'>About</h2>
                                <div className='user__button-div'>
                                    <button className='user__button' onClick={handleNavToBooking}>+ Book</button>
                                </div>
                            </div>
                            <p className='user__bio'>{user?.bio === null ? "Add a bio" : user?.bio}</p>
                            <div className='user__stats'>
                                <div className='user__rating-div'>
                                    <p className='user__stats-title'>Voltage</p>
                                    <p className='user__rating'>{user?.rating}</p>
                                </div>
                                <div className='user__followers-div'>
                                    <p className='user__stats-title'>Bookings</p>
                                    <p className='user__followers'>{followFormatter(user?.bookings)}</p>
                                </div>
                            </div>
                        </div>
                        {user?.genre === "" ? "" : <div className='user__genre-div'>
                            <PiVinylRecord stroke='grey' fill='grey' size={14} />
                            <p className='user__genre'>{user?.genre === null ? "Add a genre" : user?.genre}</p>
                        </div>}
                        <div className='user__contacts-container'>
                            <div className='user__location-div'>
                                <IoLocationOutline stroke='grey' strokeWidth={3} size={12} />
                                <p className='user__location'>{user?.location === null ? "Add your location" : user?.location}</p>
                            </div>
                            <div className='user__website-div'>
                                <LuLink stroke='grey' strokeWidth={3} size={12} />
                                {user?.website === null ? <p className='user__website'>Add a website</p> :
                                    <Link to={user?.website} className='user__website'>{user?.website === null ? "Add your website" : user?.website}</Link>
                                }
                            </div>
                        </div>

                        <div className='user__nav-div'>
                            <p onClick={handleNavToMusic} className={musicPage && !encorePage && !bookingPage ? 'user__nav-item-active' : 'user__nav-item'}>MUSIC</p>
                            <p onClick={handleNavToEncore} className={encorePage && !bookingPage && !musicPage ? 'user__nav-item-active' : 'user__nav-item'}>ENCORE</p>
                            <p onClick={handleNavToBooking} className={bookingPage && !encorePage && !musicPage ? 'user__nav-item-active' : 'user__nav-item'}>BOOKING</p>
                        </div>
                        {musicPage && (<MediaPlayer currentUser={currentUser} user={user} music={music} getUserMusic={getUserMusic} />)}
                        {encorePage && (<ReviewForm currentUser={currentUser} user={user} />)}
                        {bookingPage && (<Booking getBookings={getBookings} currentUser={currentUser} bookings={bookings} user={user} />)}
                    </article>
                    <Nav setLoading={setLoading} active={active} currentUser={currentUser} user={user} openModal={openModal} />
                </section >
            </>
        )
    }
};
export default UserProfile;