import '../LandingPage/LandingPage.scss';
import { RiSearchEyeLine } from "react-icons/ri";
import { IoLibrarySharp } from "react-icons/io5";
import { PiUserCircle } from "react-icons/pi";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import heroImg from '../../Assets/Images/Chlar.webp';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (<>
        <body className='landingpage'>
            <nav className='landingpage__nav'>
                <h1 className='landingpage__nav-logo'>P<span className='landingpage__logo-flicker'>A</span>TCH</h1>
                <div className='landingpage__nav-buttondiv'>
                    <Link className='landingpage__nav-link' to={'/Login'}><button className='landingpage__nav-signin'>Sign in</button></Link>
                </div>
            </nav>
            <div className='landingpage__hero'>
                <div className='landingpage__hero-overlay'>
                    <div className='landingpage__hero-overlaycontents'>
                        <h1 className='landingpage__hero-header'>Find your audience.</h1>
                        <Link className='landingpage__signup-link' to={'/SignUp'}><button className='landingpage__hero-signup'>Create a free account</button></Link>
                        <Link className='landingpage__cwa-link' to={'/Discover'}><p className='landingpage__hero-cwa'>Continue without an account</p></Link>
                    </div>
                </div>
            </div>
            <section className='landingpage__desc-section'>
                <article className='landingpage__cta-div'>
                    <h1 className='landingpage__desc-header'>Artist. Booking. <span className='landingpage__desc-span'>Revolutionized.</span></h1>
                    <p className='landingpage__desc-summary'>
                        Independant artist's face challenges in showcasing their talent, gaining exposure, and securing bookings. There's a clear demand for an online platform that eliminates intermediaries, empowers artists in negotiations, and simplifies the booking process.
                        Patch offers a platform for agents, labels, and anyone seeking talent to easily discover and connect with our users.
                    </p>
                </article>
                <article className='landingpage__desc'>
                    <h2 className='landingpage__desc-subheaderleft'>DISCOVER</h2>
                    <div className='landingpage__desc-textdiv'>
                        <RiSearchEyeLine size={90} fill='#ff7b00' />
                        <p className='landingpage__desc-text'>
                            Discover Dj's from around the world with an extensive catalog of local and global talent right at your fingertips!
                        </p>
                    </div>
                </article>
                <article className='landingpage__desc'>
                    <h2 className='landingpage__desc-subheaderright'>BOOK</h2>
                    <div className='landingpage__desc-textdiv'>
                        <p className='landingpage__desc-text'>
                            Streamline your artist booking process and connect with talented performers effortlessly.
                        </p>
                        <IoLibrarySharp size={90} fill='#ff7b00' />
                    </div>
                </article>
                <article className='landingpage__desc'>
                    <h2 className='landingpage__desc-subheaderleft'>EXPLORE</h2>
                    <div className='landingpage__desc-textdiv'>
                        <PiUserCircle size={100} fill='#ff7b00' />
                        <p className='landingpage__desc-text'>
                            Explore dynamic artist profiles showcasing user stats, music, reviews and more.
                        </p>
                    </div>
                </article>
                <div className='landingpage__footer'>
                    <div className='landingpage__footericon-div'>
                        <Link to='https://www.linkedin.com/in/vgrosado/'><FaLinkedin fill='grey' size={25} /></Link>
                        <Link to='https://github.com/vgrosado'><FaGithub fill='grey' size={25} /></Link>
                    </div>
                    <p className='landingpage__footer-text'>Developed & Designed by: Victor Rosado</p>
                </div>
            </section>
        </body>
    </>
    );
};

export default LandingPage;