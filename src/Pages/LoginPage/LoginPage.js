import '../LoginPage/LoginPage.scss'
// import backgroundVid from '../../Assets/Videos/LoginBackground3.mp4'
import LoginForm from '../../Components/LoginForm/LoginForm'
import {useNavigate } from 'react-router-dom';


function LoginPage({loading, getUser, setLoading}) {

	const navigateTo = useNavigate();
	function HandleSignUp(){
		navigateTo('/SignUp');
	}

	return (
		<section className="login">
			<div className="login__container">
				<h1 className='login__header'>P<span className='login__flicker'>A</span>TCH</h1>
				<div className='login__subheader-div'>
					<LoginForm getUser={getUser} loading={loading} setLoading={setLoading} />
					<div className='login__switch-container'>
						<p onClick={HandleSignUp} className='login__button-2' id='switch-button'>New to patch? Register now.</p>
					</div>
				</div>
			</div>
		</section>
	)
};

export default LoginPage;