import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => {
        console.log("API response:", res.data);  // 👈 Log what you're getting
        setProperties(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch:', err);
        setProperties([]); // fallback to empty array
      });
  }, []);
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Property Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(properties) && properties.map((property, index) => (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden border">
            <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-500">
              <span>No Image</span> {/* image placeholder */}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{property.title}</h2>
              <p className="text-gray-600">{property.location}</p>
              <div className="flex justify-between items-center mt-3">
              <p className="text-green-600 font-bold">${Number(property.price).toLocaleString()}</p>
              <span className={`px-3 py-1 text-sm rounded-full text-white ${property.type === 'rent' ? 'bg-blue-500' : 'bg-green-500'}`}>
                  {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default PropertyList;
