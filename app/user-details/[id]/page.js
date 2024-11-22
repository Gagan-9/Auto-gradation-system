// // //app/user-details/[id]/page.js

// "use client"; // Ensures this component is a Client Component

// import { useParams } from "next/navigation"; // Use useParams instead of useRouter
// import { useEffect, useState } from "react";

// export default function UserDetails() {
//   const { id } = useParams(); // Get the id from the route params
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (id) {
//       const fetchUser = async () => {
//         try {
//           const response = await fetch(`/api/users/${id}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch user details');
//           }
//           const data = await response.json();
//           console.log('Fetched user data:', data); // Debugging line
//           setUser(data);
//         } catch (error) {
//           console.error(error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchUser();
//     }
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!user) {
//     return <div>User not found</div>;
//   }

//   return (
//     <div>
//       <h1>User Details for ID: {id}</h1>
//       <p>Name: {user.name}</p>
//       <p>Email: {user.email}</p>
//       <p>Age: {user.age}</p>
//       <p>Gender: {user.gender}</p>
//       <p>College: {user.college}</p>
//       <p>City: {user.city}</p>
//       <p>Country: {user.country}</p>
//       <p>Phone: {user.phone}</p>
//       <p>Rating: {user.rating}</p>
//       <p>Amount: {user.amount}</p>
//       {/* Add more user details as needed */}
//     </div>
//   );
// }

"use client"; // Ensures this component is a Client Component

import { useParams } from "next/navigation"; // Use useParams instead of useRouter
import { useEffect, useState } from "react";

export default function UserDetails() {
  const { id } = useParams(); // Get the id from the route params
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`/api/users/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user details');
          }
          const data = await response.json();
          console.log('Fetched user data:', data); // Debugging line
          setUser(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  // Assuming the user object contains userInfo as a nested object
  const userInfo = user.userInfo || {};

  return (
    <div>
      <h1>User Details for ID: {id}</h1>
      <p>Name: {userInfo.name || 'N/A'}</p>
      <p>Email: {user.email || 'N/A'}</p>
      <p>Age: {userInfo.age || 'N/A'}</p>
      <p>Gender: {userInfo.gender || 'N/A'}</p>
      <p>College: {userInfo.college || 'N/A'}</p>
      <p>City: {userInfo.city || 'N/A'}</p>
      <p>Country: {userInfo.country || 'N/A'}</p>
      <p>Phone: {userInfo.phone || 'N/A'}</p>
      <p>Rating: {userInfo.rating || 'N/A'}</p>
      <p>Amount: {userInfo.amount || 'N/A'}</p>
      {/* Add more user details as needed */}
    </div>
  );
}

