import '../UserCard/UserCard.scss'
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

function UserCard({ user }) {
    console.log(user)
    if (!user.avatar) {
        return (<Link className='usercard' to={`/Profile/${user?.id}`}>
            <div className='usercard__image-empty'><FaUser size={80} className='artist-container__placeholder' /></div>
            <label className='usercard__name'>{user?.displayName}</label>
        </Link>)
    }
    return (
        <Link className='usercard' to={`/Profile/${user?.id}`}>
            <img className='usercard__image' alt='dj' src={user?.avatar} />
            <label className='usercard__name'>{user?.displayName}</label>
        </Link>
    )
};

export default UserCard;