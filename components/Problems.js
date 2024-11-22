"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineSolution } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ImCheckboxChecked } from "react-icons/im";

const Problems = () => {
  const router = useRouter();
  const [problems, setProblems] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");

  const difficultyColors = {
    Hard: "bg-red-700",
    Medium: "bg-orange-600",
    Easy: "bg-green-600",
  };

  const openVideoPopup = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideoPopup = () => {
    setSelectedVideo("");
  };

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch("/api/problems");
        if (res.ok) {
          const data = await res.json();
          setProblems(data); // Set the fetched problems to state
        } else {
          console.error("Error fetching problems");
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="bg-black text-white"> {/* Set background color to black and text color to white */}
      <div className="p-10 max-md:p-3">
        <div className="relative overflow-auto rounded-xl shadow-xl max-w-6xl mx-auto">
          {/* Unique and styled heading */}
          <div className="bg-gray-900 rounded-t-xl p-4 text-xl font-bold text-white">
            List of Problems
          </div>
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-gray-700 uppercase bg-black text-white">
              <tr>
                <th scope="col" className="p-6 bg-black"> {/* Set background color for th */}
                  No.
                </th>
                <th scope="col" className="p-6 bg-black"> {/* Set background color for th */}
                  Task
                </th>
                <th scope="col" className="p-6 bg-black"> {/* Set background color for th */}
                  Difficulty Level
                </th>
                <th scope="col" className="p-6 bg-black"> {/* Set background color for th */}
                  Problem Type
                </th>
                <th scope="col" className="p-6 bg-black"> {/* Set background color for th */}
                  Solution Status
                </th>
                <th scope="col" className="p-6 bg-black"> {/* Set background color for th */}
                  Video Tutorial
                </th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem, index) => (
                <tr key={index} className="bg-black hover:bg-gray-800"> {/* Set background color for each tr */}
                  <td className="p-4 text-center">
                    <div className="text-white">
                      {index + 1}
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 hover:text-blue-500 hover:font-semibold hover:cursor-pointer font-medium whitespace-nowrap transition-all ease-in">
                    <div className="w-[300px] text-ellipsis overflow-hidden"
                      onClick={() => {
                        router.push(`/problems/${problem.id}`);
                      }}>
                      <span className="text-white">{problem.title}</span>
                      {problem.hasSolution && <AiOutlineSolution className="ml-1 text-blue-500" />} {/* Render AiOutlineSolution if problem has solution */}
                    </div>
                  </th>
                  <td>
                    <div className={`w-fit mx-auto px-3 py-1 rounded-full hover:cursor-pointer text-sm text-light-1 ${difficultyColors[problem?.difficulty]}`}>
                      {problem.difficulty}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {problem.category}
                  </td>
                  <td className="px-6 py-4 cursor-pointer">
                    <ImCheckboxChecked size={20} color={"green"} className="mx-auto" />
                  </td>
                  <td className="px-6 py-4 cursor-pointer">
                    <FaYoutube color={"red"} size={35} onClick={() => openVideoPopup(problem.videoId)} className="mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedVideo && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50 p-2">
          <div className="w-full max-w-xl bg-white p-8 rounded-lg flex flex-col items-end gap-2 max-sm:p-3">
            <button onClick={closeVideoPopup} className="text-gray-600 hover:text-gray-800 focus:outline-none">
              Close
            </button>
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${selectedVideo}`}
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problems;
