import { useEffect, useState } from 'react';
import {addDoc, getDocs, collection} from "firebase/firestore";
import {db} from '../../Firebase';
import '../ReviewForm/ReviewForm.scss';
import {BsLightningFill} from 'react-icons/bs';
import { useParams } from 'react-router-dom';


function ReviewForm({artist}) {
    const {id} = useParams();
    const artistId = id;
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [newReview, setNewReview] = useState("");
    const [newUser, setNewUser] = useState("");
    const [review, setReview] = useState([]);
    const [voltage, setVoltage] = useState(0);
    const commentData =  collection(db, "Artists", `${artistId}`, "Comments");

    useEffect(() => {
        const getReviews = async () => {
            const reviewData = await getDocs(collection(db, "Artists", `${artistId}`, "Comments"));
            console.log(reviewData)
            setReview(reviewData.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log(review)
        };

        getReviews();
    }, [])


    const createReview =  async (event) => {
        event.preventDefault();
        await addDoc(commentData, { user: '@'+newUser, rating: parseFloat(voltage), review: newReview, time: new Date().toLocaleDateString()})
        const getReviews = async () => {
            const reviewData = await getDocs(collection(db, "Artists", `${artistId}`, "Comments"));
            setReview(reviewData.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };  setNewUser("");
            setReview("");

        getReviews();
    };

    const userReviews = review;
    console.log(userReviews)
    if (!userReviews || userReviews === 0) {
    return <>Loading</>
    }

    return (
        <section className='reviewform'>
            <h2 className='reviewform__heading'>Leave {artist.name} A Review</h2>
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
                        onChange={(event) => {setVoltage(event.target.value)}} />
                        <BsLightningFill 
                        key={index}
                        className='reviewform__rating' 
                        size={28} 
                        color={currentRating <= (hover || rating) ? "#ff7b00" : "#191919"}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}/>
                    </label>
                )})}
                </div>
                <input 
                    className='reviewform__username-input'
                    onChange={(event) => {setNewUser(event.target.value)}} 
                    type='text' 
                    name='user'
                    placeholder='Username'/>
                <input
                    onChange={(event) => {setNewReview(event.target.value)}} 
                    className='reviewform__input' 
                    type='text' 
                    name='comment'
                    placeholder='Leave a review'/>
                <button onClick={createReview} type='submit' className='reviewform__button'>Submit</button>
            </form>
            <div className='reviewform__review-section'>
                {userReviews.map(rev => {
                    return (
                    <div className='reviewform__review-div'>
                        <div className='reviewform__user-div'>
                            <div className='reviewform__avatar'></div>
                                <div className='reviewform__user-details'>
                                    <p className='reviewform__username'>{rev.user}</p>
                                    <p className='reviewform__user-timestamp'>{new Date(rev.time).toLocaleDateString()}</p>
                                    <div className='reviewform__voltage-div'>
                                    {[...Array(rev.rating)].map((e) => {
                                        return (<BsLightningFill  className='reviewform__voltage'/>)
                                    })}
                                    </div>
                                </div>
                        </div>
                        <p className='reviewform__review'>{rev.review}</p>
                    </div>
                )})}
            </div>
        </section>
    )
};
export default ReviewForm ;