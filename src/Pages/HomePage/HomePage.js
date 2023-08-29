import '../HomePage/HomePage.scss'

function HomePage() {
    return (
        <main className='homepage'>
            <article className='homepage__main-container'>
            <div className='homepage__search-container'>
                <div className='homepage__avatar'></div>
                <input className='homepage__search-input' placeholder='Search'></input>
            </div>
            <div className='homepage__header-div'>
                <h1 className='homepage__heading'>Discover</h1>
                    <div className='homepage__select-div'>
                        <label className='homepage__subheading'>Search By:</label>
                        <select className='homepage__select'>
                            <option value="" disabled selected hidden>Genre</option>
                            <option>Genre</option>
                            <option>Artist</option>
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
            <div className='homepage__nav'></div>
        </main>
        
    )
};

export default HomePage;