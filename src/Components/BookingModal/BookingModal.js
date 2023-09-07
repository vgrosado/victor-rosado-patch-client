import '../BookingModal/BookingModal.scss';

function BookingModal({isOpen, closeModal}) {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-overlay__content">
                <h1 className='modal-overlay__heading'>BOOKINGS</h1>
                <section className='modal-overlay__section'>
                <div className='modal-overlay__booking-div'>
                    <h2 className='modal-overlay__subheading'>Ultra Music Festival</h2>
                    <div className='modal-overlay__details-div1'>
                        <div className='modal-overlay__details-div2'>
                            <p className='modal-overlay__location'>Miami FL, USA</p>
                            <p className='modal-overlay__date'>March 22, 2024</p>
                        </div>
                        <div className='modal-overlay__details-div3'>
                            <p className='modal-overlay__type'>Headliner</p>
                            <p className='modal-overlay__time'>10:00PM - 11:30PM</p>
                        </div>
                    </div>
                </div>
                
                <div className='modal-overlay__booking-div'>
                    <h2 className='modal-overlay__subheading'>Club Space</h2>
                    <div className='modal-overlay__details-div1'>
                        <div className='modal-overlay__details-div2'>
                            <p className='modal-overlay__location'>Ibiza, Spain</p>
                            <p className='modal-overlay__date'>October 4, 2023</p>
                        </div>
                        <div className='modal-overlay__details-div3'>
                            <p className='modal-overlay__type'>Closing</p>
                            <p className='modal-overlay__time'>4:00AM - 8:00AM</p>
                        </div>
                    </div>
                </div>
                
                <div className='modal-overlay__booking-div'>
                    <h2 className='modal-overlay__subheading'>iii Points</h2>
                    <div className='modal-overlay__details-div1'>
                        <div className='modal-overlay__details-div2'>
                            <p className='modal-overlay__location'>Miami FL, USA</p>
                            <p className='modal-overlay__date'>October 20, 2023</p>
                        </div>
                        <div className='modal-overlay__details-div3'>
                            <p className='modal-overlay__type'>Opening</p>
                            <p className='modal-overlay__time'>5:00PM - 6:30PM</p>
                        </div>
                    </div>
                </div>
                
                <div className='modal-overlay__booking-div'>
                    <h2 className='modal-overlay__subheading'>EDC Las Vegas</h2>
                    <div className='modal-overlay__details-div1'>
                        <div className='modal-overlay__details-div2'>
                            <p className='modal-overlay__location'>Las Vegas NV, USA</p>
                            <p className='modal-overlay__date'>October 31, 2023</p>
                        </div>
                        <div className='modal-overlay__details-div3'>
                            <p className='modal-overlay__type'>Headliner</p>
                            <p className='modal-overlay__time'>11:00PM -12:30AM</p>
                        </div>
                    </div>
                </div>
                </section>
                <span className="modal-overlay__close" onClick={closeModal}>
                </span>
            </div>
        </div>
    )
};

export default BookingModal;