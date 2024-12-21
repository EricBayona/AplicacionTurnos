import { useEffect, useState } from 'react';
import { useAuth } from '../../services/auth';
import { db } from '../../services/fireBaseConfig';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import Modal from 'react-modal';

const AppointmentsList = () => {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      if (currentUser) {
        const q = query(
          collection(db, 'appointments'),
          where('patientId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const appts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAppointments(appts);
      }
    };

    fetchAppointments();
  }, [currentUser]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'appointments', id));
      setAppointments(appointments.filter(appointment => appointment.id !== id));
      alert('Turno eliminado exitosamente!');
    } catch (error) {
      console.error('Error al eliminar el turno:', error);
    }
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setNewTime(appointment.time);
    setModalIsOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const appointmentDoc = doc(db, 'appointments', selectedAppointment.id);
      await updateDoc(appointmentDoc, { time: newTime });
      setAppointments(appointments.map(appt => appt.id === selectedAppointment.id ? { ...appt, time: newTime } : appt));
      setModalIsOpen(false);
      alert('Turno actualizado exitosamente!');
    } catch (error) {
      console.error('Error al actualizar el turno:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Mis Turnos</h2>
      {appointments.length === 0 ? (
        <p>No tienes turnos reservados.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="p-2 border rounded-md bg-gray-100 flex justify-between items-center">
              <div>
                <p><strong>Fecha:</strong> {appointment.date}</p>
                <p><strong>Hora:</strong> {appointment.time}</p>
                <p><strong>Médico:</strong> {appointment.doctorName}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  onClick={() => handleEdit(appointment)}
                >
                  Editar
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(appointment.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {selectedAppointment && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
          overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
        >
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Editar Turno</h2>
            <label className="block text-sm font-medium text-gray-700">Nueva Hora:</label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex space-x-2 mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleUpdate}
              >
                Actualizar
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                onClick={() => setModalIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AppointmentsList;
