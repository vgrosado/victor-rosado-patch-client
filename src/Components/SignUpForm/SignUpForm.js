import { useState } from 'react';
import '../SignUpForm/SignUpForm.scss';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { db, signUp } from '../../Firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

function SignUpForm({loading, setLoading}) {
	const [passwordOff, setPasswordOff] = useState(true);
	const [newName, setNewName] = useState("");
	const [userName, setUserName] = useState("");
	const [emailRef, setEmailRef] = useState("");
	const [passwordRef, setPasswordRef] = useState(0);
	const [err, setError] = useState(false);
	const navigateTo = useNavigate();

	async function handleSignUp() {
		if (passwordRef.length < 6) {
			handleErr(passwordRef)
			alert('password must be atleast 6 characters long');
		}
		else if (!emailRef || !passwordRef || !newName || !userName) {
			alert('All fields are required');
		}
		else {
			setLoading(true);
			try {
				const userCredential = await signUp(emailRef, passwordRef);
				const user = userCredential.user;

				if (user) {
					await updateProfile(user, {
						displayName: userName,
						photoURL: "https://source.boringavatars.com/beam/120/Maria%20Mitchell?colors=ff7b00,191919,ffffff?square"
					});

					const userRef = doc(db, "users", `${user.uid}`);
					const userDoc = await getDoc(userRef);

					if (!userDoc.exists()) {
						// If the user document doesn't exist, create it
						setDoc(userRef, {
							rating: 0,
							bio: "Tell us about yourself",
							bookings: 0,
							name: newName,
							displayName: userName,
							avatar: "https://source.boringavatars.com/beam/120/Maria%20Mitchell?colors=ff7b00,191919,ffffff?square",
							id: user.uid,
							email: emailRef,
							backgroundimg: "https://firebasestorage.googleapis.com/v0/b/patch-397bb.appspot.com/o/userbackgroundimages%2FPatchStockBackground.jpeg?alt=media&token=40704bfb-4d34-4609-b5ab-38207e36aa24",
							location: "Add Your Location",
							website: "Add Your Website",
							genre: ""
						}
						);
					} else {
						// If the user document exists, update it
						updateDoc(userRef, {
							rating: 0,
							bio: "Tell us about yourself",
							bookings: 0,
							name: newName,
							displayName: userName,
							avatar: "https://source.boringavatars.com/beam/120/Maria%20Mitchell?colors=ff7b00,191919,ffffff?square",
							id: user.uid,
							email: emailRef,
							backgroundimg: "https://firebasestorage.googleapis.com/v0/b/patch-397bb.appspot.com/o/userbackgroundimages%2FPatchStockBackground.jpeg?alt=media&token=40704bfb-4d34-4609-b5ab-38207e36aa24",
							location: "Add Your Location",
							website: "Add Your Website",
							genre: ""
						});
					}

					console.log('User successfully created or updated!');
				} else {
					console.log('User object is null');
				}
			} catch (error) {
				console.log('Sign-up error:', error.message);
			} finally {
				setLoading(false);
				alert('Account successfully created')
				navigateTo('/Discover');
			}
		}
	};
	console.log(emailRef)
	console.log(passwordRef?.length)

	function handleErr(password) {
		if (password.length < 6) {
			setError(true)
		}
	};

	function handlePasswordPrivacy() {
		if (passwordOff === true) {
			setPasswordOff(false);
		} else {
			setPasswordOff(true)
		}
	};



	return (
		<div className="signup-form">
			<label className='signup-form__input-label'>
				Name
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
			</label>
			<label className='signup-form__input-label'>
				Username
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
			</label>
			<label className='signup-form__input-label'>
				Email
				<div className='signup-form__input-div'>
					<input
						autoComplete='off'
						className="signup-form__input"
						type="text"
						id="email"
						placeholder='Enter your email address'
						onChange={(event) => { setEmailRef(event.target.value) }}>
					</input>
				</div>
			</label>
			<label className='signup-form__input-label'>
				Password
				<div className={!err || passwordRef.length > 6 ? 'signup-form__input-div' : 'signup-form__input-error'}>
					<input
						minLength={6}
						autoComplete='off'
						className="signup-form__input"
						type={passwordOff ? "password" : "text"}
						id="password"
						placeholder='Enter your password'
						onChange={(event) => { setPasswordRef(event.target.value) }}>
					</input>
					<div className='form__icon'>
						{passwordOff ? <AiFillEye className='form__eye' onClick={() => handlePasswordPrivacy()} />
							: <AiFillEyeInvisible className='form__eye' onClick={() => handlePasswordPrivacy()} />}
					</div>
				</div>
			</label>
			{/* <div className='signup-form__rememberme-div'>
				<input
					className='signup-form__rememberme'
					type='checkbox'
					id='remember-me'>
				</input>
				<label className='signup-form__rememberme-label'>Remember Me</label>
			</div> */}
			<button disabled={loading} className="signup-form__button" onClick={handleSignUp}>Sign Up</button>
		</div>
	)
}
export default SignUpForm;