import { Link } from 'react-router-dom';
import '../LoginForm/LoginForm.scss'
import { AiFillEye } from 'react-icons/ai'
import { login } from '../../Firebase';
import { useRef } from 'react';

function LoginForm({ setLoading, getUser }) {
	const emailRef = useRef();
	const passwordRef = useRef();

	async function handleLogin() {
		setLoading(true);
		try {
			await login(emailRef.current.value, passwordRef.current.value);
			setLoading(false);
			getUser();
		} catch (error) {
			setLoading(false);
			// Handle login error, for example:
			console.log('Login error:', error.message);
		}

	};


	return (
		<section className="form">
			<div className='form__input-div'>
				<input
					autoComplete='off'
					className="form__input"
					type="text"
					id="email"
					placeholder='Enter your email'
					ref={emailRef}>
				</input>
			</div>
			<div className='form__input-div'>
				<input
					autoComplete='off'
					className="form__input"
					type="password"
					id="password"
					placeholder='Enter your password'
					ref={passwordRef}>
				</input>
				<div className='form__icon'>
					<AiFillEye className='form__eye' />
				</div>
			</div>
			<div className='form__rememberme-div'>
				<input
					className='form__remember-me'
					type='checkbox'
					id='remember-me'>
				</input>
				<label className='form__rememberme-label'>Remember Me</label>
			</div>
			<Link to={'/Home'} ><button onClick={handleLogin} className="form__button" type="submit">Sign In</button></Link>
		</section>
	)
}
export default LoginForm;