
import '../UserProfile/UserProfile.scss';
import { useEffect, useState } from 'react';
import {doc, getDoc } from "firebase/firestore";
import {db} from '../../Firebase';
import { useParams } from 'react-router-dom';

function UserProfile() {
    const {id} = useParams();
    const artistId = id;
    const [artist, setArtist] = useState({});
    
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



    return (
        <section className='user'>
            <div className='user__header-container'>
                <div className='user__info-div'>
                    <img className='user__avatar' src={artist.image} />
                    <p className='user__name'>{artist.name}</p>
                    <p className='user__location'>{artist.location}</p>
                </div>
                <div className='user__stats'>
                    <div className='user__followers-div'>
                        <p className='user__followers'>{artist.followers}</p>
                    </div>
                    <div className='user__rating-div'>
                        <p className='user__rating'>{artist.rating}</p>
                    </div>
                    <div className='user__button-div'>
                        <button className='user__button'></button>
                    </div>
                </div>
            </div>
        </section>

    )
};
export default UserProfile;