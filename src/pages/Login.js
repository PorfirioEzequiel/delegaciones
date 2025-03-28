import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../services/client';

const Login = () => {
  const [formData, setFormData] = useState({ usuario: '', contraseña: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Consultar en Supabase
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('usuario', formData.usuario)
        .eq('password', formData.contraseña)
        .single();

      if (error || !data) {
        setError('Usuario o contraseña incorrectos');
        return;
      }

      // Guardar sesión en sessionStorage
      sessionStorage.setItem('user', JSON.stringify(data));

      // Redirigir según el puesto
      const rutas = {
        admin: `/admin/${data.role}`,
        'delegacion': `/delegacion/${data.role}`,
        };

      const ruta = rutas[data.role.toLowerCase()] || null;
      if (ruta) {
        navigate(ruta, { state: { user: data } });
      } else {
        setError('Rol desconocido');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Error interno. Inténtalo más tarde.');
    }
  };

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <img
            alt="ELECCIONES 2025"
            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=purple&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Ingresa a tu cuenta
          </h2>
        </div>
    
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-800 font-bold">Usuario:</label>
          <input
            type="text"
            name="usuario"
            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
            value={formData.usuario}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 font-bold">Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        >
          Iniciar sesión
        </button>
      </form>

      {error && <p class="text-red-600 mt-2">{error}</p>}
    </div>
    </div>
    </>
  );
};

export default Login;
