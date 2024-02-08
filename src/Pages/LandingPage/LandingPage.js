import '../LandingPage/LandingPage.scss';
import { RiSearchEyeLine } from "react-icons/ri";
import { IoLibrarySharp } from "react-icons/io5";
import { PiUserRectangle } from "react-icons/pi";
import heroImg from '../../Assets/Images/Chlar.webp';

function LandingPage() {
    return (
        <body className='landingpage'>
            <nav className='landingpage__nav'>
                <h1 className='landingpage__nav-logo'>P<span className='landingpage__logo-flicker'>A</span>TCH</h1>
                <div className='landingpage__nav-buttondiv'>
                    <button className='landingpage__nav-signin'>Sign in</button>
                    <button className='landingpage__nav-signup'>Sign up</button>
                </div>
            </nav>
            <section className='landingpage__hero'>
                <img className='landingpage__hero-img' src={heroImg}></img>
                <div className='landingpage__hero-overlay'>
                    <h1 className='landingpage__hero-header'>Lorem Ipsum.</h1>
                </div>
                <article className='landingpage__cta-div'>
                    <h1 className='landingpage__desc-header'>Artist. Booking. <span className='landingpage__desc-span'>Revolutionized.</span></h1>
                    <p className='landingpage__desc-summary'>
                        Artists face challenges in showcasing their talent, gaining exposure, and securing bookings. There's a clear demand for an online platform that eliminates intermediaries, empowers artists in negotiations, and simplifies the booking process.
                        Patch offers a platform for agents, labels, and anyone seeking talent to easily discover and connect with our users.
                    </p>
                </article>
                <article className='landingpage__desc'>
                    <RiSearchEyeLine size={90} fill='#ff7b00' />
                    <p className='landingpage__desc-text'>
                        Discover Dj's from around the world with an extensive catalog of local and global talent right at your fingertips!
                    </p>
                </article>
                <article className='landingpage__desc'>
                    <p className='landingpage__desc-text'>
                    Streamline your artist booking process and connect with talented performers effortlessly.
                    </p>
                    <IoLibrarySharp size={90} fill='#ff7b00' />
                </article>
                <article className='landingpage__desc'>
                    <PiUserRectangle size={100} fill='#ff7b00' />
                    <p className='landingpage__desc-text'>
                    Explore dynamic DJ profiles showcasing bookings, descriptions, review forms, a rating system, and captivating music showcases to enhance your event experience.
                    </p>
                </article>
            </section>
        </body>
    );
};

export default LandingPage;