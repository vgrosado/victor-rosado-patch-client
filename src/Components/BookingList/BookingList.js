import { TbCalendarPlus } from 'react-icons/tb';
import '../BookingList/BookingList.scss';


function BookingList({ bookings }) {



    return (
        <>
            {bookings?.map((booking) => {
                return (
                    <div className='bookinglist'>
                        <div className='bookinglist__container'>
                            <img className='bookinglist__event-flyer' src=''></img>
                            <div className='bookinglist__details'>
                                <p className='bookinglist__venue'>{booking?.venue}</p>
                                <p className='bookinglist__time'>{new Date(booking.timestamp).toLocaleTimeString([], {
                                    month: '2-digit',
                                    day: '2-digit',
                                    year: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</p>
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