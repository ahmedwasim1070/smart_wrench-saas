import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
          Welcome to Smart Wrench
        </h1>
        <p className="text-gray-600 mb-8">
          The ultimate Car Workshop SaaS. Manage your vehicles, track services, and stay ahead of maintenance.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
          <a 
            href="/api/auth/google"
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 flex justify-center items-center"
          >
            Continue with Google
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;