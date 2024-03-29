import { useEffect, useState } from 'react';
import { addDoc, getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../Firebase';
import '../ReviewForm/ReviewForm.scss';
import { BsLightningFill } from 'react-icons/bs';
import { FaRegTrashCan } from "react-icons/fa6";
import { TbMoodSad } from "react-icons/tb";
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';


function ReviewForm({ user, currentUser }) {
    const { id } = useParams();
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [newReview, setNewReview] = useState("");
    const [newUser, setNewUser] = useState(currentUser?.displayName);
    const [review, setReview] = useState([]);
    const [voltage, setVoltage] = useState(0);

    //get all reviews for specific user
    async function getReviews() {
        const reviewData = await getDocs(collection(db, "users", `${id}`, "Reviews"));
        setReview(reviewData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };

    useEffect(() => {
        getReviews();
    }, [newReview, id])

    console.log(newReview)
    console.log(newUser)
    console.log(currentUser?.displayName)
    console.log(voltage)
    console.log(currentUser?.photoURL)

    //create a new review
    function createReview(event) {
        event.preventDefault();
        if (!newReview || !newUser) {
            alert('All fields are required')
        } if (currentUser) {
            const reviewData = collection(db, "users", `${id}`, "Reviews");
            addDoc(reviewData, {
                user: currentUser?.displayName,
                rating: parseFloat(voltage),
                avatar: currentUser?.photoURL,
                review: newReview,
                time: new Date().toLocaleDateString(),
                id: v4()
            });
            // Clear form values after submitting review
            setNewUser("");
            setNewReview("");
            setRating(null);
            alert('Review submitted!')
        }
        else {
            const reviewData = collection(db, "users", `${id}`, "Reviews");
            addDoc(reviewData, {
                user: newUser,
                rating: parseFloat(voltage),
                avatar: "https://source.boringavatars.com/beam/120/Zora%20Neale?colors=ff7b00,191919,ffffff?square",
                review: newReview,
                time: new Date().toLocaleDateString(),
                id: v4()
            });
            // Clear form values after submitting review
            setNewUser("");
            setNewReview("");
            setRating(null);
            alert('Review submitted!')
        }
    };

    //delete a review
    async function deleteReview(reviewId) {
        const reviewData = doc(db, "users", `${id}`, "Reviews", `${reviewId}`);
        await deleteDoc(reviewData);
        alert('Review successfully deleted!')
        getReviews();
    };

    if (currentUser?.uid === user?.id && review.length === 0) {
        return (
            <div className='reviewform__error-section'>
                <h2 className='reviewform__error-title'>
                    You have no reviews!
                </h2>
                <TbMoodSad size={150} color='#ff7b00' />
            </div>
        )
    };


    if (currentUser?.uid === user?.id) {
        return (
            <div className='reviewform__review-section'>
                {review?.map(rev => {
                    return (
                        <div className='reviewform__review-div'>
                            <div className='reviewform__user-div'>
                                <img className='reviewform__avatar' src={rev?.avatar} alt='user avatar'></img>
                                <div className='reviewform__user-details'>
                                    <p className='reviewform__username'>{rev?.user}</p>
                                    <p className='reviewform__user-timestamp'>{new Date(rev?.time).toLocaleDateString()}</p>
                                    <div className='reviewform__voltage-div'>
                                        {[...Array(rev?.rating)].map((e) => {
                                            return (<BsLightningFill className='reviewform__voltage' />)
                                        })}
                                    </div>
                                </div>
                            </div>
                            <p className='reviewform__review'>{rev?.review}</p>
                        </div>
                    )
                })}
            </div>
        )
    } else
        return (
            <section className='reviewform'>
                <h2 className='reviewform__heading'>Leave <span className='reviewform__displayName'>{user?.name}</span> a review</h2>
                <form autoComplete='off' type='submit' className='reviewform__form'>
                    <div className='reviewform__div'>
                        {[...Array(5)].map((volt, index) => {
                            const currentRating = index + 1;
                            return (
                                <label className='reviewform__rating-input'>
                                    <input
                                        type='radio'
                                        name='rating'
                                        value={currentRating}
                                        onClick={() => setRating(currentRating)}
                                        onChange={(event) => { setVoltage(event.target.value) }} />
                                    <BsLightningFill
                                        key={index}
                                        className='reviewform__rating'
                                        size={28}
                                        color={currentRating <= (hover || rating) ? "#ff7b00" : "#342415"}
                                        onMouseEnter={() => setHover(currentRating)}
                                        onMouseLeave={() => setHover(null)} />
                                </label>
                            )
                        })}
                    </div>
                    <input
                        className='reviewform__username-input'
                        onChange={(event) => { setNewUser(event.target.value) }}
                        type='text'
                        name='user'
                        placeholder={currentUser ? currentUser?.displayName : "Enter your name"}
                        value={currentUser ? currentUser?.displayName : newUser} />
                    <textarea
                        onChange={(event) => { setNewReview(event.target.value) }}
                        className='reviewform__input'
                        type='text'
                        name='comment'
                        placeholder='Leave a review'
                        value={newReview} />
                    <button onClick={createReview} type='submit' className='reviewform__button'>Submit</button>
                </form>
                <div className='reviewform__review-section'>
                    {review?.map(rev => {
                        return (
                            <div className='reviewform__review-div'>
                                <div className='reviewform__user-div'>
                                    {rev?.avatar ? <img className='reviewform__avatar' src={rev?.avatar} alt='user avatar'></img> :
                                        <img className='reviewform__avatar' src="https://source.boringavatars.com/beam/120/Zora%20Neale?colors=ff7b00,191919,ffffff?square" alt='user not found'></img>}
                                    <div className='reviewform__user-details'>
                                        <p className='reviewform__username'>{rev?.user}</p>
                                        <p className='reviewform__user-timestamp'>{new Date(rev?.time).toLocaleDateString()}</p>
                                        <div className='reviewform__voltage-div'>
                                            {[...Array(rev?.rating)].map((e) => {
                                                return (<BsLightningFill className='reviewform__voltage' />)
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className='reviewform__review-container'>
                                    <p className='reviewform__review'>{rev?.review}</p>
                                    {currentUser?.displayName === rev?.user ?
                                        <FaRegTrashCan color='#ff7b00' onClick={() => deleteReview(rev?.id)} />
                                        : ""}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        )
};
export default ReviewForm;