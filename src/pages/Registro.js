import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import supabase from '../services/client';
import { useLocation } from 'react-router-dom';
import qrCodeImg from "../express-qr-code.png"

function calcularEdad(fechaNacimiento) {
  // Dividir la fecha en día, mes y año
  const [dia, mes, año] = fechaNacimiento.split('/').map(Number);

  // Crear un objeto Date con la fecha de nacimiento
  const fechaNac = new Date(año, mes - 1, dia); // Los meses en JavaScript van de 0 a 11

  // Obtener la fecha actual
  const fechaActual = new Date();

  // Calcular la diferencia de años
  let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

  // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
  if (fechaActual.getMonth() < fechaNac.getMonth() || 
      (fechaActual.getMonth() === fechaNac.getMonth() && fechaActual.getDate() < fechaNac.getDate())) {
      edad--;
  }

  return edad;
}
function Registro() {
  const { state } = useLocation();
  const { user } = state || {};
  const [curp, setCurp] = useState("");
  const [nulo, setNulo] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [nombres, setNombres] = useState("");
  const [sexo, setSexo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [estado, setEstado] = useState("");
  const [numeroEstado, setNumeroEstado] = useState("");
  const [seccion, setSeccion] = useState("");
  const [isScannerActive, setIsScannerActive] = useState(false); // Estado para controlar el escáner

  const handleScan = (data) => {
    if (data) {
      const [
        curp, 
        nulo,
        apellidoPaterno,
        apellidoMaterno,
        nombres,
        sexo,
        fechaNacimiento,
        estado,
        numeroEstado,
      ] = data.text.split("|");
      setCurp(curp);
      setNulo(nulo);
      setApellidoPaterno(apellidoPaterno);
      setApellidoMaterno(apellidoMaterno);
      setNombres(nombres);
      setSexo(sexo);
      setFechaNacimiento(fechaNacimiento);
      setEstado(estado);
      setNumeroEstado(numeroEstado);
      setIsScannerActive(false); // Desactiva el escáner después de escanear
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const CURP_REGEX = /^[A-Z]{1}[AEIOU]{1}[A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM]{1}[A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9]{1}\d{1}$/;


  const handleRegister = async () => {
    if (!CURP_REGEX.test(curp)) {
      console.log("El CURP no es válido:", curp);
      alert("El CURP ingresado no es válido. Verifica que tenga el formato correcto.");
      return;
    }
    try {
    const { data, error } = await supabase.from("registros").insert(
      {
        curp: curp,
        nombre: nombres,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        sexo: sexo,
        fecha_nacimiento: fechaNacimiento,
        delegacion: user.delegacion,
        fecha_registro: new Date(),
        seccion,
        // estado,
        // numero_estado: numeroEstado,
        // seccion,
      },
    );

    if (error) {
      console.error("Error al registrar:", error);
      alert(error.code=== 23505 ? "":"REGISTRO DUPLICADO");
      setCurp("");
    } else {
      alert("Registro exitoso");
      setCurp("");
      setNombres("");
      setApellidoPaterno("");
      setApellidoMaterno("");
      setSeccion("");

    }}catch (error) {
      console.error("Error inesperado:", error);
      // setMessage("Ocurrió un error al enviar el reporte.");
    }
  };
 

  return (
    <div className='bg-gradient-to-r from-purple-300 via-gray-200 to-slate-300 flex items-center justify-center h-auto'>
      <div className='w-[540px] bg-gradient-to-r from-slate-200 via-gray-100 to-purple-200 rounded-xl p-4 my-40'>
      
       
      
      <div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
           
          
          <div className="sm:col-span-2">
            <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-900">
              CURP:
            </label>
            <div className="mt-2.5">
              <input 
              type="text"
              placeholder="CURP"
              value={curp}
              onChange={(e) => setCurp(e.target.value.trim().toUpperCase())}
              className='block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600'
              required/>
              {/* <p>{calcularEdad(fechaNacimiento)}</p> */}
              
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm/6 font-semibold text-gray-900">
              DELEGACIÓN:
            </label>
            <div className="mt-2.5">
              <p
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              >{user.delegacion}</p>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
              LOCALIDAD:
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                placeholder="LOCALIDAD"
                value={seccion}
                onChange={(e) => setSeccion(e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-purple-600"
                required
              />
            </div>
          </div>
        </div>

        
        <div className="mt-10">
        <button 
        className="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
        onClick={handleRegister}>REGISTRAR</button>
        </div>
        
      </div>
      
      </div>
    </div>
    
  );
};

export default Registro;