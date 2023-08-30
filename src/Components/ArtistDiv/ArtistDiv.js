import '../ArtistDiv/ArtistDiv.scss'

function ArtistDiv({artists}) {
    console.log(artists)
    return (
        <section className='artist-container'>
                <img className='artist-container__image' alt='dj' src={artists.image} />
            <label className='artist-container__name'>{artists.name}</label>
        </section>
        
    )
};

export default ArtistDiv;