import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import HomePage from './Pages/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/LoginPage" element={<LoginPage/>} />
      <Route path="/SignUpPage" element={<SignUpPage/>} />
      <Route path="/HomePage" element={<HomePage/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
