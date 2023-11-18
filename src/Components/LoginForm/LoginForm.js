import { useNavigate } from 'react-router-dom';
import '../LoginForm/LoginForm.scss'
import { AiFillEye } from 'react-icons/ai'
import { login } from '../../Firebase';
import { useRef, useState } from 'react';

function LoginForm() {
	const navigateTo = useNavigate();
	const emailRef = useRef();
	const passwordRef = useRef();
	const [loading, setLoading] = useState(false);

	function HandleLogin(){
		navigateTo('/Home');
	}

	async function handleLogin(){
		setLoading(true);
		try {
		await login(emailRef.current.value, passwordRef.current.value);
		} catch {
			alert('Error');
		}
		setLoading(false);
	};

    return (
        <form className="form">
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
                        <AiFillEye className='form__eye'/>
						</div>
						{passwordRef.current.value !== 6 && (<p>error</p>)}
					</div>
					<div className='form__rememberme-div'>
						<input
							className='form__remember-me'
							type='checkbox'
							id='remember-me'>
						</input>
						<label className='form__rememberme-label'>Remember Me</label>
					</div>
					<button onClick={HandleLogin} className="form__button" type="submit">Sign In</button>
				</form>
    )
}
export default LoginForm;