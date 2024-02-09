import '../LandingPage/LandingPage.scss';
import { RiSearchEyeLine } from "react-icons/ri";
import { IoLibrarySharp } from "react-icons/io5";
import { PiUserCircle } from "react-icons/pi";
import heroImg from '../../Assets/Images/Chlar.webp';

function LandingPage() {
    return (
        <body className='landingpage'>
            <nav className='landingpage__nav'>
                <h1 className='landingpage__nav-logo'>P<span className='landingpage__logo-flicker'>A</span>TCH</h1>
                <div className='landingpage__nav-buttondiv'>
                    <button className='landingpage__nav-signin'>Sign in</button>
                </div>
            </nav>
            <section className='landingpage__hero'>
                <img className='landingpage__hero-img' src={heroImg}></img>
                <div className='landingpage__hero-overlay'>
                    <h1 className='landingpage__hero-header'>Find your audience.</h1>
                    <button className='landingpage__hero-signup'>Create a free account</button>
                </div>
                <article className='landingpage__cta-div'>
                    <h1 className='landingpage__desc-header'>Artist. Booking. <span className='landingpage__desc-span'>Revolutionized.</span></h1>
                    <p className='landingpage__desc-summary'>
                        Artists face challenges in showcasing their talent, gaining exposure, and securing bookings. There's a clear demand for an online platform that eliminates intermediaries, empowers artists in negotiations, and simplifies the booking process.
                        Patch offers a platform for agents, labels, and anyone seeking talent to easily discover and connect with our users.
                    </p>
                </article>
                <main className='landingpage__desc-section'></main>
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
            </section>
        </body>
    );
};

export default LandingPage;