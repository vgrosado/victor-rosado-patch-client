import '../SignUpPage/SignUpPage.scss'
import SignUpForm from '../../Components/SignUpForm/SignUpForm';
import { useNavigate } from 'react-router-dom';

function SignUpPage({loading, setLoading}) {
	const navigateTo = useNavigate();
	function HandleSignIn(){
		navigateTo('/Login');
	}
	return (
		<section className="signup">
			<div className="signup__container">
				<h1 className='signup__header'>PATCH</h1>
				<SignUpForm loading={loading} setLoading={setLoading} />
				<div className='login__switch-container'>
					<p onClick={HandleSignIn} className='login__button-2' id='switch-button'>Already have an account? Sign in.</p>
				</div>
			</div>
		</section>
	)
};

export default SignUpPage;