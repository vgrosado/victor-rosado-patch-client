import './App.scss';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import HomePage from './Pages/HomePage/HomePage';
import UserProfile from './Pages/UserProfile/UserProfile';
import { useEffect, useState } from 'react';
import {db} from './Firebase';
import {collection, getDocs} from 'firebase/firestore';


function App() {
  const [artists, setArtists] = useState([]);
  // const artistsCollectionRef = collection(db, "Artists")

  useEffect(() => {
    const artistsCollectionRef = collection(db, "Artists")
    const getArtists = async () => {
      const Data = await getDocs(artistsCollectionRef);
      setArtists(Data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };

    getArtists();
  }, []);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/Login" element={<LoginPage/>} />
      <Route path="/SignUp" element={<SignUpPage/>} />
      <Route path="/Home" element={<HomePage artists={artists} />} />
      <Route path="/Profile/:id" element={<UserProfile artists={artists}/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
