import { useEffect, useState } from 'react';
import '../Booking/Booking.scss';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { useParams } from 'react-router-dom';

function Booking({ getBookings, user, bookings }) {
    const { id } = useParams();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [type, setType] = useState();
    const [date, setDate] = useState();
    const [region, setRegion] = useState();
    const [venue, setVenue] = useState();
    const [address, setAddress] = useState();
    const newDate = Date.now();
    const formValues = {
        name,
        email,
        type,
        date,
        region,
        venue,
        address
    };

    useEffect(() => {
        setName(name || '');
        setEmail(email || '');
        setType(type || '');
        setDate(date || '');
        setRegion(region || '');
        setVenue(venue || '');
        setAddress(address || '');
    }, [formValues]);

    // Save form data to localStorage on bio change
    useEffect(() => {
        localStorage.setItem('formValues', JSON.stringify(formValues));
    }, []);

    // Load form data from localStorage on component mount
    useEffect(() => {
        const storedFormValues = JSON.parse(localStorage.getItem('formValues'));
        if (storedFormValues) {
            setName(storedFormValues.name || '');
            setEmail(storedFormValues.email || '');
            setType(storedFormValues.type || '');
            setDate(storedFormValues.date || '');
            setRegion(storedFormValues.region || '');
            setVenue(storedFormValues.venue || '');
            setAddress(storedFormValues.address || '');
        }
    }, []);


    //create a new Booking
    function createBooking(event) {
        event.preventDefault();
        const bookingData = collection(db, "users", `${id}`, "Bookings");
        addDoc(bookingData, {
            name: name,
            email: email,
            type: type,
            date: date,
            region: region,
            venue: venue,
            address: address,
            isRead: false,
            timestamp: newDate
        }).then(() => {
            const mailData = collection(db, "mail");
            addDoc(mailData, {
                to: user?.email,
                message: {
                    subject: "Welcome!",
                    html: `Hi ${user?.name}! ${name} would like to book to ${type} @ ${venue} ${address} located in ${region} on ${date}.
                    Please contact ${name} @ ${email} if you would like to accept!`
                }
            })
        }).then(() => {
            const bookingDocRef = doc(db, "users", `${id}`);
            updateDoc(bookingDocRef, {
                bookings: bookings?.length
            })
        }).catch((error) => {
            console.log(error.message)
        });
        // Clear form values after submitting Booking
        setName("");
        setEmail("");
        setType("");
        setDate("");
        setRegion("");
        setVenue("");
        setAddress("");
        getBookings();
    };

    console.log(type)
    console.log(region)
    console.log(date)


    return (
        <section className='booking'>
            <form className='booking__form'>
                <input autoComplete='off' className='booking__input' type='text' name='name' placeholder='Name' onChange={(event) => setName(event.target.value)} value={name}>
                </input>
                <input autoComplete='off' className='booking__input' type='text' name='email' placeholder='Email' onChange={(event) => setEmail(event.target.value)} value={email}>
                </input>
                <select className='booking__booking-type' onChange={(event) => setType(event.target.value)} value={type}>
                    <option value="" disabled selected hidden>
                        Type</option>
                    <option value='Headline'>Headline</option>
                    <option value='Open'>Open</option>
                    <option value='Support'>Support</option>
                </select>
                <input autoComplete='off' placeholder='Choose a date' className='booking__date-input' type='datetime-local' name='date' onChange={(event) => setDate(event.target.value)} value={date}>
                </input>
                <select className='booking__region-select' name='country/region' onChange={(event) => setRegion(event.target.value)} value={region}>
                    <option value="" disabled selected hidden>
                        Country/Region</option>
                    <option value='North America'>North America</option>
                    <option value='South America'>South America</option>
                    <option value='Europe'>Europe</option>
                    <option value='Asia'>Asia</option>
                    <option value='Australia'>Australia</option>
                    <option value='Africa'>Africa</option>
                </select>
                <input autoComplete='off' className='booking__input' name='venue' type='text' placeholder='Venue' onChange={(event) => setVenue(event.target.value)} value={venue}>
                </input>
                <input autoComplete='off' className='booking__input' name='address' type='text' placeholder='Address' onChange={(event) => setAddress(event.target.value)} value={address}>
                </input>
                <button autoComplete='off' type='submit' className='booking__button' onClick={(event) => createBooking(event)}>Submit</button>
            </form>
        </section>
    )
};

export default Booking;