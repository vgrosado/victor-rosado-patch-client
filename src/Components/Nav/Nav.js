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
            {currentUser ? <div className='nav__div'>
                <Link to={`/Profile/${currentUser?.uid}`}><FiUser color='grey' size={24} /></Link>
                <p className='nav__label'>Profile</p>
            </div> : <div onClick={handleGuest} className='nav__div'>
                <FiUser color='grey' size={24} />
                <p className='nav__label'>Profile</p>
            </div>}
            {currentUser ? <div className='nav__div'>
                <Link to={`/UploadMusic/${currentUser?.uid}`}><IoCloudUploadOutline color='grey' size={24} /></Link>
                <p className='nav__label'>Upload</p>
            </div> : <div onClick={handleGuest} className='nav__div'>
                <IoCloudUploadOutline color='grey' size={24} />
                <p className='nav__label'>Upload</p>
            </div>}
            <div className='nav__div'>
                <Link to={"/Discover"}><SlGlobe color='grey' size={24} /></Link>
                <p className='nav__label'>Discover</p>
            </div>
            {!currentUser ? <div className='nav__div'>
                <Link to={"/"}><IoHomeOutline color='grey' size={24} /></Link>
                <p className='nav__label' >Home</p>
            </div> : <></>}
            {currentUser ? <div className='nav__div'>
                <Link to={"/"}><IoLogOutOutline color='grey' size={24} onClick={handleLogOut} /></Link>
                <p className='nav__label'>Log Out</p>
            </div> :
                <></>
            }
        </div>
    )
}

export default Nav;