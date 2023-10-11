import { useState } from 'react';
import '../SignUpForm/SignUpForm.scss'
import { AiFillEye } from 'react-icons/ai'
import { addDoc, collection } from 'firebase/firestore';
import {db} from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../Firebase';

function SignUpForm() {
	const navigateTo = useNavigate();
	const [newName, setNewName] = useState();
	const [newUserName, setNewUserName] = useState("");
	const [newEmail, setNewEmail] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const register = async () => {
		try {
		const user = await createUserWithEmailAndPassword(auth, newEmail, newPassword);
		console.log(user)
		} catch (error) {
			console.log(error.message);
		}
	};

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
        <form className="signup-form">
                    <div className='signup-form__input-div'>
						<input
							autoComplete='off'
							className="signup-form__input"
							type="text"
							id="name"
							placeholder='Enter your name'
							onChange={(event) => {setNewName(event.target.value)}}>
						</input>
					</div>
                    <div className='signup-form__input-div'>
						<input
							autoComplete='off'
							className="signup-form__input"
							type="text"
							id="username"
							placeholder='Enter your username'
							onChange={(event) => {setNewUserName(event.target.value)}}>
						</input>
					</div>
					<div className='signup-form__input-div'>
						<input
							autoComplete='off'
							className="signup-form__input"
							type="text"
							id="email"
							placeholder='Enter your email address'
							onChange={(event) => {setNewEmail(event.target.value)}}>
						</input>
					</div>
					<div className='signup-form__input-div'>
						<input
							autoComplete='off'
							className="signup-form__input"
							type="password"
							id="password"
							placeholder='Enter your password'
							onChange={(event) => {setNewPassword(event.target.value)}}>
						</input>
						<div className='signup-form__icon'>
                        <AiFillEye className='signup-form__eye'/>
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
					<button className="signup-form__button" onClick={register} type='submit'>Sign Up</button>
				</form>
    )
}
export default SignUpForm;