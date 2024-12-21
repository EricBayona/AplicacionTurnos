import { useEffect, useState } from 'react';
import { useAuth } from '../../services/auth';
import { db } from '../../services/fireBaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const q = query(
        collection(db, 'appointments'),
        where('patientId', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const appts = querySnapshot.docs.map(doc => doc.data());
      setAppointments(appts);
    };

    if (currentUser) {
      fetchAppointments();
    }
  }, [currentUser]);

  if (!currentUser) return <div>Cargando...</div>;

  return (
    <div className="max-w-md mx-auto p-6 mt-8 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold">Perfil de Usuario</h2>
      <div>
        <p><strong>Nombre:</strong> {currentUser.displayName}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        {/* Agrega más información del usuario si es necesario */}
      </div>
      <h3 className="text-xl font-semibold mt-4">Turnos Reservados</h3>
      {appointments.length === 0 ? (
        <p>No tienes turnos reservados.</p>
      ) : (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index} className="border-b border-gray-200 py-2">
              <p><strong>Fecha:</strong> {appointment.date}</p>
              <p><strong>Médico:</strong> {appointment.doctorName}</p>
              {/* Agrega más detalles del turno si es necesario */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserProfile;
