import '../Booking/Booking.scss';

function Booking() {
    return (
        <section className='booking'>
            <form className='booking__form'>
                <input className='booking__input' type='text' name='name' placeholder='Name'>
                </input>
                <input className='booking__input' type='text' name='email' placeholder='Email'>
                </input>
                <select className='booking__booking-type'>
                    <option>Headline</option>
                    <option>Open</option>
                    <option>Support</option>
                </select>
                <input className='booking__date-input' type='datetime-local' name='date'>
                </input>
                <select className='booking__region-select' name='country/region'>
                    <option value="" disabled selected hidden>
                    Country/Region</option>
                    <option>North America</option>
                    <option>South America</option>
                    <option>Europe</option>
                    <option>Asia</option>
                    <option>Australia</option>
                    <option>Africa</option>
                </select>
                <input className='booking__input' name='venue' type='text' placeholder='Venue'>
                </input>
                <input className='booking__input' name='address' type='text' placeholder='Address'>
                </input>
                <button type='submit' className='booking__button'>Submit</button>
            </form>
        </section>
    )
};

export default Booking;