import { useState } from 'react';
import { db } from '../../services/fireBaseConfig';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useAuth } from '../../services/auth';

const Booking = ({ availableSlots = [], selectedDate, selectedDoctor, doctors }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { currentUser } = useAuth();

  const handleBooking = async () => {
    if (selectedSlot && selectedDoctor && currentUser) {
      try {
        // Verificar si el horario ya está reservado para el médico seleccionado
        const q = query(
          collection(db, 'appointments'),
          where('date', '==', selectedDate.toISOString().split('T')[0]),
          where('time', '==', selectedSlot),
          where('doctorId', '==', selectedDoctor)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // Si no está reservado, proceder con la reserva
          const selectedDoctorData = doctors.find(doc => doc.id === selectedDoctor);
          console.log("Datos del turno:", {
            date: selectedDate.toISOString().split('T')[0],
            time: selectedSlot,
            patientId: currentUser.uid,
            patientName: currentUser.displayName || 'No Name',
            patientEmail: currentUser.email,
            doctorId: selectedDoctor,
            doctorName: selectedDoctorData.name
          });
          
          await addDoc(collection(db, 'appointments'), {
            date: selectedDate.toISOString().split('T')[0],
            time: selectedSlot,
            patientId: currentUser.uid,
            patientName: currentUser.displayName || 'No Name',
            patientEmail: currentUser.email,
            doctorId: selectedDoctor,
            doctorName: selectedDoctorData.name
          });
          
          alert('Turno reservado con éxito');
        } else {
          // Si el horario ya está reservado
          alert('Este turno ya está reservado. Por favor, selecciona otro.');
        }
      } catch (error) {
        console.error('Error reservando el turno:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Seleccionar Horario</h2>
      {availableSlots.length === 0 ? (
        <p>No hay turnos disponibles para esta fecha.</p>
      ) : (
        <ul className="space-y-2">
          {availableSlots.map((slot, index) => (
            <li key={index}>
              <button
                className={`w-full p-2 border rounded-md ${selectedSlot === slot ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleBooking}>
        Confirmar Turno
      </button>
    </div>
  );
};

export default Booking;
