import '../HomePage/HomePage.scss'
import { AiOutlineSearch } from 'react-icons/ai';
import { BiBell } from 'react-icons/bi';
import { BiEnvelope } from 'react-icons/bi';
import ArtistDiv from '../../Components/ArtistDiv/ArtistDiv';
import Nav from '../../Components/Nav/Nav';
import UploadImageModal from '../../Components/UploadImageModal/UploadImageModal';
import { useState } from 'react';



function HomePage({ artists }) {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    console.log(artists)

    return (
        <main className='homepage'>
            <article className='homepage__main-container'>
                <div className='homepage__search-container'>
                    <div className='homepage__header-container'>
                        <div className='homepage__avatar-div'><div className='homepage__avatar'></div></div> 
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
                    {artists.map(artist => (
                        <ArtistDiv key={artist.id} artists={artist} />
                    ))}
                </section>
            </article>
            <UploadImageModal isOpen={isModalOpen} closeModal={closeModal}/>
            <Nav openModal={openModal} />
        </main>
    )
};

export default HomePage;