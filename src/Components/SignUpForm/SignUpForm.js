import { useState } from 'react';
import '../SignUpForm/SignUpForm.scss';
import { AiFillEye } from 'react-icons/ai';
// import { addDoc, collection } from 'firebase/firestore';
// import {db} from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase';

function SignUpForm() {
	const navigateTo = useNavigate();
	const [newName, setNewName] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [user, setUser] = useState({});

	// onAuthStateChanged(auth, (currentUser) => {
	// 	setUser(currentUser)
	// })

	// const register = async () => {
	// 	try {
	// 		const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
	// 		updateProfile(auth.currentUser, {
	// 			displayName: displayName, photoURL: "https://example.com/jane-q-user/profile.jpg"
	// 		}).then(() => {
	// 			console.log(user)
	// 		}).catch((error) => {
	// 			console.log(error.message)
	// 		});
	// 		console.log(user)
	// 		navigateTo('/Home');
	// 	} catch (error) {
	// 		console.log(error.message, error.code);
	// 	}
	// };

	// const update = async () => {
	// 	updateProfile(auth.currentUser, {
	// 		displayName: displayName, photoURL: "https://example.com/jane-q-user/profile.jpg"
	// 	}).then(() => {
	// 		// Profile updated!
	// 		// ...
	// 	}).catch((error) => {
	// 		console.log(error.message)
	// 	});
	// };

	// console.log(user.displayName)



	// const artistsCollectionRef = collection(db, "Artists")
	// const createUser =  async (event) => {
	//     event.preventDefault();
	//     await addDoc(artistsCollectionRef, { username: '@'+newUserName,
	// 		name: newName,
	// 		email: newEmail,
	// 		password: newPassword,
	// 		backgroundimg: null,
	// 		description: "Add bio",
	// 		followers: "0",
	// 		image: null,
	// 		rating: 0,})
	// 		navigateTo('/Home');
	// 		};

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
					onChange={(event) => { setDisplayName(event.target.value) }}>
				</input>
			</div>
			<div className='signup-form__input-div'>
				<input
					autoComplete='off'
					className="signup-form__input"
					type="text"
					id="email"
					placeholder='Enter your email address'
					onChange={(event) => { setRegisterEmail(event.target.value) }}>
				</input>
			</div>
			<div className='signup-form__input-div'>
				<input
					autoComplete='off'
					className="signup-form__input"
					type="password"
					id="password"
					placeholder='Enter your password'
					onChange={(event) => { setRegisterPassword(event.target.value) }}>
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
			<button className="signup-form__button">Sign Up</button>
		</div>
	)
}
export default SignUpForm;