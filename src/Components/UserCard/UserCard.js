import '../UserCard/UserCard.scss'
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

function UserCard({ use }) {
    console.log(use)
    if (!use.avatar) {
        return (<Link className='artist-container' to={`/Profile/${use?.id}`}>
            <div className='artist-container__image-empty'><FaUser size={80} className='artist-container__placeholder' /></div>
            <label className='artist-container__name'>{use?.name}</label>
        </Link>)
    }
    return (
        <Link className='artist-container' to={`/Profile/${use?.id}`}>
            <img className='artist-container__image' alt='dj' src={use?.avatar} />
            <label className='artist-container__name'>{use?.displayName}</label>
        </Link>
    )
};

export default UserCard;