"use client";

import { useEffect, useState } from 'react';

export default function SolvedProblemsPage() {
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolvedProblems = async () => {
      try {
        const response = await fetch('/api/solvedProblems');
        if (response.ok) {
          const data = await response.json();
          setSolvedProblems(data);
        } else {
          console.error('Failed to fetch solved problems');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolvedProblems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Solved Problems</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {solvedProblems.map((solvedProblem) => (
          <div key={solvedProblem._id} className="block w-60 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 hover:shadow-xl transition-shadow duration-300">
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-blue-500">{solvedProblem.problem?.title || 'Untitled Problem'}</h3>
              <p className="text-gray-600">Contest: {solvedProblem.contest?.name || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
