import '../SignUpPage/SignUpPage.scss'
// import backgroundVid from '../../Assets/Videos/LoginBackground3.mp4'
// import {useNavigate } from 'react-router-dom';
import SignUpForm from '../../Components/SignUpForm/SignUpForm';

function SignUpPage() {

	return (
		<section className="signup">
			<div className="signup__container">
				<h1 className='signup__header'>P<span className='signup__flicker'>A</span>TCH</h1>
				<SignUpForm />
			</div>
		</section>
	)
};

export default SignUpPage;