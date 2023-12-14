import '../SignUpPage/SignUpPage.scss'
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