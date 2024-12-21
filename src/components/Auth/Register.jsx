import { useForm } from "react-hook-form";
import { auth, db } from "../../services/fireBaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth/cordova";
import {doc, setDoc} from 'firebase/firestore'

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCredential.user, { displayName: data.name });
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: data.email,
        displayName: data.name,
        role: 'usuario'
      });
      console.log("Usuario registrado:", userCredential.user);
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4 items-center mt-8"
    >
      <div className="form-group">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Crear Cuenta
        </h2>

        <label className="block text-sm font-medium text-gray-700">
          Nombre:
        </label>
        <input
          {...register("name", { required: true })}
          className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.name && (
          <span className="text-sm text-red-600">Este campo es requerido</span>
        )}
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <input
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <span className="text-sm text-red-600">Email no válido</span>
        )}
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700">
          Contraseña:
        </label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.password && (
          <span className="text-sm text-red-600">
            Debe tener al menos 6 caracteres
          </span>
        )}
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700">
          Repetir Contraseña:
        </label>
        <input
          type="password"
          {...register("repitPassword", {
            required: "Debe repetir la contraseña",
            validate: (value) =>
              value === password || " La contraseña debe ser la misma",
          })}
          className="w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.repitPassword && (
          <span className="text-sm text-red-600">
            La contraseña debe ser la misma
          </span>
        )}
      </div>

      <input
        type="submit"
        className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
    </form>
  );
}

export default Register;
