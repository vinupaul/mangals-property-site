import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'rent',
    description: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/properties', formData);
      alert('✅ Property added successfully!');
      setFormData({ title: '', location: '', price: '', type: 'rent', description: '' });
    } catch (error) {
      console.error('Failed to add property:', error);
      alert('❌ Failed to add property.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input type="text" name="title" placeholder="Title"
          value={formData.title} onChange={handleChange}
          className="w-full border px-3 py-2 rounded" required />

        <input type="text" name="location" placeholder="Location"
          value={formData.location} onChange={handleChange}
          className="w-full border px-3 py-2 rounded" required />

        <input type="number" name="price" placeholder="Price"
          value={formData.price} onChange={handleChange}
          className="w-full border px-3 py-2 rounded" required />

        <select name="type" value={formData.type} onChange={handleChange}
          className="w-full border px-3 py-2 rounded">
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>

        <textarea name="description" placeholder="Description"
          value={formData.description} onChange={handleChange}
          className="w-full border px-3 py-2 rounded" rows="3" />

        <button type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
