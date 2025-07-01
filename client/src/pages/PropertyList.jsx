import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => {
        console.log("API response:", res.data);
        setProperties(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch:', err);
        setProperties([]); // fallback to empty array
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this property?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/properties/${id}`);
      toast.success('Property deleted');
      setProperties(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
      toast.error('Failed to delete property');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Property Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.isArray(properties) && properties.map((property, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
          >
            {/* Property Image */}
            <div className="h-48 bg-gray-300 overflow-hidden rounded-t-lg relative">
              <img
                src={property.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay Badge + Price */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-3 flex justify-between items-center">
                <span className="text-sm font-semibold">${Number(property.price).toLocaleString()}</span>
                <span className={`px-2 py-1 text-xs rounded ${property.type === 'rent' ? 'bg-blue-500' : 'bg-green-500'}`}>
                  {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </span>
              </div>
            </div>

            {/* Property Info */}
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{property.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{property.location}</p>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(property._id)}
              className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
