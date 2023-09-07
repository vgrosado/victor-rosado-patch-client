import { useState } from 'react';
import '../SignUpForm/SignUpForm.scss'

import { AiFillEye } from 'react-icons/ai'
import { addDoc, collection } from 'firebase/firestore';
import {db} from '../../Firebase';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
	const navigateTo = useNavigate();
	const [newName, setNewName] = useState();
	const [newUserName, setNewUserName] = useState("");
	const [newEmail, setNewEmail] = useState("");

	const artistsCollectionRef = collection(db, "Artists")
	const createUser =  async (event) => {
        event.preventDefault();
        await addDoc(artistsCollectionRef, { username: '@'+newUserName,
			name: newName,
			email: newEmail,
			backgroundimg: "https://firebasestorage.googleapis.com/v0/b/patch-397bb.appspot.com/o/userbackgroundimages%2Fnewuserbackgroundtemplate.png?alt=media&token=39794247-ec26-4fc9-a9fb-fe35e931f8cf",
			description: "Add bio",
			followers: "0",
			image: "https://firebasestorage.googleapis.com/v0/b/patch-397bb.appspot.com/o/newuseravatartemplate.png?alt=media&token=e0bdfc2f-2055-4e67-b7aa-1304267ac203",
			rating: 0,})
			navigateTo('/Home');
    		};


    return (
        <form className="signup-form">

                    <div className='signup-form__input-div'>
						<input
							className="signup-form__input"
							type="text"
							id="name"
							placeholder='Enter your name'
							onChange={(event) => {setNewName(event.target.value)}}>
						</input>
					</div>
                    <div className='signup-form__input-div'>
						<input
							className="signup-form__input"
							type="text"
							id="username"
							placeholder='Enter your username'
							onChange={(event) => {setNewUserName(event.target.value)}}>
						</input>
					</div>
					<div className='signup-form__input-div'>
						<input
							className="signup-form__input"
							type="text"
							id="email"
							placeholder='Enter your email address'
							onChange={(event) => {setNewEmail(event.target.value)}}>
						</input>
					</div>
					<div className='signup-form__input-div'>
						<input
							className="signup-form__input"
							type="password"
							id="password"
							placeholder='Enter your password'>
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
					<button className="signup-form__button" onClick={createUser} type='submit'>Sign Up</button>
				</form>
    )
}
export default SignUpForm;