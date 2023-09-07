import '../Nav/Nav.scss';
import {SlUser} from 'react-icons/sl';
import {SlHome} from 'react-icons/sl';
import {PiBooks} from 'react-icons/pi';
import {BiUpload} from 'react-icons/bi';
import { Link } from 'react-router-dom';

function Nav({artists}) {
    console.log(artists)
    return (
        <div className='nav'>
        <div className='nav__div'>
            <SlHome className='nav__icons'/>
            <Link className='nav__label' to={"/Home"}><p>Home</p></Link>
        </div>
        <div className='nav__div'>
            <SlUser className='nav__icons'/>
            <p className='nav__label'>Profile</p>
        </div>  
        <div className='nav__div'>
            <BiUpload className='nav__icons'/>
            <p className='nav__label'>Upload</p>
        </div>
        <div className='nav__div'>
            <PiBooks className='nav__icons'/>
            <p className='nav__label'>Bookings</p>
        </div>
    </div>
    )
}

export default Nav;