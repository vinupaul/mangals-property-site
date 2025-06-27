import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'rent',
    description: '',
  });

  const navigate = useNavigate();

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
      toast.success('✅ Property added successfully!');
      setFormData({ title: '', location: '', price: '', type: 'rent', description: '' });

      setTimeout(() => {
        navigate('/');  // 🎯 Redirect after toast
      }, 1500);
    } catch (error) {
      console.error('Failed to add property:', error);
      toast.error('❌ Failed to add property');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input type="text" name="title" required
            value={formData.title} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input type="text" name="location" required
            value={formData.location} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input type="number" name="price" required
            value={formData.price} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <select name="type" value={formData.type} onChange={handleChange}
            className="w-full border px-3 py-2 rounded">
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea name="description"
            value={formData.description} onChange={handleChange}
            className="w-full border px-3 py-2 rounded" rows="3" />
        </div>
        <button type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
