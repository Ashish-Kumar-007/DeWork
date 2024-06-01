import React from 'react';

const Card = () => {
  return (
    <div className="bg-gray-100">
      <div className="rounded-xl shadow-lg transform transition duration-500 hover:scale-105 w-64">
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">Card Title 1</h3>
          <p className="text-gray-700 mb-4"></p>
          <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300">Learn More</button>
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="card-container bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105"
            >
              <img
                className="h-72 w-full object-cover rounded-t-xl"
                src="https://via.placeholder.com/500"
                alt={`Placeholder Image ${i}`}
              />
              <div className="card-content p-6 bg-white bg-opacity-80">
                <h3 className="text-2xl font-bold mb-2">Card Title {i}</h3>
                <p className="text-gray-700 mb-4">
                  This is a description for card {i}. You can add more content
                  here.
                </p>
                <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
