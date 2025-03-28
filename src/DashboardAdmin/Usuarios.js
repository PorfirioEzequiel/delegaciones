import React, { useEffect, useState } from 'react';
import supabase from '../services/client';

function Usuarios(){
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchUsers();
        
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
    return(<>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Usuarios</h1>
        </div>
      </header>

        <ul role="list" class="divide-y divide-gray-100">
          {users.map((user) => (
            <li key={user.id}>
              {user.usuario} - Delegación: {user.delegacion}
            </li>
          ))}
        </ul>
        </>
    )

};

export default Usuarios;