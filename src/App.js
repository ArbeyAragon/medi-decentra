import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from './UserLogin';
import GeneralPhysicianLogin from './GeneralPhysicianLogin';
import CardiologistLogin from './CardiologistLogin';
import SampleCollectionLabLogin from './SampleCollectionLabLogin';
import CardiologyExamsLabLogin from './CardiologyExamsLabLogin';
import Home from './Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/general-physician-login" element={<GeneralPhysicianLogin />} />
        <Route path="/cardiologist-login" element={<CardiologistLogin />} />
        <Route path="/sample-collection-lab-login" element={<SampleCollectionLabLogin />} />
        <Route path="/cardiology-exams-lab-login" element={<CardiologyExamsLabLogin />} />
      </Routes>
    </Router>
  );
}

export default App;