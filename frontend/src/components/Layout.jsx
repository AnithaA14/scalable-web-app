import { Link, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Scalable Web App</h1>

        <div className="flex gap-4">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>

          <Link to="/profile" className="hover:underline">
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Layout;
