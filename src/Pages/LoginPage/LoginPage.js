import '../LoginPage/LoginPage.scss'
import backgroundVid from '../../Assets/LoginBackground3.mp4'
import LoginForm from '../../Components/LoginForm/LoginForm'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';




function LoginPage() {

	const [loginForm, setLoginForm] = useState(true);
	const [signUpForm, setSignUpForm] = useState(false);
	let navigateTo = useNavigate();

	function handleLogin(e) => {

		setLoginForm(false)
		navigateTo('/')
	}
	

	function handleSignUp() {
		setSignUpForm(true)
		navigateTo('/SignUp')
	}

	return (
		<section className="login">
			<video src={backgroundVid} id="background-video" autoPlay loop muted />
			<div className="login__container">
				<h1 className='login__header'>PATCH</h1>
				<LoginForm />
					<div className='login__switch-container'>
						{/* <Link to='/' className='login__link'><p>Login In</p></Link>
						<Link to='/' className='login__link'><p>Register</p></Link> */}
						<button onClick={} className='login__button' id='switch-button'>Login</button>
						<button onClick={} className='login__button' id='switch-button'>Register</button>
					</div>
			</div>
		</section>
	)
};

export default LoginPage;