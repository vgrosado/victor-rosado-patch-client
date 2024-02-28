import '../Nav/Nav.scss';
import { FiUser } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { SlGlobe } from "react-icons/sl";
// import { PiBooks } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";
import { logOut } from '../../Firebase';
import { IoCloudUploadOutline } from "react-icons/io5";

function Nav({ currentUser, setLoading, active }) {

    const navigateTo = useNavigate();

    async function handleLogOut() {
        setLoading(true)
        try {
            await logOut();
            alert('you have been successfully logged out')
            console.log("logged out => " + currentUser?.email)
        } catch {
            console.log('Error Loggin Out User')
        }
        setLoading(false);
        navigateTo('/')
    }

    function handleGuest() {
        if (!currentUser) {
            alert('Must be signed in')
        }
    }

    return (
        <div className='nav'>
            {currentUser ? <Link className='nav__link' to={`/Profile/${currentUser?.uid}`}><div className='nav__div'>
                <FiUser color={active === 'profile' ? '#ff7b00' : 'grey'} size={24} />
                <p className={active === 'profile' ? 'nav__label-active' : 'nav__label'}>Profile</p>
            </div></Link> : <div onClick={handleGuest} className='nav__div'>
                <FiUser color='grey' size={24} />
                <p className='nav__label'>Profile</p>
            </div>}
            {currentUser ? <Link className='nav__link' to={`/UploadMusic/${currentUser?.uid}`}> <div className='nav__div'>
                <IoCloudUploadOutline color={active === 'upload' ? '#ff7b00' : 'grey'} size={24} />
                <p className={active === 'upload' ? 'nav__label-active' : 'nav__label'}>Upload</p>
            </div></Link> : <div onClick={handleGuest} className='nav__div'>
                <IoCloudUploadOutline color={active === 'upload' ? '#ff7b00' : 'grey'} size={24} />
                <p className='nav__label'>Upload</p>
            </div>}
            <Link className='nav__link' to={"/Discover"}><div className='nav__div'>
                <SlGlobe color={active === 'discover' ? '#ff7b00' : 'grey'} size={24} />
                <p className={active === 'discover' ? 'nav__label-active' : 'nav__label'}>Discover</p>
            </div></Link>
            {!currentUser ? <Link className='nav__link' to={"/"}><div className='nav__div'>
                <IoHomeOutline color={active === 'home' ? '#ff7b00' : 'grey'} size={24} />
                <p className='nav__label' >Home</p>
            </div></Link> : <></>}
            {currentUser ? <div className='nav__div'>
                <IoLogOutOutline color={active === 'logout' ? '#ff7b00' : 'grey'} size={24} onClick={handleLogOut} />
                <p className='nav__label'>Log Out</p>
            </div> :
                <></>
            }
        </div>
    )
}

export default Nav;