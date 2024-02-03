import Nav from '../../Components/Nav/Nav';
import Notification from '../../Components/Notification/Notification';
import '../NotificationPage/NotificationPage.scss';

function NotificationPage({ bookings, currentUser }) {
    return (
        <>
            <main className='notificationpage'>
                <div className='notificationpage__header-div'>
                    <h2 className='notificationpage__header'>Notifications</h2>
                </div>
                <section className='notificationpage__container'>
                    {bookings?.map((book) => {
                        return <Notification book={book} />
                    })}
                </section>
            </main>
            <Nav />
        </>
    )
};

export default NotificationPage;