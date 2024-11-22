"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUsers, FaPlus, FaTasks, FaChevronLeft } from 'react-icons/fa';

export default function AdminWelcome() {
  const { data: session, status } = useSession();
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSolvedProblems, setShowSolvedProblems] = useState(false);
  const [hideButtons, setHideButtons] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleSession = async () => {
      if (status === "loading") {
        return;
      }

      if (!session) {
        signIn();
      } else {
        try {
          const solvedProblemsResponse = await fetch("/api/solvedProblems");
          const solvedProblemsData = await solvedProblemsResponse.json();
          setSolvedProblems(solvedProblemsData);
          const usersResponse = await fetch("/api/admin/fetchUsers");
          if (!usersResponse.ok) {
            throw new Error("Failed to fetch users");
          }
          const usersData = await usersResponse.json();
          setUsers(usersData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      setLoading(false);
    };

    handleSession();
  }, [session, status]);

  const handleShowProblems = () => {
    setShowSolvedProblems(true);
    setHideButtons(true);
    router.push("#submissions");
  };

  const handleBackToAdmin = () => {
    setShowSolvedProblems(false);
    setHideButtons(false);
    router.push("/admin-welcome");
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6 bg-gray-900 text-white">
      {/* Only show this section if showSolvedProblems is false */}
      {!showSolvedProblems && (
        <>
          <h1 className="text-4xl font-bold mb-6 text-center text-orange-400">
            Welcome to Admin Panel
          </h1>
          <h2 className="text-2xl mb-4 text-gray-500 text-center">
            Manage Your Platform's Content
          </h2>
        </>
      )}

      {/* Conditionally render buttons if hideButtons is false */}
      {!hideButtons && !showSolvedProblems && (
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <button
            className="w-96 bg-gray-800 text-white shadow-2xl rounded-lg overflow-hidden border border-gray-700 hover:shadow-3xl transition-shadow duration-300 p-8"
            onClick={handleShowProblems}
          >
            <div className="flex justify-center items-center mb-4">
              <FaTasks className="text-5xl text-orange-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-orange-400 text-center">
              View Submissions
            </h3>
            <p className="text-gray-400 text-center">Manage and review all submissions.</p>
          </button>

          <Link
            href={session ? "/users" : "/login"}
            className="w-96 bg-gray-800 text-white shadow-2xl rounded-lg overflow-hidden border border-gray-700 hover:shadow-3xl transition-shadow duration-300 p-8"
          >
            <div className="flex justify-center items-center mb-4">
              <FaUsers className="text-5xl text-orange-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-orange-400 text-center">
              Registered Users
            </h3>
            <p className="text-gray-400 text-center">View and manage registered users.</p>
          </Link>

          <Link
            href={session ? "/add-problems" : "/login"}
            className="w-96 bg-gray-800 text-white shadow-2xl rounded-lg overflow-hidden border border-gray-700 hover:shadow-3xl transition-shadow duration-300 p-8"
          >
            <div className="flex justify-center items-center mb-4">
              <FaPlus className="text-5xl text-orange-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-orange-400 text-center">
              Add Problem Statements
            </h3>
            <p className="text-gray-400 text-center">Add new problem statements for users.</p>
          </Link>

          <Link
            href={session ? "/submissions" : "/login"}
            className="w-96 bg-gray-800 text-white shadow-2xl rounded-lg overflow-hidden border border-gray-700 hover:shadow-3xl transition-shadow duration-300 p-8"
          >
            <div className="flex justify-center items-center mb-4">
              <FaChevronLeft className="text-5xl text-orange-500" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-orange-400 text-center">
              Submission Details
            </h3>
            <p className="text-gray-400 text-center">View detailed information about submissions.</p>
          </Link>
        </div>
      )}

      {/* Back button to return to admin page */}
      {showSolvedProblems && (
        <button
          onClick={handleBackToAdmin}
          className="mb-6 px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300"
        >
          Back to Admin
        </button>
      )}

      {showSolvedProblems && (
        <div className="flex flex-col space-y-6 mb-6 w-full max-w-6xl mx-auto">
          {solvedProblems.length > 0 ? (
            solvedProblems.map((solvedProblem) => (
              <div
                key={solvedProblem._id}
                className="p-8 bg-gray-800 shadow-2xl rounded-lg border-l-4 border-orange-400 hover:shadow-3xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-semibold mb-6 text-orange-400">
                  {solvedProblem.problem ? solvedProblem.problem.title : "Untitled Problem"}
                </h3>

                {/* Solution Section */}
                {solvedProblem.solution.map((solution, index) => (
                  <div key={solution._id} className="mb-6 border-t pt-6">
                    <h4 className="text-xl font-semibold text-red-500">
                      Solution {index + 1}
                    </h4>
                    <pre className="bg-gray-700 p-6 rounded-md text-white">{solution.code}</pre>
                    <p className="text-gray-400">Complexity: {solution.complexity.join(", ")}</p>
                    <p className="text-gray-400">Status: {solution.status}</p>
                    <p className="text-gray-400">
                      Passed Test Cases: {solution.passedTestCases}
                    </p>
                    <p className="text-gray-400">
                      Submitted At: {new Date(solution.submissionTime).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No solved problems available.</p>
          )}
        </div>
      )}
    </div>
  );
}
