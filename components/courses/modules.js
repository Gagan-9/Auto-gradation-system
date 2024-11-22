'use client';

import React, { useState, useEffect } from 'react';

const Modules = ({ setData }) => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch modules');
        }
        const data = await response.json();
        const allModules = data.flatMap(course => course.modules);
        setModules(allModules);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const handleModuleClick = (module) => {
    console.log(module);
    setData(module);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className={`md:hidden my-4 ${open ? 'hidden' : ''}`}>
        <img
          src='/menu.png'
          alt='Open menu'
          className='w-8 h-8 object-contain cursor-pointer'
          onClick={() => setOpen(true)}
        />
      </div>
      <div className={`w-full max-w-[350px] flex flex-col overflow-y-auto max-md:absolute max-md:bg-white z-10 ${!open ? 'max-md:hidden' : ''}`}>
        <div 
          className="px-4 py-4 flex justify-between items-center cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <h1>Modules</h1>
          <img
            src='/menu.png'
            alt='Close menu'
            className='w-8 h-8 object-contain md:hidden'
          />
        </div>
        {modules.map((module) => (
          <div key={module._id} className="rounded-2xl m-2 border-2 border-gray-50">
            <div className="bg-gray-600 text-white rounded-t-2xl p-3 flex flex-col justify-center gap-2">
              <h1 className="text-base font-semibold">{module.title}</h1>
            </div>
            <div className="flex flex-col ml-4">
              {module.lessons.map((lesson, index) => (
                <div key={index} className="p-2 flex flex-row items-center gap-2 text-xs">
                  <span className="min-w-[60px] font-semibold">Lesson {index + 1}</span>
                  <span 
                    onClick={() => handleModuleClick(lesson.content)}
                    className="flex-grow cursor-pointer text-blue-500 break-words"
                    aria-label={`Click to select ${lesson.title}`}
                  >
                    {lesson.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modules;
