import { useState } from 'react';
import '../ReviewForm/ReviewForm.scss';
import {BsLightningFill} from 'react-icons/bs';

function ReviewForm() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    return (
        <section className='reviewform'>
            <form className='reviewform__form'>
                <div className='reviewform__div'>
                {[...Array(5)].map((volt, index) => {
                    const currentRating = index + 1;
                    return (
                    <label className='reviewform__rating-input'>
                        <input
                        key={index} 
                        type='radio' 
                        name='rating' 
                        value={currentRating}
                        onClick={() => setRating(currentRating)}/>
                        <BsLightningFill 
                        key={index}
                        className='reviewform__rating' 
                        size={24} 
                        color={currentRating <= (hover || rating) ? "#ff7b00" : "#191919"}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}/>
                    </label>
                )})}
                </div>
                <input className='reviewform__input' placeholder='Leave A Comment'></input>
            </form>
        </section>
    )
};

export default ReviewForm ;