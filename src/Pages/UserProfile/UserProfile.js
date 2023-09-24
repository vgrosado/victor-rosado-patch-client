
import '../UserProfile/UserProfile.scss';
import { useEffect, useState } from 'react';
import {doc, getDoc, getDocs, collection, updateDoc } from "firebase/firestore";
import {db} from '../../Firebase';
import { useParams } from 'react-router-dom';
import MediaPlayer from '../../Components/MediaPlayer/MediaPlayer';
import Nav from '../../Components/Nav/Nav';
import ReviewForm from '../../Components/ReviewForm/ReviewForm';
import Booking from '../../Components/Booking/Booking';
import BookingModal from '../../Components/BookingModal/BookingModal';
import {SlPencil} from 'react-icons/sl';
import {PiUserCirclePlusLight} from 'react-icons/pi';
import {storage} from '../../Firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {v4} from 'uuid';


function UserProfile() {
    const {id} = useParams();
    const artistId = id;
    const [artist, setArtist] = useState({});
    const [encorePage, setEncorePage] = useState(false);
    const [musicPage, setMusicPage] = useState(true);
    const [bookingPage, setBookingPage] = useState(false);
    
    useEffect(() => {
    const artistDocRef = doc(db, "Artists", `${artistId}`)
    getDoc(artistDocRef)
    .then((doc) => {
        setArtist(doc.data(), doc.id)
        console.log(artist)
    })
    .catch(error => {
        console.log('error fetching video ID:s', error)
    });
}, [])

const [music, setMusic] = useState([]);

useEffect(() => {
    const getArtists = async () => {
        const musicData = await getDocs(collection(db, "Artists", `${artistId}`, "Music",));
        console.log(musicData)
        setMusic(musicData.docs.map((doc) => ({...doc.data(), id: doc.id})))
        console.log(music)
    };

    getArtists();
}, [])


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

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const [imageUpload, setImageUpload] = useState(null);
    const [avatarUpload, setAvatarUpload] = useState(null);
    const [url, setUrl] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);

    
    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `userbackgroundimages/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            getDownloadURL(imageRef).then((url) => {
                console.log(url)
                setUrl(url)
            })
            const artRef = doc(db, "Artists", `${artistId}`)
            console.log(url)
            updateDoc(artRef, {
                backgroundimg: `${url}`
            })
        }).catch((error) => {
            console.log(error.message);
        }) 
    };



    const uploadAvatar = () => {
        if (avatarUpload == null) return;
        const avatarRef = ref(storage, `avatars/${avatarUpload.name + v4()}`);
        uploadBytes(avatarRef, avatarUpload).then(() => {
            getDownloadURL(avatarRef).then((avatarUrl) => {
                console.log(avatarUrl)
                setAvatarUrl(avatarUrl)
            })
            const artRef = doc(db, "Artists", `${artistId}`)
            console.log(avatarUrl)
            updateDoc(artRef, {
                image:  `${avatarUrl}`
            })
        }).catch((error) => {
            console.log(error.message);
        }) 
    };


    // if ( artist.image || artist.backgroundimg === null) {
    //     return ( <>
    //         <section className='user'>
    //             <div className='user__background-container'>
    //                 <div className='user__header-background'></div>
    //                     <div className='user__info-container'>
    //                         <div className='user__avatar-div'>
    //                             <div className='user__avatar-empty'>
    //                                 <label for='avatar-input'>
    //                                     <PiUserCirclePlusLight onClick={uploadAvatar} size={32} className='user__upload-icon'/>
    //                                 </label>
    //                                 <input className='user__upload-input' id='avatar-input' type='file' onChange={(event) => {setAvatarUpload(event.target.files[0])}}></input>
    //                             </div>
    //                             <label for='background-input'>
    //                                 <SlPencil onClick={uploadImage} size={24} className='user__upload-icon'/>
    //                             </label>
    //                             <input className='user__upload-input' id='background-input' type='file' onChange={(event) => {setImageUpload(event.target.files[0])}}></input>
    //                         </div>
    //                     </div>
    //             </div>
    //             <article className='user__stats-container'>
    //                 <div className='user__details-container'>
    //                     <div className='user__info-div'>
    //                         <p className='user__name'>{artist.name}</p>
    //                         <p className='user__username'>{artist.username}</p>
    //                         <p className='user__location'>{artist.location}</p>
    //                     </div>
    //                     <div className='user__button-div'>
    //                         <button className='user__button'>+ Follow</button>
    //                     </div>
    //                 </div>
    //                 <p className='user__bio'>{artist.description}</p>
    //                     <div className='user__stats'>
    //                         <div className='user__nav-div'>
    //                             <div className='user__rating-div'>
    //                                 <p className='user__stats-title'>Voltage</p>
    //                                 <p className='user__rating'>{artist.rating}</p>
    //                             </div>
    //                             <p onClick={handleNavToMusic} className='user__nav-item'>Music</p>
    //                         </div>
    //                     <div className='user__nav-div'>
    //                         <div className='user__followers-div'>
    //                             <p className='user__stats-title'>Followers</p>
    //                             <p className='user__followers'>{artist.followers}</p>
    //                         </div>
    //                         <p onClick={handleNavToEncore} className='user__nav-item'>Encore</p>
    //                     </div>
    //                     <div className='user__booking-div'>
    //                     <p onClick={handleNavToBooking} className='user__nav-item'>Booking</p>
    //                     </div>
    //                 </div>
    //                 {musicPage && ( <MediaPlayer music={music}/>)}
    //                 {encorePage && ( <ReviewForm artist={artist}/>)}
    //                 {bookingPage && (<Booking artist={artist} />)}
    //             </article>
    //             <BookingModal isOpen={isModalOpen} closeModal={closeModal}/>
    //             <Nav openModal={openModal} />
    //         </section>
    //         </>)
    // }

    console.log(artist.backgroundimg)
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
                {musicPage && ( <MediaPlayer music={music}/>)}
                {encorePage && ( <ReviewForm artist={artist}/>)}
                {bookingPage && (<Booking artist={artist} />)}
            </article>
            <BookingModal isOpen={isModalOpen} closeModal={closeModal}/>
            <Nav openModal={openModal} />
        </section>
        </>
    )
};
export default UserProfile;