import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => {
        setProperties(res.data);
      })
      .catch(err => {
        console.error('Failed to fetch:', err);
        setProperties([]);
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

  const filteredProperties = filter === 'all'
    ? properties
    : properties.filter(p => p.type === filter);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg mb-10 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Find Your Perfect Space</h1>
        <p className="text-lg">Discover rental and sale listings from Mangal Properties</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {['all', 'rent', 'sale'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium shadow-md transition ${filter === type ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
          >
            {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Property Listings */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Property Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.isArray(filteredProperties) && filteredProperties.map((property, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div className="h-48 bg-gray-300 overflow-hidden rounded-t-lg relative">
              <img
                src={property.imageUrl ? `http://localhost:5000${property.imageUrl}` : 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={property.title || 'Property'}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white p-3 flex justify-between items-center">
                <span className="text-sm font-semibold">
                  {property.price ? `$${Number(property.price).toLocaleString()}` : 'N/A'}
                </span>
                <span className={`px-2 py-1 text-xs rounded ${property.type === 'rent' ? 'bg-blue-500' : 'bg-green-500'}`}>
                  {property.type ? property.type.charAt(0).toUpperCase() + property.type.slice(1) : 'Unknown'}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{property.title || 'Untitled Property'}</h3>
              <p className="text-sm text-gray-600 mt-1">{property.location || 'Unknown Location'}</p>
            </div>
            <button
              onClick={() => handleDelete(property._id)}
              className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <Link
        to="/add"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg text-lg z-50"
      >
        + Add Property
      </Link>
    </div>
  );
}

export default PropertyList;