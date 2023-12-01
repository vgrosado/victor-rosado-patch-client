import './App.scss';
import { BrowserRouter, Route, Routes, useParams} from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import HomePage from './Pages/HomePage/HomePage';
import UserProfile from './Pages/UserProfile/UserProfile';
import { useEffect, useState } from 'react';
import { db } from './Firebase';
import { collection, doc, getDoc, getDocs, } from 'firebase/firestore';
import EditProfile from './Pages/EditProfile/EditProfile';
import { getAuth } from 'firebase/auth';


function App() {
  const {uid} = useParams();
  const [user, setUser] = useState({});
  const [artists, setArtists] = useState([]);
  const [users, setUsers] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  console.log(users)

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
  }, [uid]);

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
  }, [])

  console.log(user)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/Home" element={<HomePage artists={artists} users={users} currentUser={currentUser} />} />
        <Route path="/Profile/:id" element={<UserProfile user={user} currentUser={currentUser} artists={artists}/>} />
        <Route path="/EditProfile/:uid" element={<EditProfile currentUser={currentUser} user={user}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
