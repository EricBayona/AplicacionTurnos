import { useForm } from 'react-hook-form';
import {auth} from '../../services/fireBaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth/cordova';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const onSubmit = async data => {
     try {
       await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log('Usuario autenticado');
       navigate('/profile');// Redirige al perfil del usuario después de iniciar sesión //
      } catch (error)
       { console.error('Error en el inicio de sesión:', error); } };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              {...register('email', { required: 'El email es requerido' })}
              className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <span className="text-sm text-red-600">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">Contraseña:</label>
            <input
              type="password"
              {...register('password', { required: 'La contraseña es requerida' })}
              className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <span className="text-sm text-red-600">{errors.password.message}</span>}
          </div>

          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
