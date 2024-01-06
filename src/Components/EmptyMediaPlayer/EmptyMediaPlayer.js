import '../EmptyMediaPlayer/EmptyMediaPlayer.scss';
import { PiMusicNotesPlus } from "react-icons/pi";
import { Link } from 'react-router-dom';


function EmptyMediaPlayer({currentUser}) {

    return (
        <section className='emptymediaplayer'>
            <div className='emptymediaplayer__card'>
                <div className='emptymediaplayer__upload-div'>
                    <p className='emptymediaplayer__upload-title'>Start sharing your music today!</p>
                </div>
                <div className='emptymediaplayer__emptycontainer'> <Link to={`/UploadMusic/${currentUser?.uid}`} ><PiMusicNotesPlus size={80 } color='grey' /></Link>
                    <p className='emptymediaplayer__upload-subtitle'>Click on the icon above to get started</p>
                </div>
            </div>
        </section>
    )
};

export default EmptyMediaPlayer;