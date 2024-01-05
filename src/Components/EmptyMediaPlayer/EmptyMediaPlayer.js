import '../EmptyMediaPlayer/EmptyMediaPlayer.scss';
import { PiMusicNotesPlus } from "react-icons/pi";


function EmptyMediaPlayer() {


    return (
        <section className='emptymediaplayer'>
            <div className='emptymediaplayer__card'>
                <div className='emptymediaplayer__upload-div'>
                    <p className='emptymediaplayer__upload-title'>Start sharing your music today!</p>
                </div>
                <div className='emptymediaplayer__emptycontainer'><PiMusicNotesPlus size={80 } color='grey' />
                    <p className='emptymediaplayer__upload-subtitle'>Click on the icon above to get started</p>
                </div>
            </div>
        </section>
    )
};

export default EmptyMediaPlayer;