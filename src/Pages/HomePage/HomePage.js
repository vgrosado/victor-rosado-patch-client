import '../HomePage/HomePage.scss'
import { AiOutlineSearch } from 'react-icons/ai';
import { BiBell } from 'react-icons/bi';
import { BiEnvelope } from 'react-icons/bi';
import ArtistDiv from '../../Components/ArtistDiv/ArtistDiv';
import Nav from '../../Components/Nav/Nav';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserCard from '../../Components/UserCard/UserCard';

function HomePage({ currentUser, users }) {
    console.log("currently logged in user => " + currentUser?.email)


    return (
        <main className='homepage'>
            <article className='homepage__main-container'>
                <div className='homepage__search-container'>
                    <div className='homepage__header-container'>
                        <Link to={`/Profile/${currentUser?.uid}`}><div className='homepage__avatar-div'>
                            {currentUser?.photoURL === null ? (<FaUser size={40} className='homepage__avatar-placeholder' />)
                                : (<div className='homepage__avatar-div'><img className='homepage__avatar' src={currentUser?.photoURL} /></div>)}
                        </div>
                        </Link>
                        <h2 className='homepage__logo'>P<span className='homepage__flicker'>A</span>TCH</h2>
                        <div className='homepage__icons-container'>
                            <BiEnvelope className='homepage__header-icons' />
                            <BiBell className='homepage__header-icons' />
                        </div>
                    </div>
                    <div className='homepage__input-div'>
                        <input className='homepage__search-input' placeholder='Search'></input>
                        <AiOutlineSearch className='homepage__search-icon' />
                    </div>
                </div>
                <div className='homepage__subheader-div'>
                    <h1 className='homepage__heading'>Discover</h1>
                    <div className='homepage__select-div'>
                        <label className='homepage__subheading'>Search By:</label>
                        <select className='homepage__select'>
                            <option className='homepage__option' value="" disabled hidden>Genre</option>
                            <option className='homepage__option'>Genre</option>
                            <option className='homepage__option'>Artist</option>
                        </select>
                    </div>
                </div>
                <section className='homepage__container'>
                    <>
                    </>
                    {users.map(user => (
                        <UserCard key={user.id} currentUser={currentUser} user={user} />
                    ))}
                </section>
            </article>
            <Nav currentUser={currentUser} />
        </main>
    )
};

export default HomePage;