import '../UserCard/UserCard.scss'
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

function UserCard({ user }) {
    console.log(user)
    if (!user.avatar) {
        return (<Link className='artist-container' to={`/Profile/${user?.id}`}>
            <div className='artist-container__image-empty'><FaUser size={80} className='artist-container__placeholder' /></div>
            <label className='artist-container__name'>{user?.name}</label>
        </Link>)
    }
    return (
        <Link className='artist-container' to={`/Profile/${user?.id}`}>
            <img className='artist-container__image' alt='dj' src={user?.avatar} />
            <label className='artist-container__name'>{user?.displayName}</label>
        </Link>
    )
};

export default UserCard;