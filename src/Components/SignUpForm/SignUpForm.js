import '../SignUpForm/SignUpForm.scss'
import { AiFillEye } from 'react-icons/ai'

function SignUpForm() {
    return (
        <form className="signup-form">

                    <div className='signup-form__input-div'>
						<input
							className="signup-form__input"
							type="text"
							id="username"
							placeholder='Enter your username'>
						</input>
					</div>
					<div className='signup-form__input-div'>
						<input
							className="signup-form__input"
							type="text"
							id="email"
							placeholder='Enter your email address'>
						</input>
					</div>
					<div className='signup-form__input-div'>
						<input
							className="signup-form__input"
							type="password"
							id="password"
							placeholder='Enter your password'>
						</input>
						<div className='signup-form__icon'>
                        <AiFillEye/>
						</div>
					</div>
					<div className='signup-form__rememberme-div'>
						<input
							className='signup-form__remember-me'
							type='checkbox'
							id='remember-me'>
						</input>
						<label className='signup-form__rememberme-label'>Remember Me</label>
					</div>
					<button className="signup-form__button" type="submit">Sign Up</button>
				</form>
    )
}
export default SignUpForm;