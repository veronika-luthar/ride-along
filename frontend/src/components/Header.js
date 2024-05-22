import { Link, useNavigate } from 'react-router-dom';
import '../styles/DesignComponents.css';

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== '';

  function signOut() {
    localStorage.setItem('token', '');
    navigate('/');
    window.location.reload();
  }

  return (
    <header id="header" className="header-container">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <h1>Ride Along</h1>
        </Link>
      </div>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <a href="/user-rides" className="header-component">My Rides</a>
            <a href="/profile" className="header-component">Profile</a>
            <a href="/rides" className="header-browse-rides">Browse Rides</a>
            <button className="header-component" onClick={signOut}>Log Out</button>
          </>
        ) : (
          <>
            <a href="/login" className="header-component">Login</a>
            <a href="/register" className="header-component">Register</a>
            <a href="/rides" className="header-browse-rides">Browse Rides</a>
          </>
        )}
      </div>
    </header>
  );
}
