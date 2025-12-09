import axios from "axios";
import { Link } from "react-router-dom";
import { URL } from "../App";

interface NavbarProps {
  user: any;
  onLogout: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
  const handleLogout = () => {
    axios
      .post(
        `${URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      .then(() => onLogout())
      .catch((err) =>{ console.log(err.message)
        alert("something went wrong")
       });
  };

  return (
    <nav className="w-full bg-purple-700 text-white py-3 px-[10px] flex items-center justify-between shadow-md">
      {/* Brand */}
      <div className="text-xl font-semibold">Blogging Application</div>

      {/* Navigation */}
      <ul className="flex items-center gap-6 mb-0 p-0">
        <li className="no-underline">
          <Link to="/create-post" className="hover:text-white-900 transition text-white no-underline decoration-none">
            Create Post
          </Link>
        </li>

        <li className="no-underline">
          <Link to="/postlist" className="hover:text-white-900 transition text-white no-underline decoration-none">
            Show Post
          </Link>
        </li>

        <li>
          <button
            className="px-4 py-1 w-full text-left hover:bg-red-700 bg-red-500 rounded-md!"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
