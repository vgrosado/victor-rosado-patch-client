import { useRef, useState } from 'react';
import '../SignUpForm/SignUpForm.scss';
import { AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { db, signUp } from '../../Firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { v4 } from 'uuid';

function SignUpForm() {

	const [newName, setNewName] = useState();
	const [userName, setUserName] = useState();
	const [loading, setLoading] = useState(false);
	const emailRef = useRef();
	const passwordRef = useRef();
	const userData = {
		reviews: "",
		rating: 0,
		bio: "Add a bio",
		followers: 0,
		name: newName,
		uid: v4(),
		backgroundimg: "",
		location: "Share your location",
		website: "Add a website"
	};

	async function handleSignUp() {
		setLoading(true);
		try {
			const userCredential = await signUp(emailRef.current.value, passwordRef.current.value);
			const user = userCredential.user;
			
			if (user) {
				await updateProfile(user, {
					displayName: "@" + userName,
					photoURL: ""
				});
	
				const userRef = doc(db, "users", `${user.uid}`);
				const userDoc = await getDoc(userRef);
	
				if (!userDoc.exists()) {
					// If the user document doesn't exist, create it
					 setDoc(userRef, 
						userData
					);
				} else {
					// If the user document exists, update it
					 updateDoc(userRef, 
						userData
						// Other fields you want to update
					);
				}
	
				console.log('User successfully created or updated!');
			} else {
				console.log('User object is null');
			}
		} catch (error) {
			console.log('Sign-up error:', error.message);
		} finally {
			setLoading(false);
		}
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