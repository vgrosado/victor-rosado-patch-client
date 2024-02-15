import '../Nav/Nav.scss';
import { FiUser } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { SlGlobe } from "react-icons/sl";
// import { PiBooks } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { IoLogOutOutline } from "react-icons/io5";
import { logOut } from '../../Firebase';
import { IoCloudUploadOutline } from "react-icons/io5";


function Nav({ currentUser }) {

    async function handleLogOut() {
        try {
            await logOut();
            alert('you have been successfully logged out')
            console.log("logged out => " + currentUser?.email)
        } catch {
            console.log('Error Loggin Out User')
        }
    }

    function handleGuest() {
        if (!currentUser) {
            alert('Must be signed in')
        }
    }

    return (
        <div className='nav'>
            {currentUser ? <Link className='nav__link'  to={`/Profile/${currentUser?.uid}`}><div className='nav__div'>
                <FiUser color='grey' size={24} />
                <p className='nav__label'>Profile</p>
            </div></Link> : <div onClick={handleGuest} className='nav__div'>
                <FiUser color='grey' size={24} />
                <p className='nav__label'>Profile</p>
            </div>}
            {currentUser ? <Link className='nav__link'  to={`/UploadMusic/${currentUser?.uid}`}> <div className='nav__div'>
                <IoCloudUploadOutline color='grey' size={24} />
                <p className='nav__label'>Upload</p>
            </div></Link> : <div onClick={handleGuest} className='nav__div'>
                <IoCloudUploadOutline color='grey' size={24} />
                <p className='nav__label'>Upload</p>
            </div>}
            <Link className='nav__link'  to={"/Discover"}><div className='nav__div'>
                <SlGlobe color='grey' size={24} />
                <p className='nav__label'>Discover</p>
            </div></Link>
            {!currentUser ? <Link className='nav__link'  to={"/"}><div className='nav__div'>
                <IoHomeOutline color='grey' size={24} />
                <p className='nav__label' >Home</p>
            </div></Link> : <></>}
            {currentUser ? <Link className='nav__link' to={"/"}> <div className='nav__div'>
                <IoLogOutOutline color='grey' size={24} onClick={handleLogOut} />
                <p className='nav__label'>Log Out</p>
            </div></Link> :
                <></>
            }
        </div>
    )
}

export default Nav;