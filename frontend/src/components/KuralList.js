import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KuralDetail from './KuralDetail';
import './KuralList.css';

const KuralList = () => {
  const [kurals, setKurals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => setKurals(response.data))
      .catch(error => console.error(error));
  }, []);

  const getKurals = () => {
    axios.get('http://localhost:5000/users')
      .then(response => setKurals(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div className="kural-list-container">
      <h2 className="title">குறள்கள்</h2>
      <ul className="kural-list">
        {kurals.map(kural => (
          <KuralDetail key={kural._id} user={kural} getKurals={getKurals} />
        ))}
      </ul>
    </div>
  );
};

export default KuralList;
