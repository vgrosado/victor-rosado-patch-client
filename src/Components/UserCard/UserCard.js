import '../UserCard/UserCard.scss'
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

function UserCard({ user }) {
    return (
        <>
        <Link className='usercard' to={`/Profile/${user?.id}`}>
            {user?.avatar ? <img className='usercard__image' alt='dj' src={user?.avatar} /> :
            <img className='usercard__image' alt='dj' src='https://source.boringavatars.com/beam/120/Maria%20Mitchell?colors=ff7b00,191919,ffffff?square'/>}
            <label className='usercard__name'>{user?.displayName}</label>
        </Link>
        </>
    )
};

export default UserCard;