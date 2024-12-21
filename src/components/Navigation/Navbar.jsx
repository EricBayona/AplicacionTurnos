import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [desplegado, setDesplegado] = useState(false);

  const handleLinkClick = () => {
    setDesplegado(false);
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-md dark:bg-gray-900">
      <Link to="/" className="text-2xl font-bold text-blue-700 dark:text-white">Turnos Medicos</Link>
      <button
        className="block xl:hidden text-gray-400 text-3xl"
        onClick={() => setDesplegado(!desplegado)}
      >
        ☰
      </button>
      <ul
        className={`menu flex-col items-center xl:flex-row gap-4 lg:pr-4 ${
          desplegado
            ? "fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center text-white"
            : "hidden"
        } xl:flex xl:text-gray-800 xl:dark:text-white`}
      >
        <li>
          <button
            className="p-4 xl:hidden text-gray-400 text-3xl absolute top-4 right-8"
            onClick={handleLinkClick}
          >
            X
          </button>
        </li>
        <li>
          <Link
            to="/profile"
            className="p-4 hover:text-blue-500 xl:hover:text-blue-700 dark:hover:text-blue-300"
            onClick={handleLinkClick}
          >
            Perfil
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="p-4 hover:text-blue-500 xl:hover:text-blue-700 dark:hover:text-blue-300"
            onClick={handleLinkClick}
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="p-4 hover:text-blue-500 xl:hover:text-blue-700 dark:hover:text-blue-300"
            onClick={handleLinkClick}
          >
            Register
          </Link>
          <Link
            to="/appointments"
            className="p-4 hover:text-blue-500 xl:hover:text-blue-700 dark:hover:text-blue-300"
            onClick={handleLinkClick}
          >
            Mis Turnos
          </Link>
          <Link
            to="/calendar"
            className="p-4 hover:text-blue-500 xl:hover:text-blue-700 dark:hover:text-blue-300"
            onClick={handleLinkClick}
          >
            Calendario
          </Link>
          <Link
            to="/booking"
            className="p-4 hover:text-blue-500 xl:hover:text-blue-700 dark:hover:text-blue-300"
            onClick={handleLinkClick}
          >
            booking
          </Link>
          <Link
            to="/admin"
            className="p-4 hover:text-blue-500 xl:hover:text-blue-700 dark:hover:text-blue-300"
            onClick={handleLinkClick}
          >
           Panel de control
          </Link>
          <Link
            to="/add-doctor"
            className="p-4 hover:text-blue-500 xl:hover:text-blue-700 dark:hover:text-blue-300"
            onClick={handleLinkClick}
          >
           Agregar Doctor
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
