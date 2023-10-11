import { useNavigate } from 'react-router-dom';
import '../LoginForm/LoginForm.scss'
import { AiFillEye } from 'react-icons/ai'

function LoginForm() {

	const navigateTo = useNavigate();

	function HandleLogin(){
		navigateTo('/Home');
	}


	const login = async () => {

	}
	const logout = async () => {

	}

    return (
        <form className="form">
					<div className='form__input-div'>
						<input
							autoComplete='off'
							className="form__input"
							type="text"
							id="email"
							placeholder='Enter your email'>
						</input>
					</div>
					<div className='form__input-div'>
						<input
							autoComplete='off'
							className="form__input"
							type="password"
							id="password"
							placeholder='Enter your password'>
						</input>
						<div className='form__icon'>
                        <AiFillEye className='form__eye'/>
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
					<button onClick={HandleLogin} className="form__button" type="submit">Sign In</button>
				</form>
    )
}
export default LoginForm;