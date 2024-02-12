import { deleteUser } from 'firebase/auth';
import '../DeleteUserModal/DeleteUserModal.scss';
import { db} from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';

function DeleteUserModal({ isDeleteModalOpen, closeDeleteModal, currentUser }) {
    const navigateTo = useNavigate();

    async function deleteCurrentUser() {
        const deletedUserRef = doc(db, "users", `${currentUser?.uid}`)
        deleteDoc(deletedUserRef).then(() => {
            deleteUser(currentUser);
            alert('Your account has been deleted successfully')
            navigateTo('/Login')
            console.log('user has been delete');
        }).catch((error) => {
            console.log(error.message)
        });
    };


    if (!isDeleteModalOpen) return null;
    return (
        <div className="deleteoverlay">
            <div className='deleteoverlay__content'>
                <h2 className='deleteoverlay__warning-header'>Whoa, there!</h2>
                <p className='deleteoverlay__warning' >Once you delete your account, there's no getting it back. Are you sure you want to do this ?</p>
                <button className='deleteoverlay__cancel-button' type='submit' onClick={closeDeleteModal}>Cancel</button>
                <button className='deleteoverlay__delete-button' type='submit' onClick={() => deleteCurrentUser()}>Delete Account</button>
            </div>
            <span className="deleteoverlay__close" onClick={closeDeleteModal}>
            </span>
        </div>
    )
};

export default DeleteUserModal;