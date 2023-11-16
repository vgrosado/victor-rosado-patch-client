import '../ArtistDiv/ArtistDiv.scss'
import { Link } from 'react-router-dom';
import {FaUser} from 'react-icons/fa';

function ArtistDiv({artists}) {
    console.log(artists)
    if (artists.image === null ) {
        return ( <Link className='artist-container' to={`/Profile/${artists.id}`}>
        <div className='artist-container__image-empty'><FaUser size={80} className='artist-container__placeholder'/></div>
    <label className='artist-container__name'>{artists.name}</label>
</Link> )
    }
    return (
        <Link className='artist-container' to={`/Profile/${artists.id}`}>
                <img className='artist-container__image' alt='dj' src={artists.image} />
            <label className='artist-container__name'>{artists.name}</label>
        </Link>
    )
};

export default ArtistDiv;