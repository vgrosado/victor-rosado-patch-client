
import '../UserProfile/UserProfile.scss';
import { useEffect, useState } from 'react';
import {doc, getDoc, getDocs, collection } from "firebase/firestore";
import {db} from '../../Firebase';
import { useParams } from 'react-router-dom';
import MediaPlayer from '../../Components/MediaPlayer/MediaPlayer';
import Nav from '../../Components/Nav/Nav';
import ReviewForm from '../../Components/ReviewForm/ReviewForm';
import Booking from '../../Components/Booking/Booking';
import UploadImageModal from '../../Components/UploadImageModal/UploadImageModal'
import {FaUser} from 'react-icons/fa';
import { getAuth } from 'firebase/auth';
import {SlPencil} from 'react-icons/sl';

function UserProfile() {
    const auth = getAuth();
    const user = auth.currentUser;

    const {id} = useParams();
    const usersId = id;
    const artistId = id;
    const [artist, setArtist] = useState({});
    const [users, setUsers] = useState({});
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
    }, [artistId])

    useEffect(() => {
        const getArtists = async () => {
            const musicData = await getDocs(collection(db, "Artists", `${artistId}`, "Music",));
            setMusic(musicData.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };
        getArtists();
    }, [artistId]);

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


    function handleNavToEncore(){
        setEncorePage(true)
        setMusicPage(false)
        setBookingPage(false)
	}
	
	function handleNavToMusic(){
        setEncorePage(false)
		setMusicPage(true)
        setBookingPage(false)
	}
	
    function handleNavToBooking(){
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

    console.log()

    if (user && !artist) {
        return ( <>
            <section className='user'>
                <div className='user__background-container'>
                   <img className='user__header-background' src={users?.backgroundimg} alt='user background'/>
                        <div className='user__info-container'>
                            <div className='user__avatar-div'>
                                { user.photoURL === null ? (<div className='user__avatar-empty'><FaUser size={60} className='user__avatar-placeholder'/></div>) : (<img className='user__avatar' alt='avatar'src={user?.photoURL} />) }
                            </div>
                            <SlPencil onClick={openModal} className='user__edit-icon' size={25} fill='white'/>
                        </div>
                </div>
                <article className='user__stats-container'>
                    <div className='user__details-container'>
                        <div className='user__info-div'>
                            <p className='user__name'></p>
                            <p className='user__username'>{user?.displayName}</p>
                            <p className='user__location'></p>
                        </div>
                        <div className='user__button-div'>
                            <button className='user__button'>+ Follow</button>
                        </div>
                    </div>
                    <p className='user__bio'></p>
                        <div className='user__stats'>
                            <div className='user__nav-div'>
                                <div className='user__rating-div'>
                                    <p className='user__stats-title'>Voltage</p>
                                    <p className='user__rating'></p>
                                </div>
                                <p onClick={handleNavToMusic} className='user__nav-item'>Music</p>
                            </div>
                        <div className='user__nav-div'>
                            <div className='user__followers-div'>
                                <p className='user__stats-title'>Followers</p>
                                <p className='user__followers'></p>
                            </div>
                            <p onClick={handleNavToEncore} className='user__nav-item'>Encore</p>
                        </div>
                        <div className='user__booking-div'>
                        <p onClick={handleNavToBooking} className='user__nav-item'>Booking</p>
                        </div>
                    </div>
                    {musicPage && ( <MediaPlayer music={music}/>)}
                    {encorePage && ( <ReviewForm artist={artist}/>)}
                    {bookingPage && (<Booking artist={artist} />)}
                </article>
                <UploadImageModal isOpen={isModalOpen} closeModal={closeModal}/>
                <Nav openModal={openModal} />
            </section>
            </>)
    }
    else
    return (
        <>
        <section className='user'>
            <div className='user__background-container'>
                <img className='user__header-background' src={artist.backgroundimg} alt='user background'/>
                    <div className='user__info-container'>
                        <div className='user__avatar-div'>
                            <img className='user__avatar' alt='avatar'src={artist.image} />
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
                        <button className='user__button'>+ Follow</button>
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
                {musicPage && (<MediaPlayer music={music}/>)}
                {encorePage && (<ReviewForm artist={artist}/>)}
                {bookingPage && (<Booking artist={artist}/>)}
            </article>
            <UploadImageModal isOpen={isModalOpen} closeModal={closeModal}/>
            <Nav openModal={openModal} />
        </section>
        </>
    )
};
export default UserProfile;