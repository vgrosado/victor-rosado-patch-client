import Nav from '../../Components/Nav/Nav';
import '../EditProfile/EditProfile.scss';
import { FaUser } from 'react-icons/fa6';


function EditProfile({ users, currentUser }) {

    return (
        <section className='user'>
            <div className='user__background-container'>
                {users?.backgroundimg == undefined ? (<div className='user__header-background'></div>)
                    : (<img className='user__header-background' src={users?.backgroundimg} alt='user background' />)}
                <div className='user__info-container'>
                    <div className='user__avatar-div'>
                        {currentUser?.photoURL === undefined ? (<div className='user__avatar-empty'><FaUser size={60} className='user__avatar-placeholder' /></div>) : (<img className='user__avatar' alt='avatar' src={currentUser?.photoURL} />)}
                    </div>
                </div>
            </div>
            <article className='user__stats-container'>
                <div className='user__details-container'>
                    <div className='user__info-div'>
                        <p className='user__name'>{users?.name}</p>
                        <p className='user__username'>{currentUser?.displayName}</p>
                        <p className='user__location'></p>
                    </div>
                    <div className='user__button-div'>
                    </div>
                </div>
                <p className='user__bio'>{users?.bio}</p>
                <div className='user__stats'>
                    <div className='user__nav-div'>
                        <div className='user__rating-div'>
                            <p className='user__stats-title'>Voltage</p>
                            <p className='user__rating'>{users?.rating}</p>
                        </div>
                    </div>
                </div>
            </article>
            <Nav/>
        </section>
    )

};

export default EditProfile;



