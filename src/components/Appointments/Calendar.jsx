import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from '../../services/fireBaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Booking from './Booking';

const AppointmentsCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      const querySnapshot = await getDocs(collection(db, 'doctors'));
      const doctorList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDoctors(doctorList);
      console.log("Doctores obtenidos:", doctorList);
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      const q = query(
        collection(db, 'appointments'),
        where('date', '==', date.toISOString().split('T')[0])
      );
      const querySnapshot = await getDocs(q);
      const appts = querySnapshot.docs.map(doc => doc.data());
      setAppointments(appts);
      console.log("Citas obtenidas para la fecha:", date.toISOString().split('T')[0], appts);

      if (selectedDoctor) {
        const doctor = doctors.find(doc => doc.id === selectedDoctor);
        const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });

        if (doctor && doctor.availableDays.includes(dayOfWeek)) {
          const allSlots = doctor.availableTimes;
          const reservedSlots = appts
            .filter(appointment => appointment.doctorId === selectedDoctor)
            .map(appointment => appointment.time);
          const filteredSlots = allSlots.filter(slot => !reservedSlots.includes(slot));
          setAvailableSlots(filteredSlots);
          console.log("Slots disponibles:", filteredSlots);
        } else {
          setAvailableSlots([]);
          console.log("No hay slots disponibles para el día seleccionado.");
        }
      }
    };

    fetchAppointments();
  }, [date, selectedDoctor, doctors]);

  const handleDateChange = newDate => {
    setDate(newDate);
  };

  const handleDoctorChange = e => {
    setSelectedDoctor(e.target.value);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Elegir Turno</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Seleccionar Médico:</label>
        <select
          value={selectedDoctor}
          onChange={handleDoctorChange}
          className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md"
        >
          <option value="" disabled>Selecciona un médico</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} ({doctor.specialty})
            </option>
          ))}
        </select>
      </div>
      <Calendar onChange={handleDateChange} value={date} className="mt-4" />
      <Booking availableSlots={availableSlots} selectedDate={date} selectedDoctor={selectedDoctor} doctors={doctors} />
    </div>
  );
};

export default AppointmentsCalendar;
