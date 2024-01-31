import { deleteDoc, doc } from 'firebase/firestore';
import '../TrackList/Tracklist.scss';
import { ImPlay3 } from "react-icons/im";
import { db } from '../../Firebase';
import { useParams } from 'react-router-dom';
import { FaRegTrashCan } from 'react-icons/fa6';

function TrackList({ music, getUserMusic, currentUser, user, handleSelectedTrack}) {
    const {id} = useParams();

    function deleteTrack(trackId) {
        const trackData = doc(db, "users", `${id}`, "Music", `${trackId}`)
        deleteDoc(trackData);
        getUserMusic();
    };

    return (
        <>
            <section className='tracklist'>
                {music.map((track, index) =>
                    <div key={index} className='track' onClick={() => handleSelectedTrack(track)}>
                        <div className='track__container'>
                            <div className='track__icon'><ImPlay3  fill='#191919' /></div>
                            <div className='track__details-div'>
                                <p className='track__artist'>{track.artist}</p>
                                <p className='track__title'>{track.title}</p>
                            </div>
                            {currentUser?.uid === user?.id ?
                                        <FaRegTrashCan color='#ff7b00' onClick={() => deleteTrack(track.id)}/>
                                        : ""}
                        </div>
                    </div>
                )}
            </section>
        </>
    )
};

export default TrackList;