import '../HomePage/HomePage.scss'
import { AiOutlineSearch} from 'react-icons/ai';
import {SlUser} from 'react-icons/sl';
import {SlHome} from 'react-icons/sl';
import {PiBooks} from 'react-icons/pi';
import {HiOutlineInbox} from 'react-icons/hi';
import {BiBell} from 'react-icons/bi';
import {BiEnvelope} from 'react-icons/bi';
import {BiUpload} from 'react-icons/bi';




function HomePage() {
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
                            <option className='homepage__option' value="" disabled selected hidden>Genre</option>
                            <option className='homepage__option'>Genre</option>
                            <option className='homepage__option'>Artist</option>
                        </select>
                    </div>
                </div>
            <section className='homepage__container'>
                <div className='homepage__container-1'>
                    <div className='homepage__artist-div-1'></div>
                        <label className='homepage__name'>Richie Hawtin</label>
                    <div className='homepage__artist-div-2'></div>
                        <label className='homepage__name'>Jeff Mills</label>
                    <div className='homepage__artist-div-3'></div>
                        <label className='homepage__name'>Chlar</label>
                    <div className='homepage__artist-div-4'></div>
                        <label className='homepage__name'>IHateModels</label>
                    <div className='homepage__artist-div-1'></div>
                        <label className='homepage__name'>Richie Hawtin</label>
                    <div className='homepage__artist-div-2'></div>
                        <label className='homepage__name'>Jeff Mills</label>
                    <div className='homepage__artist-div-3'></div>
                        <label className='homepage__name'>Chlar</label>
                    <div className='homepage__artist-div-4'></div>
                        <label className='homepage__name'>IHateModels</label>
                </div>
                <div className='homepage__container-2'>
                    <div className='homepage__artist-div-5'></div>
                        <label className='homepage__name'>Fjaak</label>
                    <div className='homepage__artist-div-6'></div>
                        <label className='homepage__name'>LocoDice</label>
                    <div className='homepage__artist-div-7'></div>
                        <label className='homepage__name'>Rebekah</label>
                    <div className='homepage__artist-div-8'></div>
                        <label className='homepage__name'>Sweely</label>
                    <div className='homepage__artist-div-5'></div>
                        <label className='homepage__name'>Fjaak</label>
                    <div className='homepage__artist-div-6'></div>
                        <label className='homepage__name'>LocoDice</label>
                    <div className='homepage__artist-div-7'></div>
                        <label className='homepage__name'>Rebekah</label>
                    <div className='homepage__artist-div-8'></div>
                        <label className='homepage__name'>Sweely</label>
                </div>
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