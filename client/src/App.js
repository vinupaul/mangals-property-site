import AddProperty from './pages/AddProperty';
import PropertyList from './pages/PropertyList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <Link to="/">Home</Link>
        <Link to="/add">Add Property</Link>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/add" element={<AddProperty />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;