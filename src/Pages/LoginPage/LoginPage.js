import '../LoginPage/LoginPage.scss'
import backgroundVid from '../../Assets/Videos/LoginBackground3.mp4'
import LoginForm from '../../Components/LoginForm/LoginForm'
import {useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';




function LoginPage() {

	const navigateTo = useNavigate();
	// function handleLogin(e){
	// 	e.preventDefault();
	// 	setLoginForm(true)
	// 	setSignUpForm(false)
	// }
	

	// function handleSignUp(e){
	// 	e.preventDefault();
	// 	setLoginForm(false)
	// 	setSignUpForm(true)
	// }


	function HandleLogin(){
		navigateTo('/Home');
	}
	

	function HandleSignUp(){
		navigateTo('/SignUp');
	}

	return (
		<section className="login">
			<video src={backgroundVid} id="background-video" autoPlay playsInline loop muted />
			<div className="login__container">
				<h1 className='login__header'>P<span className='login__flicker'>A</span>TCH</h1>
				<div className='login__subheader-div'>
					<h2 className='login__subheader'>Make the connection.</h2>
					<div className='login__switch-container'>
						<button onClick={HandleLogin}  className='login__button-1' id='switch-button'>Login</button>
						<button onClick={HandleSignUp} className='login__button-2' id='switch-button'>Register</button>
					</div>
				</div>
			</div>
		</section>
	)
};

export default LoginPage;