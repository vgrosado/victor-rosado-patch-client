import { useRef, useState } from 'react';
import '../SignUpForm/SignUpForm.scss';
import { AiFillEye } from 'react-icons/ai';
import { Link} from 'react-router-dom';
import { db, signUp} from '../../Firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';

function SignUpForm() {

	const [newName, setNewName] = useState();
	const [userName, setUserName] = useState();
	const [loading, setLoading] = useState(false);
	const emailRef = useRef();
	const passwordRef = useRef();
	const auth = getAuth();
	const user = auth.currentUser;
	const userData = {
		reviews: "",
		rating: 0,
		bio: "",
		followers: 0,
		name: newName,
		id: "",
	};

	async function handleSignUp() {
		setLoading(true);
		signUp(emailRef.current.value, passwordRef.current.value)
			.then((userCredential) => {
				const user = userCredential.user;
				if (user) {
					updateProfile(user, {
						displayName: "@" + userName,
						photoURL: ""
					}).then(() => {
							const userRef = doc(db, "users", `${user?.uid}`)
							updateDoc(userRef, userData)
							console.log('User successfully created!');
						})
						.catch((error) => {
							console.log('Error updating profile:', error.message);
						});
				} else {
					console.log('User object is null');
				}
			})
			.catch((error) => {
				console.log('Sign-up error:', error.message);
			});
	};





	return (
		<div className="signup-form">
			<div className='signup-form__input-div'>
				<input
					autoComplete='off'
					className="signup-form__input"
					type="text"
					id="name"
					placeholder='Enter your name'
					onChange={(event) => { setNewName(event.target.value) }}>
				</input>
			</div>
			<div className='signup-form__input-div'>
				<input
					autoComplete='off'
					className="signup-form__input"
					type="text"
					id="username"
					placeholder='Enter your username'
					onChange={(event) => { setUserName(event.target.value) }}>
				</input>
			</div>
			<div className='signup-form__input-div'>
				<input
					autoComplete='off'
					className="signup-form__input"
					type="text"
					id="email"
					placeholder='Enter your email address'
					ref={emailRef}
				>
				</input>
			</div>
			<div className='signup-form__input-div'>
				<input
					autoComplete='off'
					className="signup-form__input"
					type="password"
					id="password"
					placeholder='Enter your password'
					ref={passwordRef}
				>
				</input>
				<div className='signup-form__icon'>
					<AiFillEye className='signup-form__eye' />
				</div>
			</div>
			<div className='signup-form__rememberme-div'>
				<input
					className='signup-form__rememberme'
					type='checkbox'
					id='remember-me'>
				</input>
				<label className='signup-form__rememberme-label'>Remember Me</label>
			</div>
			<Link to={'/Home'}><button disabled={loading} className="signup-form__button" onClick={handleSignUp}>Sign Up</button></Link>
		</div>
	)
}
export default SignUpForm;