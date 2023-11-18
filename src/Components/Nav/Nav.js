import '../Nav/Nav.scss';
import {SlUser} from 'react-icons/sl';
import {SlHome} from 'react-icons/sl';
import {PiBooks} from 'react-icons/pi';
import { Link } from 'react-router-dom';
import {BiLogOut} from 'react-icons/bi';
import { logOut } from '../../Firebase';


function Nav({openModal}) {

   async function handleLogOut() {
    try {
        await logOut();
    } catch {
        console.log('Error Loggin Out User')
    }
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
        <Link to={"/"}><BiLogOut className='nav__icons' onClick={handleLogOut()}/></Link>
            <p className='nav__label'>Log Out</p>
        </div>
    </div>
    )
}

export default Nav;