import React, { useState, useEffect } from 'react';
import KuralList from './components/KuralList';
import KuralForm from './components/KuralForm';
import axios from 'axios';

const App = () => {
  const [kurals, setKurals] = useState([]);

  const getKurals = () => {
    axios.get('https://kural-fullstack.onrender.com/users')
      .then(response => setKurals(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    getKurals();
  }, []);

  return (
    <div>
      <h1>திருக்குறள்</h1>
      <KuralForm getKurals={getKurals} />
      <KuralList Kurals={kurals} />
    </div>
  );
};

export default App;
