import '../LandingPage/LandingPage.scss';
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
                        <h1 className='landingpage__hero-header'>Artist booking revolutionized.</h1>
                </div>
            </section>
        </body>
    );
};

export default LandingPage;