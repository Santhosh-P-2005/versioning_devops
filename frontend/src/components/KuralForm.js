import React, { useState } from 'react';
import axios from 'axios';
import './KuralForm.css';

const KuralForm = ({ getKurals }) => {
  const [kural, setKural] = useState('');
  const [desc, setDesc] = useState('');
  const [no, setNo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', { kural, desc, no });
      getKurals();
      setKural('');
      setDesc('');
      setNo('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="kural-form">
      <div className="form-group">
        <label htmlFor="no">எண் : </label>
        <input type="number" id="no" value={no} onChange={(e) => setNo(e.target.value)} className="input" />
      </div>
      <div className="form-group">
        <label htmlFor="kural">குறள் : </label>
        <input type="text" id="kural" value={kural} onChange={(e) => setKural(e.target.value)} className="input" />
      </div>
      <div className="form-group">
        <label htmlFor="desc">பொருள் : </label>
        <input type="text" id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} className="input" />
      </div>
      <span><button type="submit" className="button">+Add குறள்</button></span>
    </form>
  );
};

export default KuralForm;
