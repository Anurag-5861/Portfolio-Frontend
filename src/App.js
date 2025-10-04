import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import LandingPage from './Components/LandingPage';
import FriendDetails from './Components/FriendDetails';
import RecruiterDetails from './Components/RecuiterDetails';
import { Routes,Route,Navigate } from 'react-router-dom';
function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/recuiter" element={<RecruiterDetails />} />
          <Route path="/friend" element={<FriendDetails />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </>
  );
}

export default App;
