import '../UserCard/UserCard.scss'
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

function UserCard({ user, genre }) {
    console.log(user)
    if (!user.avatar) {
        return (<Link className='usercard' to={`/Profile/${user?.id}`}>
            <div className='usercard__image-empty'><FaUser size={80} color='#ff7b00' /></div>
            <label className='usercard__name'>{user?.displayName}</label>
        </Link>)
    }
    return (
        <>
        <Link className='usercard' to={`/Profile/${user?.id}`}>
            <img className='usercard__image' alt='dj' src={user?.avatar} />
            <label className='usercard__name'>{user?.displayName}</label>
        </Link>
        </>
    )
};

export default UserCard;