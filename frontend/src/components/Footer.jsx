import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 fixed bottom-0 w-full">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/" className="text-white hover:text-gray-400 mx-2">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-400 mx-2">About</Link>
          <Link to="/contact" className="text-white hover:text-gray-400 mx-2">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
