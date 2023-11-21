import './App.scss';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import HomePage from './Pages/HomePage/HomePage';
import UserProfile from './Pages/UserProfile/UserProfile';
import { useEffect, useState } from 'react';
import {db} from './Firebase';
import {collection, getDocs, } from 'firebase/firestore';
import EditProfile from './Pages/EditProfile/EditProfile';
import { getAuth } from 'firebase/auth';


function App() {
  const [artists, setArtists] = useState([]);
  const [users, setUsers] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const artistsCollectionRef = collection(db, "Artists")
    const getArtists = async () => {
      const Data = await getDocs(artistsCollectionRef);
      setArtists(Data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };

    getArtists();
  }, []);
  
  useEffect(() => {
    const usersCollectionRef = collection(db, "users")
    const getUsers= async () => {
      const Data = await getDocs(usersCollectionRef);
      setUsers(Data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };

    getUsers();
  }, []);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/Login" element={<LoginPage/>} />
      <Route path="/SignUp" element={<SignUpPage/>} />
      <Route path="/Home" element={<HomePage artists={artists} users={users} />} />
      <Route path="/Profile/:id" element={<UserProfile artists={artists}/>} />
      <Route path="/EditProfile/:id" element={<EditProfile user={currentUser} />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
