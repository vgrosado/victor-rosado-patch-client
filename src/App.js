import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/LoginPage" element={<LoginPage/>} />
      <Route path="/SignUpPage" element={<SignUpPage/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
