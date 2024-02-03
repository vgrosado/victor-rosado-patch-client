import '../Notification/Notification.scss';
import { TbCalendarPlus } from "react-icons/tb";

function Notification({ book }) {

    const time = new Date(book.timestamp).toLocaleTimeString([], {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })
    
    const date = new Date(book.timestamp).toLocaleDateString([],{weekday: 'long'});

    return (
        <>
            <div className='notification'>
                <div className='notification__container'>
                    <TbCalendarPlus size={50} color='grey' />
                    <div className='notification__details'>
                        <p className='notification__subject'><span className='notification__name'>{book?.name}</span> has sent you a booking request!</p>
                        <p className='notification__time'>{date + "  at "  + new Date(time).toLocaleTimeString([], {
                            timeStyle: 'short'
                        })}</p>
                        <p className='notification__information'></p>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Notification;