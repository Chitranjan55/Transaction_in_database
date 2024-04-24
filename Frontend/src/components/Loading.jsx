import React from 'react';

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-black">
      <div className="grid grid-cols-10 gap-4">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className={`w-1/6 h-20 bg-gradient-to-b from-cyan-500 to-white rounded-md animate-wave ${
              index !== 0 ? `animate-delay-${index * 100}` : ''
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
