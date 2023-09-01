import './Tracks.scss';

function Tracks({artist}) {
    
    return (
        <div className='tracks'>
            <h3 className='tracks__song-name'>{artist.music[0]}</h3>
        </div>
    )
};

export default Tracks;