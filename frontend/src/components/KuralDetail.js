import React, { useState } from 'react';
import axios from 'axios';
import './KuralDetail.css';

const KuralDetail = ({ user, getKurals }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [kural, setKural] = useState(user.kural);
  const [desc, setDesc] = useState(user.desc);
  const [no, setNo] = useState(user.no);
  const [message, setMessage] = useState('');
  const content = kural.split(" ");

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${user._id}`, { kural, desc, no });
      getKurals();
      setIsEditing(false);
      setMessage('குறள் updated successfully!');
    } catch (err) {
      setMessage('Failed to update குறள்.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this குறள்?')) {
      try {
        await axios.delete(`http://localhost:5000/users/${user._id}`);
        getKurals();
        setMessage('குறள் deleted successfully!');
      } catch (err) {
        setMessage('Failed to delete குறள்.');
        console.error(err);
      }
    }
  };

  return (
    <div className="container">
      {isEditing ? (
        <div className="edit-form">
          <span>எண் : <input type="number" value={no} onChange={(e) => setNo(e.target.value)} placeholder="No" className="input" /></span>
          <span>குறள் : <input type="text" value={kural} onChange={(e) => setKural(e.target.value)} placeholder="Kural" className="input" /></span>
          <span>பொருள் : <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Desc" className="input" /></span>
          <span><button onClick={handleUpdate} className="button-update">Update</button>
          <button onClick={() => setIsEditing(false)} className="button-cancel">Cancel</button></span>
        </div>
      ) : (
        <div className="kural-info">
          <span>{no} . {content[1] + " " + content[2] + " " + content[3] + " " + content[4]}</span>
          <span>{content[5] + " " + content[6] + " " + content[7]}</span>
          <br/><b>விளக்கம் : </b> <span>{desc}<br/><br/>
          <button onClick={() => setIsEditing(true)} className="button-edit">Edit</button>
          <button onClick={handleDelete} className="button-delete">Delete</button></span>
        </div>
      )}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default KuralDetail;
