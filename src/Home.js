import './Home.css';
import React from 'react';
import Button from '@mui/material/Button';
import logo from './logo.svg';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate


function Home() {
    let navigate = useNavigate();
  
    // Función para manejar clics en los botones y navegar
    const handleButtonClick = (path) => {
        navigate(path); // Usa navigate en lugar de history.push
    };
  
    return (
      <div className="Home">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="button-container">
          <Button variant="contained" onClick={() => handleButtonClick('/user-login')}>User Home</Button>
          <Button variant="contained" onClick={() => handleButtonClick('/general-physician-login')}>General Physician Home</Button>
          <Button variant="contained" onClick={() => handleButtonClick('/cardiologist-login')}>Cardiologist Home</Button>
          <Button variant="contained" onClick={() => handleButtonClick('/sample-collection-lab-login')}>Sample Collection Lab Home</Button>
          <Button variant="contained" onClick={() => handleButtonClick('/cardiology-exams-lab-login')}>Cardiology Exams Lab Home</Button>
        </div>
      </div>
    );
  }
  
  export default Home;
