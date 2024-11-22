"use client";
import { useState } from 'react';

export default function AddProblems() {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    problemStatement: '',
    inputFormat: '',
    outputFormat: '',
    sampleInput: '',
    sampleOutput: '',
    likes: 10,
    dislikes: 0,
    order: '',
    category: '',
    constraints: '',
    companies: '',
    starterCode: '',
    difficulty: 'Easy',
    solution: '',
    videoId: '',
    testCases: [{ input: '', output: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTestCaseChange = (e, index, type) => {
    const { value } = e.target;
    const updatedTestCases = formData.testCases.map((testCase, i) =>
      i === index ? { ...testCase, [type]: value.split(',') } : testCase
    );
    setFormData((prevData) => ({
      ...prevData,
      testCases: updatedTestCases,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/problems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Problem added successfully!');
        setFormData({
          id: '',
          title: '',
          problemStatement: '',
          inputFormat: '',
          outputFormat: '',
          sampleInput: '',
          sampleOutput: '',
          likes: 10,
          dislikes: 0,
          order: '',
          category: '',
          constraints: '',
          companies: '',
          starterCode: '',
          difficulty: 'Easy',
          solution: '',
          videoId: '',
          testCases: [{ input: '', output: '' }],
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl bg-dark-700 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center text-orange-400">Add New Problem</h1>
      <form onSubmit={handleSubmit} className="space-y-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-gray-200">ID</label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="ID"
                className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-dark-600 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-200">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-dark-600 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="problemStatement" className="block text-sm font-medium text-gray-200">Problem Statement</label>
              <textarea
                id="problemStatement"
                name="problemStatement"
                value={formData.problemStatement}
                onChange={handleChange}
                placeholder="Problem Statement"
                className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-dark-600 text-white"
                rows="4"
                required
              />
            </div>
            <div>
              <label htmlFor="inputFormat" className="block text-sm font-medium text-gray-200">Input Format</label>
              <input
                type="text"
                id="inputFormat"
                name="inputFormat"
                value={formData.inputFormat}
                onChange={handleChange}
                placeholder="Input Format"
                className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-dark-600 text-white"
              />
            </div>
            <div>
              <label htmlFor="outputFormat" className="block text-sm font-medium text-gray-200">Output Format</label>
              <input
                type="text"
                id="outputFormat"
                name="outputFormat"
                value={formData.outputFormat}
                onChange={handleChange}
                placeholder="Output Format"
                className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-dark-600 text-white"
              />
            </div>
            <div>
              <label htmlFor="sampleInput" className="block text-sm font-medium text-gray-200">Sample Input</label>
              <input
                type="text"
                id="sampleInput"
                name="sampleInput"
                value={formData.sampleInput}
                onChange={handleChange}
                placeholder="Sample Input"
                className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-dark-600 text-white"
              />
            </div>
            <div>
              <label htmlFor="sampleOutput" className="block text-sm font-medium text-gray-200">Sample Output</label>
              <input
                type="text"
                id="sampleOutput"
                name="sampleOutput"
                value={formData.sampleOutput}
                onChange={handleChange}
                placeholder="Sample Output"
                className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-dark-600 text-white"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-200">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-dark-600 text-white"
              />
            </div>
            <div>
              <label htmlFor="constraints" className="block text-sm font-medium text-gray-200">Constraints</label>
              <input
                type="text"
                id="constraints"
                name="constraints"
                value={formData.constraints}
                onChange={handleChange}
                placeholder="Constraints"
                className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-dark-600 text-white"
              />
            </div>
            <div>
              <label htmlFor="starterCode" className="block text-sm font-medium text-gray-200">Starter Code</label>
              <textarea
                id="starterCode"
                name="starterCode"
                value={formData.starterCode}
                onChange={handleChange}
                placeholder="Starter Code"
                className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-dark-600 text-white"
                rows="4"
              />
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-200">Difficulty</label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-dark-600 text-white"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label htmlFor="solution" className="block text-sm font-medium text-gray-200">Solution</label>
              <textarea
                id="solution"
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                placeholder="Solution"
                className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-dark-600 text-white"
                rows="4"
              />
            </div>
            {formData.testCases.map((testCase, index) => (
              <div key={index} className="space-y-4">
                <div>
                  <label htmlFor={`input-${index}`} className="block text-sm font-medium text-gray-200">Test Case Input (comma separated)</label>
                  <input
                    type="text"
                    id={`input-${index}`}
                    name="input"
                    value={testCase.input}
                    onChange={(e) => handleTestCaseChange(e, index, 'input')}
                    placeholder="Test Case Input"
                    className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-dark-600 text-white"
                  />
                </div>
                <div>
                  <label htmlFor={`output-${index}`} className="block text-sm font-medium text-gray-200">Test Case Output (comma separated)</label>
                  <input
                    type="text"
                    id={`output-${index}`}
                    name="output"
                    value={testCase.output}
                    onChange={(e) => handleTestCaseChange(e, index, 'output')}
                    placeholder="Test Case Output"
                    className="mt-1 p-3 border border-gray-600 rounded-lg w-full bg-dark-600 text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button type="submit" className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none">
            Add Problem
          </button>
        </div>
      </form>
    </div>
  );
}
