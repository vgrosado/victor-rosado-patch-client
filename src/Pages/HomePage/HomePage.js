import '../HomePage/HomePage.scss'
import { AiOutlineSearch} from 'react-icons/ai';
import {SlUser} from 'react-icons/sl';
import {SlHome} from 'react-icons/sl';
import {PiBooks} from 'react-icons/pi';
import {BiBell} from 'react-icons/bi';
import {BiEnvelope} from 'react-icons/bi';
import {BiUpload} from 'react-icons/bi';
import ArtistDiv from '../../Components/ArtistDiv/ArtistDiv';



function HomePage({artists}) {

console.log(artists)

    return (
        <main className='homepage'>
            <article className='homepage__main-container'>
            <div className='homepage__search-container'>
                <div className='homepage__header-container'>
                        <div className='homepage__avatar'></div>
                        <div className='homepage__icons-container'>
                            <BiEnvelope className='homepage__header-icons'/>
                            <BiBell className='homepage__header-icons'/>
                    </div>
                </div>
                        <div className='homepage__input-div'>
                            <input className='homepage__search-input' placeholder='Search'></input>
                            <AiOutlineSearch className='homepage__search-icon'/>
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
                {artists.map(artist => (
                <ArtistDiv key={artist.id} artists={artist}/>
                ))}
            </section>
            </article>
            <div className='homepage__nav'>
                <div className='homepage__nav-div'>
                    <SlHome className='homepage__nav-icons'/>
                    <p className='homepage__nav-label'>Home</p>
                </div>
                <div className='homepage__nav-div'>
                    <SlUser className='homepage__nav-icons'/>
                    <p className='homepage__nav-label'>Profile</p>
                </div>  
                <div className='homepage__nav-div'>
                    <BiUpload className='homepage__nav-icons'/>
                    <p className='homepage__nav-label'>Upload</p>
                </div>
                <div className='homepage__nav-div'>
                    <PiBooks className='homepage__nav-icons'/>
                    <p className='homepage__nav-label'>Bookings</p>
                </div>
            </div>
        </main>
    )
};

export default HomePage;