import './App.scss';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import HomePage from './Pages/HomePage/HomePage';
import UserProfile from './Pages/UserProfile/UserProfile';
import { useEffect, useState } from 'react';
import { db } from './Firebase';
import { collection,getDocs, orderBy, query, } from 'firebase/firestore';
import EditProfile from './Pages/EditProfile/EditProfile';
import { getAuth } from 'firebase/auth';
import UploadMusicPage from './Pages/UploadMusicPage/UploadMusicPage';
import NotificationPage from './Pages/NotificationPage/NotificationPage';
import LandingPage from './Pages/LandingPage/LandingPage';


function App() {

  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({});
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [loading, setLoading] = useState(false);
  console.log(currentUser)

  //Get all bookings for currently logged in user
  const bookingsRef = collection(db, 'users', `${currentUser?.uid}`, 'Bookings');
  async function getBookings() {
    const orderedQuery = query(bookingsRef, orderBy('timestamp', 'asc')); // Change 'asc' to 'desc' if needed
    const data = await getDocs(orderedQuery);
    const orderedBookings = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setBookings(orderedBookings);
  };

  let lastBooking = bookings[bookings.length - 1];

  let bookingNotification = bookings?.find((book) => {
    return book === lastBooking;
  })
  useEffect(() => {
    getBookings();
    setNewBooking(lastBooking);
  }, [newBooking, currentUser?.uid]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/Login" element={<LoginPage loading={loading} setLoading={setLoading} />}></Route>
        <Route path="/SignUp" element={<SignUpPage loading={loading} setLoading={setLoading} />}></Route>
        <Route path="/Discover" element={<HomePage getBookings={getBookings} bookingNotification={bookingNotification} currentUser={currentUser} />}></Route>
        <Route path="/Profile/:id" element={<UserProfile currentUser={currentUser} bookings={bookings} getBookings={getBookings} />}></Route>
        <Route path="/EditProfile/:id" element={<EditProfile currentUser={currentUser}/>}></Route>
        <Route path="/UploadMusic/:id" element={<UploadMusicPage currentUser={currentUser} />}></Route>
        <Route path="/Notifications/:id" element={<NotificationPage currentUser={currentUser} bookings={bookings} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
