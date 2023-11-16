import '../Nav/Nav.scss';
import {SlUser} from 'react-icons/sl';
import {SlHome} from 'react-icons/sl';
import {PiBooks} from 'react-icons/pi';
import { Link } from 'react-router-dom';
import {BiLogOut} from 'react-icons/bi';
import { signOut } from 'firebase/auth';


function Nav({openModal, auth}) {

    const logout = async () => {
        await signOut(auth)
	}

    return (
        <div className='nav'>
        <div className='nav__div'>
        <Link to={"/Home"}><SlHome className='nav__icons'/></Link>
            <p className='nav__label' >Home</p>
        </div>
        <div className='nav__div'>
            <Link><SlUser className='nav__icons'/></Link>
            <p className='nav__label'>Profile</p>
        </div>  
        <div className='nav__div'>
            <Link><PiBooks onClick={openModal} className='nav__icons'/></Link>
            <p className='nav__label'>Bookings</p>
        </div>
        <div className='nav__div'>
        <Link to={"/"}><BiLogOut className='nav__icons' onClick={logout}/></Link>
            <p className='nav__label'>Log Out</p>
        </div>
    </div>
    )
}

export default Nav;