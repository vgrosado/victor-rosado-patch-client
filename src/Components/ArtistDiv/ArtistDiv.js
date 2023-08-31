import '../ArtistDiv/ArtistDiv.scss'
import { Link } from 'react-router-dom';

function ArtistDiv({artists}) {
    console.log(artists)
    return (
        <Link className='artist-container' to={`/Profile/${artists.id}`}>
                <img className='artist-container__image' alt='dj' src={artists.image} />
            <label className='artist-container__name'>{artists.name}</label>
        </Link>
    )
};

export default ArtistDiv;