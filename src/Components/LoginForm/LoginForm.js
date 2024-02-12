import { useNavigate } from 'react-router-dom';
import '../LoginForm/LoginForm.scss'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { login } from '../../Firebase';
import { useRef, useState } from 'react';

function LoginForm({ loading, setLoading}) {
	const [passwordOff, setPasswordOff] = useState(true);
	const emailRef = useRef();
	const passwordRef = useRef();
	const navigateTo = useNavigate();

	async function handleLogin() {
		if (!emailRef.current.value || !passwordRef.current.value) {
			return alert('Must sign in to continue');
		}
		else if (emailRef.current.value && passwordRef.current.value) {
			setLoading(true);
			try {
				await login(emailRef.current.value, passwordRef.current.value);
				setLoading(false);
				navigateTo('/Discover');
			} catch (error) {
				setLoading(false);
				alert('Login error: User not found :(');
			}
		};

	};

	function handlePasswordPrivacy() {
		if (passwordOff === true) {
			setPasswordOff(false);
		} else {
			setPasswordOff(true)
		}
	};


	return (
		<section className="form">
			<label className='form__input-label'>
				Email
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
			</label>
			<label className='form__input-label'>
					Password
			<div className='form__input-div'>
				
					<input
						autoComplete='off'
						className="form__input"
						type={passwordOff ? "password" : "text"}
						id="password"
						placeholder='Enter your password'
						ref={passwordRef}>
					</input>
				
				<div className='form__icon'>
					{passwordOff ? <AiFillEye className='form__eye' onClick={() => handlePasswordPrivacy()} /> 
						: <AiFillEyeInvisible className='form__eye' onClick={() => handlePasswordPrivacy()} />  }
				</div>
				
			</div>
			</label>
			{/* <div className='form__rememberme-div'>
				<input
					className='form__remember-me'
					type='checkbox'
					id='remember-me'>
				</input>
				<label className='form__rememberme-label'>Remember Me</label>
			</div> */}

			<button onClick={handleLogin} disabled={loading} className="form__button" type="submit">Sign In</button>
		</section>
	)
}
export default LoginForm;