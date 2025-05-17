import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import  "../styles/AIPlanner.css" // Import the CSS file for styling

export const AIPlanner = () => {
  const [place, setPlace] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const genAI = new GoogleGenerativeAI('AIzaSyBsn-rcxA-DXS6bnIKiboMVLn2U2cMy9SY');

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  async function run(prompt) {
    try {
      setGeneratedContent('');
      setLoading(true);
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text =  response.text();
      setGeneratedContent(text);
    } catch (error) {
      console.error(error);
      setGeneratedContent('Error occurred while generating content.');
    } finally {
      setLoading(false);
    }
  }

  const handleGenerateClick = () => {
    if (place.trim() !== '' && startDate.trim() !== '' && endDate.trim() !== '') {
      const prompt = `The following are when I am going to reach ${place} and from ${startDate} to ${endDate}. Tell me a suitable plan of where to go in that area and in that weather.`;
      run(prompt);
    }
  };

  return (
    <div className='container'>
      <div className='inputAI'>
        <h2>Enter Trip Details:</h2>
        <label>
          Place:
          <input
            type="text"
            className='inputField'
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            className='inputField'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            className='inputField'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button className='button' onClick={handleGenerateClick}>generate Content</button>
      </div>

      <div className='outputAI'>
        <strong>Generated Content:</strong>
        {loading && (
          <div className="loading">
            <div className="spinner-border" role="status"></div>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <ReactMarkdown>{generatedContent}</ReactMarkdown>
      </div>
    </div>
  );
};
