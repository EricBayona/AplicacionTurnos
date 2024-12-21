import { useState } from 'react';
import { db } from '../../services/fireBaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AddDoctor = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [availableDays, setAvailableDays] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'doctors'), {
        name,
        specialty,
        availableDays,
        availableTimes,
      });
      alert('Doctor added successfully!');
      setName('');
      setSpecialty('');
      setAvailableDays([]);
      setAvailableTimes([]);
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const handleAddDay = () => {
    const day = prompt('Enter a day of the week (e.g., Monday):');
    if (day) setAvailableDays([...availableDays, day]);
  };

  const handleAddTime = () => {
    const time = prompt('Enter a time slot in 24-hour format (e.g., 14:00 for 2 PM):');
    if (time && /^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) { // Validate 24-hour format
      setAvailableTimes([...availableTimes, time]);
    } else {
      alert('Please enter a valid time in HH:mm format.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Add Doctor</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Specialty:</label>
        <input
          type="text"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Available Days:</label>
        <div className="flex space-x-2 mt-1">
          {availableDays.map((day, index) => (
            <span key={index} className="px-2 py-1 bg-gray-200 rounded-md">{day}</span>
          ))}
          <button type="button" onClick={handleAddDay} className="px-2 py-1 bg-blue-500 text-white rounded-md">Add Day</button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Available Times (24-hour format):</label>
        <div className="flex space-x-2 mt-1">
          {availableTimes.map((time, index) => (
            <span key={index} className="px-2 py-1 bg-gray-200 rounded-md">{time}</span>
          ))}
          <button type="button" onClick={handleAddTime} className="px-2 py-1 bg-blue-500 text-white rounded-md">Add Time</button>
        </div>
      </div>
      <button type="submit" className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md">Add Doctor</button>
    </form>
  );
};

export default AddDoctor;
