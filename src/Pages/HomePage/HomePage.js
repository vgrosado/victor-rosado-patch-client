import '../HomePage/HomePage.scss'
import { AiOutlineSearch } from 'react-icons/ai';
import Nav from '../../Components/Nav/Nav';
import { Link } from 'react-router-dom';
import UserCard from '../../Components/UserCard/UserCard';
import { useEffect, useState } from 'react';
import GenreCard from '../../Components/GenreCard/GenreCard';
import { BiBell } from 'react-icons/bi';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

function HomePage({ currentUser, bookingNotification, getBookings, setLoading, setActive, active }) {

    const [searchInput, setSearchInput] = useState([]);
    const [sortBy, setSortBy] = useState("artist");
    const [users, setUsers] = useState([]);

    //get all users from database for homepage
    const usersCollectionRef = collection(db, "users")
    async function getUsers() {
        const Data = await getDocs(usersCollectionRef);
        setUsers(Data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };

    useEffect(() => {
        getUsers();
        setActive('discover')
    }, []);


    const filteredUsers = users.filter((user) => {
        const searchData = `${user.displayName}`.toLowerCase();
        return searchData.includes(String(searchInput).toLowerCase());
    });

    const newGenreArr = users.map((user) => {
        return user.genre;
    });

    const genresArr = [...new Set(newGenreArr)]

    const filteredGenres = genresArr.filter((genre) => {
        if (genre === "") return;
        const searchData = `${genre}`.toLowerCase();
        return searchData.includes(String(searchInput).toLowerCase());
    });

    function handleFilter(event) {
        setSortBy(event.target.value);
    };

    function handleNotification(bookingId) {
        alert(bookingNotification?.email + ' sent you a booking request!')
        const bookingDocRef = doc(db, "users", `${currentUser?.uid}`, "Bookings", `${bookingId}`);
        updateDoc(bookingDocRef, {
            isRead: true
        }).then(() => {
            getBookings();
            console.log('it worked');
        }).catch((error) => {
            console.log(error.message)
        })
    };


    return (
        <>
        <main className='homepage'>
            <article className='homepage__main-container'>
                <div className='homepage__search-container'>
                    <div className={!currentUser ? 'homepage__header-nouser' : 'homepage__header-container'}>
                        {!currentUser ? <></> : <Link to={`/Profile/${currentUser?.uid}`}>
                            <div className='homepage__avatar-div'>
                                {!currentUser?.photoURL ? (<img className='homepage__avatar-placeholder' alt='dj' src='https://source.boringavatars.com/beam/120/Maria%20Mitchell?colors=ff7b00,191919,ffffff?square' />)
                                    : (<img className='homepage__avatar' alt='avatar' src={currentUser?.photoURL} />)}
                            </div>
                        </Link>}
                        <Link className='homepage__logo-link' to={'/'}><h2 className='homepage__logo'>PATCH</h2></Link>
                        {!currentUser ? <></> : <div className='homepage__icons-container'>
                            {/* <BiEnvelope className='homepage__header-icons' /> */}
                            <Link to={`/Notifications/${currentUser?.uid}`}><BiBell className='homepage__header-icons' /></Link>
                            {bookingNotification?.isRead === false ? <div className='homepage__icon-notification' onClick={() => handleNotification(bookingNotification?.id)}></div> : ""}
                        </div>}
                    </div>
                    <div className='homepage__input-div'>
                        <input className='homepage__search-input' placeholder='Search' value={searchInput} onChange={(event) => setSearchInput(event.target.value)}></input>
                        <AiOutlineSearch className='homepage__search-icon' />
                    </div>
                </div>
                <div className='homepage__subheader-div'>
                    <h1 className='homepage__heading'>Discover</h1>
                    <div className='homepage__select-div'>
                        <label className='homepage__subheading'>Search By:</label>
                        <select className='homepage__select' value={sortBy} onChange={handleFilter}>
                            <option className='homepage__option' value="" disabled hidden>Artist</option>
                            <option className='homepage__option' value="artist">Artist</option>
                            <option className='homepage__option' value="genre">Genre</option>
                        </select>
                    </div>
                </div>
                {sortBy === 'artist' ? <section className='homepage__container'>
                    {filteredUsers.map((user, index) => (
                        <UserCard key={index} currentUser={currentUser} user={user} />
                    ))}
                </section> : <section className='homepage__container'>
                    <div className='homepage__genrecontainer'>
                        {filteredGenres.map((genre, index) =>
                            <GenreCard key={index} genre={genre} users={users} />
                        )}
                    </div>
                </section>}
            </article>
        </main>
        <Nav active={active} setLoading={setLoading} currentUser={currentUser} />
        </>
    )
};

export default HomePage;