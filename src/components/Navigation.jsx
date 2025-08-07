import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faFileAlt,
  faTh,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'user', icon: faUser, label: 'User', path: '/user' },
    { id: 'report', icon: faFileAlt, label: 'Report', path: '/report' },
    { id: 'article', icon: faTh, label: 'Article', path: '/article' },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: 'Konfirmasi Logout',
      text: 'Apakah Anda yakin ingin keluar dari akun?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Ya, Logout',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('token');

        navigate('/login');
      }
    });
  };

  return (
    <nav className="w-20 bg-gray-50 h-full flex flex-col justify-between items-center py-6 border-r border-gray-200">
      <div className="space-y-4">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${isActive
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                : 'text-gray-400 hover:text-orange-500 hover:bg-white hover:shadow-md'
                }`}
              title={item.label}
              aria-label={item.label}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <button
        onClick={handleLogout}
        className="w-14 h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-200 text-gray-400 hover:text-red-500 hover:bg-white hover:shadow-md"
        title="Logout"
        aria-label="Logout"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
        <span className="text-[10px] mt-1 font-medium">Logout</span>
      </button>
    </nav>
  );
};

export default Navigation;
