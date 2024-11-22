// app/submissions/page.js
"use client"; // Ensure this is a Client Component if you're using client-side hooks

import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function Submissions() {
  const { data: session, status } = useSession(); // Using useSession on the client side
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (status === 'loading') {
        return; // Wait until the session status is resolved
      }

      if (!session) {
        signIn(); // Redirect to login if no session
      } else {
        // Fetch submissions here
        try {
          const response = await fetch('/api/submissions'); // Adjust the endpoint as needed
          if (!response.ok) {
            throw new Error('Failed to fetch submissions');
          }
          const data = await response.json();
          setSubmissions(data);
        } catch (error) {
          console.error('Error fetching submissions:', error);
        }
      }

      setLoading(false); // Ensure loading is turned off
    };

    fetchSubmissions();
  }, [session, status]);

  if (status === 'loading' || loading) {
    return <div>Loading...</div>; // Provide feedback during loading or session check
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Submissions</h1>
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Submission ID</th>
            <th className="border border-gray-300 px-4 py-2">User Email</th>
            <th className="border border-gray-300 px-4 py-2">Problem Title</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id}>
              <td className="border border-gray-300 px-4 py-2">{submission._id}</td>
              <td className="border border-gray-300 px-4 py-2">{submission.userEmail}</td>
              <td className="border border-gray-300 px-4 py-2">{submission.problemTitle}</td>
              <td className="border border-gray-300 px-4 py-2">{submission.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
