import '../LoginForm/LoginForm.scss'
import { AiFillEye } from 'react-icons/ai'

function LoginForm() {
    return (
        <form className="form">
					<div className='form__input-div'>
						<input
							className="form__input"
							type="text"
							id="email"
							placeholder='Enter your email'>
						</input>
					</div>
					<div className='form__input-div'>
						<input
							className="form__input"
							type="password"
							id="password"
							placeholder='Enter your password'>
						</input>
						<div className='form__icon'>
                        <AiFillEye/>
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
					<button className="form__button" type="submit">Sign In</button>
				</form>
    )
}
export default LoginForm;