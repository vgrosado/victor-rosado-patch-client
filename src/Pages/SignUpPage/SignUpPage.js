import '../SignUpPage/SignUpPage.scss'
import backgroundVid from '../../Assets/LoginBackground3.mp4'
import {useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';

function SignUpPage() {

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


	function HandleLogin(e){
		e.preventDefault();
		navigateTo('/LoginPage');
	}
	

	function HandleSignUp(e){
		e.preventDefault();
		navigateTo('/SignUpPage');
	}

	return (
		<section className="signup">
			<video src={backgroundVid} id="background-video" autoPlay loop muted />
			<div className="signup__container">
				<h1 className='signup__header'>P<span className='signup__flicker'>A</span>TCH</h1>
				<SignUpForm />
			</div>
		</section>
	)
};

export default SignUpPage;