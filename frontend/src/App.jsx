import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    
    try {
      const response = await axios.get('http://ec2-174-129-60-54.compute-1.amazonaws.com:8000/api/todo/');
      setTodos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <div className='bg-indigo-100 min-h-screen'>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home todos={todos} isLoading={isLoading} setTodos={setTodos} fetchData={fetchData} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
