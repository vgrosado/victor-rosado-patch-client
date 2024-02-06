import { TbCalendarPlus } from 'react-icons/tb';
import { IoLocationOutline } from "react-icons/io5";
import { IoCalendarSharp } from "react-icons/io5";

import '../BookingList/BookingList.scss';


function BookingList({ bookings }) {



    return (
        <>
            {bookings?.map((booking, index) => {
                return (
                    <div key={index} className='bookinglist'>
                        <div className='bookinglist__container'>
                            <IoCalendarSharp color='grey' size={110} />
                            {/* <img className='bookinglist__event-flyer' src=''></img> */}
                            <div className='bookinglist__booking-div'>
                                <IoLocationOutline stroke='#ff7b00' strokeWidth={4} size={14} />
                                <div className='bookinglist__details'>
                                    <p className='bookinglist__venue'>{booking?.venue}</p>
                                    <div className='bookinglist__time-div'>
                                        <p className='bookinglist__time'>{booking.start + " -"}</p>
                                        <p className='bookinglist__time'>{booking.end}</p>
                                    </div>
                                    <p className='bookinglist__date'>{new Date(booking.date).toLocaleDateString([], {
                                        month: '2-digit',
                                        day: '2-digit',
                                        year: '2-digit',
                                    })}</p>
                                    <p className='bookinglist__type'>{booking?.type}</p>
                                </div>
                                <p className='bookinglist__information'></p>
                            </div>
                        </div>
                    </div>
                );
            })}

        </>
    )
};

export default BookingList;