// // //app/users/page.js

// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';

// const RegisteredUsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('/api/users');
//         if (!response.ok) {
//           throw new Error('Failed to fetch users');
//         }
//         const data = await response.json();
//         console.log('Fetched data:', data); // Debugging line
//         setUsers(data);
//       } catch (error) {
//         setError(error.message);
//         console.error('Fetch error:', error); // Debugging line
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (users.length === 0) return <div>No registered users</div>;

//   return (
//     <div>
//       <h1>Registered Users</h1>
//       <table className="min-w-full bg-white border border-gray-200">
//         <thead>
//           <tr className="border-b">
//             <th className="py-2 px-4 text-left">Email</th>
//             <th className="py-2 px-4 text-left">Created At</th>
//             <th className="py-2 px-4 text-left">Name</th>
//             <th className="py-2 px-4 text-left">City</th>
//             <th className="py-2 px-4 text-left">Details</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user._id} className="border-b">
//               <td className="py-2 px-4">{user.email}</td>
//               <td className="py-2 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
//               <td className="py-2 px-4">{user.userInfo?.name || 'N/A'}</td>
//               <td className="py-2 px-4">{user.userInfo?.city || 'N/A'}</td>
//               <td className="py-2 px-4">
//                 <Link href={`/user-details/${user._id}`} className="text-blue-500 hover:underline">
//                   View Details
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default RegisteredUsersPage;



'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const RegisteredUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging line
        setUsers(data);
      } catch (error) {
        setError(error.message);
        console.error('Fetch error:', error); // Debugging line
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (users.length === 0) return <div>No registered users</div>;

  return (
    <div>
      <h1 className="text-black">Registered Users</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4 text-left text-black">Email</th>
            <th className="py-2 px-4 text-left text-black">Created At</th>
            <th className="py-2 px-4 text-left text-black">Name</th>
            <th className="py-2 px-4 text-left text-black">City</th>
            <th className="py-2 px-4 text-left text-black">Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b">
              <td className="py-2 px-4 text-black">{user.email}</td>
              <td className="py-2 px-4 text-black">{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-4 text-black">{user.userInfo?.name || 'N/A'}</td>
              <td className="py-2 px-4 text-black">{user.userInfo?.city || 'N/A'}</td>
              <td className="py-2 px-4">
                <Link href={`/user-details/${user._id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredUsersPage;
