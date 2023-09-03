import './Tracks.scss';

function Tracks({song}) {
    
    return (
        <div className='tracks'>
            <h3 className='tracks__song-name'>{song.title}</h3>
        </div>
    )
};

export default Tracks;