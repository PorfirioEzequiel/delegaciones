import React, { useEffect, useState } from 'react';
import supabase from '../services/client';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from 'react-router-dom';
import Registro from './Registro';
import Usuarios from '../DashboardAdmin/Usuarios';
import Reporte from '../DashboardAdmin/Reporte';
import Delegaciones from '../DashboardAdmin/Delegaciones';

function DashboardAdmin() {
    const { state } = useLocation();
    const { user } = state || {};
    const [users, setUsers] = useState([]);
    const [registrations, setRegistrations] = useState([]);

    const [isTableroActive, setIsTableroActive] = useState(true);
    const [isUsuariosActive, setIsUsuariosActive] = useState(false);
    const [isDelegacionesActive, setIsDelegacionesActive] = useState(false);
    const [isCalendarActive, setIsCalendarActive] = useState(false);
    const [isReporteActive, setReporteActive] = useState(false);

    const navigate = useNavigate();

    // const navigation = [
    //   { name: 'Tablero', href: '/', current: true },
    //   { name: 'Usuarios', current: false },
    //   { name: 'Delegaciones', href: '/', current: false },
    //   { name: 'Calendar', href: '/', current: false },
    //   { name: 'Reporte', href: '/', current: false },
    // ]
    const userNavigation = [
      { name: 'Perfil', href: '#' },
      { name: 'Configuración', href: '#' },
      { name: 'Salir', href: '/' },
    ]
    const handleMenu = (tab, usu, dele, cal, rep) => {
      setIsTableroActive(tab);
      setIsUsuariosActive(usu);
      setIsDelegacionesActive(dele);
      setIsCalendarActive(cal);
      setReporteActive(rep)
      
    };

    useEffect(() => {
      fetchUsers();
      fetchRegistrations();
    }, []);
  
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'delegacion');
  
      if (error) {
        alert(error.message);
      } else {
        setUsers(data);
      }
    };
  
    const fetchRegistrations = async () => {
      const { data, error } = await supabase
        .from('registros')
        .select('*');
  
      if (error) {
        alert(error.message);
      } else {
        setRegistrations(data);
      }
    };

    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }
  
    return (
      // <div>
      //   <h1>Dashboard Admin</h1>
      //   <h2>Usuarios Regionales</h2>
      //   <ul role="list" class="divide-y divide-gray-100">
      //     {users.map((user) => (
      //       <li key={user.id}>
      //         {user.usuario} - Delegación: {user.delegacion}
      //       </li>
      //     ))}
      //   </ul>
      //   <h2>Registros por Región</h2>
      //   <ul role="list" class="divide-y divide-gray-100">
      //     {registrations.map((reg) => (
      //       <li key={reg.id} class="flex justify-between gap-x-6 py-5">
      //         <div class="flex min-w-0 gap-x-4">
      //           <div class="flex-none rounded-full bg-emerald-500/20 p-1">
      //           <div class="size-1.5 rounded-full bg-emerald-500"></div>
      //           </div>
      //           <div class="min-w-0 flex-auto">
      //             <p class="text-sm/6 font-semibold text-gray-900">{reg.nombre} {reg.apellido_paterno} {reg.apellido_materno} </p>
      //             <p class="mt-1 truncate text-xs/5 text-gray-500"> {reg.curp}</p> 
      //           </div>
      //         </div>
      //         <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      //           <p class="text-sm/6 text-gray-900">{reg.delegacion}</p>
      //           <p class="mt-1 text-xs/5 text-gray-500">{reg.fecha_registro}</p>
      //         </div>
      //       </li>
      //     ))}
      //   </ul>
      // </div>
      <>
      <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=purple&shade=500"
                  className="size-8"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* tab, usu, dele, cal, rep */}
                    <button
                      onClick={() => handleMenu(true, false, false, false, false)}
                      className='text-gray-300 hover:bg-gray-700 hover:text-white'
                    >Registros
                    </button>
                    <button
                      onClick={() => handleMenu(false, true, false, false, false)}
                      className='text-gray-300 hover:bg-gray-700 hover:text-white'
                    >Usuarios
                    </button>
                    <button
                      onClick={() => handleMenu(false, false, true, false, false)}
                      className='text-gray-300 hover:bg-gray-700 hover:text-white'
                    >Delegaciones
                    </button>
                    <button
                      onClick={() => handleMenu(false, false, false, true, false)}
                      className='text-gray-300 hover:bg-gray-700 hover:text-white'
                    >Calendario
                    </button>
                    <button
                      onClick={() => handleMenu(false, false, false, false, true)}
                      className='text-gray-300 hover:bg-gray-700 hover:text-white'
                    >Reporte
                    </button>

                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Notificaciones</span>
                  <BellIcon aria-hidden="true" className="size-6" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Menu</span>
                      <img alt="" src={user.imageUrl} className="size-8 rounded-full" />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    {userNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <a
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                          {item.name}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {/* {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))} */}
          </div>
          <div className="border-t border-gray-700 pt-4 pb-3">
            <div className="flex items-center px-5">
              <div className="shrink-0">
                <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
              </div>
              <div className="ml-3">
                <div className="text-base/5 font-medium text-white">{user.role}</div>
                <div className="text-sm font-medium text-gray-400">{user.usuario}</div>
              </div>
              <button
                type="button"
                className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Notificaciones</span>
                <BellIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {userNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      
      
      <main>
      {isReporteActive && <Reporte/>}
      {isUsuariosActive && <Usuarios/>}
      {isDelegacionesActive && <Delegaciones/>}
        {isTableroActive && <>
        <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Registros</h1>
        </div>
      </header>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <ul role="list" className="divide-y divide-gray-100">
            {registrations.map((person) => (
              <li key={person.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  {/* <img alt="" src={person.imageUrl} className="size-12 flex-none rounded-full bg-gray-50" /> */}
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold text-gray-900">{person.nombre} {person.apellido_paterno} {person.apellido_materno}</p>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">{person.curp}</p>
                  </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm/6 text-gray-900">{person.delegacion}</p>
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="size-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs/5 text-gray-500">Voto</p>
                    </div>
                  </div>
              </li>
            ))}
          </ul>
        </div>
        </>
        }
      </main>
    </div>
  </>


    );
}
export default DashboardAdmin;