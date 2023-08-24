import '../LoginPage/LoginPage.scss'
import backgroundVid from '../../Assets/LoginBackground3.mp4'
import { AiFillEye } from 'react-icons/ai'



function LoginPage() {
	return (
		<section className="login">
			<video src={backgroundVid} id="background-video" autoPlay loop muted />
			<div className="login__container">
				<h1 className='login__header'>PATCH</h1>
				<form className="login__form">
					<div className='login__input-div'>
						<input
							className="login__input"
							type="text"
							id="email"
							placeholder='Email'>
						</input>
					</div>
					<div className='login__input-div'>
						<input
							className="login__input"
							type="password"
							id="password"
							placeholder='Password'>
						</input>
						<div className='login__icon'>
							<AiFillEye />
						</div>
					</div>
					<div className='login__rememberme-div'>
						<input
							className='login__remember-me'
							type='checkbox'
							id='remember-me'>
						</input>
						<label className='login__rememberme-label'>Remember Me</label>
					</div>
					<button className="login__button" type="submit">Sign In</button>
				</form>
			</div>
		</section>
	)
};

export default LoginPage;