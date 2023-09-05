import { useState } from 'react';
import '../ReviewForm/ReviewForm.scss';
import {BsLightningFill} from 'react-icons/bs';

function ReviewForm({artist}) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    return (
        <section className='reviewform'>
            <h2>Leave {artist.name} A Review</h2>
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
                        size={28} 
                        color={currentRating <= (hover || rating) ? "#ff7b00" : "#191919"}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}/>
                    </label>
                )})}
                </div>
                <input 
                    className='reviewform__input' 
                    type='text' 
                    name='comment'
                    placeholder='Leave A Comment'/>
                <button type='submit' className='reviewform__button'>Submit</button>
            </form>
        </section>
    )
};

export default ReviewForm ;