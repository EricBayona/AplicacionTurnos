import { useEffect, useState } from 'react';
import { db } from '../../services/fireBaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const querySnapshot = await getDocs(collection(db, 'appointments'));
      const appts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(appts);
    };

    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };

    fetchAppointments();
    fetchUsers();
  }, []);

  const handleDeleteAppointment = async (id) => {
    try {
      await deleteDoc(doc(db, 'appointments', id));
      setAppointments(appointments.filter(appointment => appointment.id !== id));
      alert('Turno eliminado de forma exitosa!');
    } catch (error) {
      console.error('Error al borrar el turno: ', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      setUsers(users.filter(user => user.id !== id));
      alert('Usuario eliminado de forma exitosa');
    } catch (error) {
      console.error('Error al borrar usuario:', error);
    }
  };
console.log(users);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Panel de Control</h2>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Gestionar Turnos</h3>
        <ul className="mt-4 space-y-2">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="p-2 border rounded-md bg-gray-100 flex justify-between items-center">
              <div>
                <p><strong>Fecha:</strong> {appointment.date}</p>
                <p><strong>Hora:</strong> {appointment.time}</p>
                <p><strong>Paciente Usuario:</strong> {appointment.patientName}</p>
                <p><strong>Paciente Email:</strong> {appointment.patientEmail}</p>
                <p><strong>Patient ID:</strong> {appointment.patientId}</p>
                <p><strong>Doctor:</strong> {appointment.doctorName}</p>
              </div>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => handleDeleteAppointment(appointment.id)}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Administrar Usuarios</h3>
        <ul className="mt-4 space-y-2">
          {users.map((user) => (
            <li key={user.id} className="p-2 border rounded-md bg-gray-100 flex justify-between items-center">
              <div>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Name:</strong> {user.displayName}</p>
                <p><strong>User ID:</strong> {user.id}</p>
              </div>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => handleDeleteUser(user.id)}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
