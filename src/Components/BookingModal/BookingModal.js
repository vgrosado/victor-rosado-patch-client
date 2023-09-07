import '../BookingModal/BookingModal.scss';

function BookingModal({isOpen, onClose}) {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-overlay__content">
                <span className="modal-overlay__close" onClick={onClose}>
                    &times;
                </span>
            </div>
        </div>
    )
};

export default BookingModal;