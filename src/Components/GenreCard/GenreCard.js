import { Link } from 'react-router-dom';
import '../GenreCard/GenreCard.scss';

function GenreCard({ users, genre }) {

    const genreHeader = genre[0].toUpperCase() + genre.substring(1);
    
    return (
        <article className='genrecard'>

            <h2 className='genrecard__heading'>{genreHeader}</h2>
            <div className='genrecard__div'>
                {users.map((user) => (
                    user.genre === genre && (

                        <div className='genrecard__container' key={user.id}>
                            <Link className='genrecard__link' to={`/Profile/${user?.id}`}>
                                <img className='genrecard__image' alt='dj' src={user?.avatar} />
                                <label className='genrecard__name'>{user?.displayName}</label>
                            </Link>
                        </div>

                    )
                ))}
            </div>
        </article>
    )
};

export default GenreCard;