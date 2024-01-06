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
  const [user, setUser] = useState({});
  const [artists, setArtists] = useState([]);
  const [users, setUsers] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const artistsCollectionRef = collection(db, "Artists")
    const getArtists = async () => {
      const Data = await getDocs(artistsCollectionRef);
      setArtists(Data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };

    getArtists();
  }, []);

  useEffect(() => {
    const usersCollectionRef = collection(db, "users")
    const getUsers = async () => {
      const Data = await getDocs(usersCollectionRef);
      setUsers(Data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };
    getUsers();
  }, []);

  const usersDocRef = doc(db, "users", `${currentUser?.uid}`)
  const getUser = async () => {
    await getDoc(usersDocRef)
      .then((doc) => {
        setUser(doc.data(), doc.id)
      })
      .catch(error => {
        console.log('error fetching video ID:s', error)
      });
  };

  useEffect(() => {
    getUser();
  }, [user?.uid])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage getUser={getUser} loading={loading} setLoading={setLoading} />} />
        <Route path="/Login" element={<LoginPage getUser={getUser} loading={loading} setLoading={setLoading} />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/Home" element={<HomePage getUser={getUser} artists={artists} users={users} currentUser={currentUser} />} />
        <Route path="/Profile/:id" element={<UserProfile getUser={getUser} user={user} currentUser={currentUser} artists={artists} />} />
        <Route path="/EditProfile/:uid" element={<EditProfile getUser={getUser} currentUser={currentUser} user={user} />} />
        <Route path="UploadMusic/:id" element={<UploadMusicPage currentUser={currentUser}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
