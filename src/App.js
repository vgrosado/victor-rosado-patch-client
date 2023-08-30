import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import HomePage from './Pages/HomePage/HomePage';
import { useEffect, useState } from 'react';
import {db} from './Firebase';
import {collection, getDocs} from 'firebase/firestore'

function App() {

  const [artists, setArtists] = useState([]);
  const artistsCollectionRef = collection(db, "Artists")

  useEffect(() => {
    const getArtist = async () => {
      const Data = await getDocs(artistsCollectionRef);
      console.log(Data)
      setArtists(Data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      console.log(artists)
  
    };

    getArtist();
  }, [])

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/Login" element={<LoginPage/>} />
      <Route path="/SignUp" element={<SignUpPage/>} />
      <Route path="/Home" element={<HomePage artists={artists}/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
