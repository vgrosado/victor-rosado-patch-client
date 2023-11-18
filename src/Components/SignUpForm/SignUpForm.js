import { useRef, useState } from 'react';
import '../SignUpForm/SignUpForm.scss';
import { AiFillEye } from 'react-icons/ai';
// import { addDoc, collection } from 'firebase/firestore';
// import {db} from '../../Firebase';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../Firebase';

function SignUpForm() {
	const navigateTo = useNavigate();
	const [newName, setNewName] = useState();
	const [displayName, setDisplayName] = useState();
	const [loading, setLoading] = useState(false);
	const emailRef = useRef();
	const passwordRef = useRef();

	 async function handleSignUp(){
		setLoading(true);
		try {
		await signUp(emailRef.current.value, passwordRef.current.value);
		} catch {
			alert('Error');
		}
		setLoading(false);
	};

	return (
		<div className="signup-form">
			<div className='signup-form__input-div'>
				<input
					autoComplete='off'
					className="signup-form__input"
					type="text"
					id="name"
					placeholder='Enter your name'
					onChange={(event) => { setNewName(event.target.value) }}>
				</input>
			</div>
			<div className='signup-form__input-div'>
				<input
					autoComplete='off'
					className="signup-form__input"
					type="text"
					id="username"
					placeholder='Enter your username'
					onChange={(event) => { setDisplayName(event.target.value) }}>
				</input>
			</div>
			<div className='signup-form__input-div'>
				<input
					autoComplete='off'
					className="signup-form__input"
					type="text"
					id="email"
					placeholder='Enter your email address'
					ref={emailRef}
					>
				</input>
			</div>
			<div className='signup-form__input-div'>
				<input
					autoComplete='off'
					className="signup-form__input"
					type="password"
					id="password"
					placeholder='Enter your password'
					ref={passwordRef}
					>
				</input>
				<div className='signup-form__icon'>
					<AiFillEye className='signup-form__eye' />
				</div>
			</div>
			<div className='signup-form__rememberme-div'>
				<input
					className='signup-form__rememberme'
					type='checkbox'
					id='remember-me'>
				</input>
				<label className='signup-form__rememberme-label'>Remember Me</label>
			</div>
			<Link to={'/Home'}><button disabled={loading} className="signup-form__button" onClick={handleSignUp}>Sign Up</button></Link>
		</div>
	)
}
export default SignUpForm;