import React, { useState } from 'react';
import { FcPrevious, FcNext } from "react-icons/fc";


const StatusViewer = ({ stories }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === stories.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? stories.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative w-full bg-black" style={{ paddingBottom: '66.66%' }}>
      <div className="absolute inset-0 bg-center bg-cover blur-lg" style={{ backgroundImage: `url(${stories[currentIndex]?.storyPic})` }}></div>
      <div className="absolute inset-y-0 left-1/3 w-1/3 bg-center bg-cover" style={{ backgroundImage: `url(${stories[currentIndex]?.storyPic})` }}></div>

      <button className="absolute top-1/2 transform -translate-y-1/2 left-0 mt-4 ml-4 px-2 py-1 bg-gray-800 text-white rounded" onClick={handlePrev}><FcPrevious /></button>
      <button className="absolute top-1/2 transform -translate-y-1/2 right-0 mt-4 mr-4 px-2 py-1 bg-gray-800 text-white rounded" onClick={handleNext}><FcNext /></button>
    </div>
  );
};

export default StatusViewer;
