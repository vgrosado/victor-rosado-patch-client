import { Link } from 'react-router-dom';
import '../GenreCard/GenreCard.scss';

function GenreCard({ users, genre }) {


    return (
        <>
            <h2 className='genrecard__heading'>{genre}</h2>
            <article className='genrecard'>
                <div className='genrecard__div'>
                    {users.map((user) => (
                        user.genre === genre && (
                            <div className='genrecard__container' key={user.id}>
                                <Link className='genrecard__link' to={`/Profile/${user?.id}`}>
                                    {user?.avatar ? <img className='genrecard__image' alt='dj' src={user?.avatar} /> : <img className='genrecard__image' alt='dj' src='https://source.boringavatars.com/beam/120/Maria%20Mitchell?colors=ff7b00,191919,ffffff?square'/>}
                                    <label className='genrecard__name'>{user?.displayName}</label>
                                </Link>
                            </div>

                        )
                    ))}
                </div>
            </article>
        </>
    )
};

export default GenreCard;