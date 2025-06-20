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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Property Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map((property, index) => (
          <div key={index} className="p-4 border rounded shadow bg-white">
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p>{property.location}</p>
            <p className="font-bold text-green-600">${property.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
