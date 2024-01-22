import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import HomePage from './Pages/HomePage/HomePage';
import UserProfile from './Pages/UserProfile/UserProfile';
import { useEffect, useState } from 'react';
import { db } from './Firebase';
import { collection, doc, getDoc, getDocs, } from 'firebase/firestore';
import EditProfile from './Pages/EditProfile/EditProfile';
import { getAuth } from 'firebase/auth';
import UploadMusicPage from './Pages/UploadMusicPage/UploadMusicPage';


function App() {
  const [loggedUser, setLoggedUser] = useState({});
  const [users, setUsers] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [loading, setLoading] = useState(false);

  const usersCollectionRef = collection(db, "users")
  const getUsers = async () => {
    const Data = await getDocs(usersCollectionRef);
    setUsers(Data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  };

  useEffect(() => {
    getUsers();
  }, []);

  const usersDocRef = doc(db, "users", `${currentUser?.uid}`)
  const getUser = async () => {
    await getDoc(usersDocRef)
      .then((doc) => {
        setLoggedUser(doc.data(), doc.id)
      })
      .catch(error => {
        console.log('error fetching video ID:s', error)
      });
  };

  useEffect(() => {
    getUser();
  }, [currentUser?.uid])



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage loading={loading} setLoading={setLoading} />} />
        <Route path="/Login" element={<LoginPage loading={loading} setLoading={setLoading} />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/Home" element={<HomePage users={users} getUsers={getUsers} currentUser={currentUser} />} />
        <Route path="/Profile/:id" element={<UserProfile currentUser={currentUser} />} />
        <Route path="/EditProfile/:uid" element={<EditProfile currentUser={currentUser} loggedUser={loggedUser} />} />
        <Route path="UploadMusic/:id" element={<UploadMusicPage currentUser={currentUser} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
