import '../Nav/Nav.scss';
import {SlUser} from 'react-icons/sl';
import {SlHome} from 'react-icons/sl';
import {PiBooks} from 'react-icons/pi';
import { Link, useParams } from 'react-router-dom';
import {BiLogOut} from 'react-icons/bi';
import { logOut } from '../../Firebase';
import { useAuth } from '../../Firebase';
import { getAuth } from 'firebase/auth';


function Nav({openModal}) {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user?.displayName)
   
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
            <Link to={`/Profile/${user?.uid}`}><SlUser className='nav__icons'/></Link>
            <p className='nav__label'>Profile</p>
        </div>  
        <div className='nav__div'>
            <Link><PiBooks className='nav__icons'/></Link>
            <p className='nav__label'>Bookings</p>
        </div>
        <div className='nav__div'>
        <Link to={"/"}><BiLogOut className='nav__icons' onClick={handleLogOut}/></Link>
            <p className='nav__label'>Log Out</p>
        </div>
    </div>
    )
}

export default Nav;