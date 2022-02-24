import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import './NavBar.css';

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'white',
  border: '0px solid black'
};

const helloStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'black',
  border: '0px solid black'
};

function NavBar(){
  const { isAuthenticated, user, logout } = useMoralis();

  if(isAuthenticated){
    return(
      <nav className="px-5 py-0 navbar sticky-top navbar-expand navbar-light bg-light mb-3">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="" width={147} height={39}></img>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample04">
        <ul className="navbar-nav mr-auto d-flex">

          <li className="nav-item col-md">
            <p style={helloStyle}>Welcome, {user.attributes.username}!</p>
          </li>
          <li className="nav-item col-md">
            <Link to="/" style={linkStyle} className="btn btn-primary">Home</Link>
          </li>
          <li className="nav-item col-md">
            <Link to="/loginweb3" style={linkStyle} className="btn btn-primary">Login</Link>
          </li>
          <li className="nav-item col-md">
            <button style={linkStyle} className="btn btn-primary" onClick={() => logout()}>Log out</button>
          </li>
        </ul>
      </div>
    </nav>
    )
  }
  return (
    <nav className="px-5 py-0 navbar sticky-top navbar-expand navbar-light bg-light mb-3">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="" width={147} height={39}></img>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample04">
        <ul className="navbar-nav mr-auto">

          <li className="nav-item active">
            {/* <a className="nav-link" href="#">Home</a> */}
            <Link to="/" style={linkStyle} className="btn btn-primary">Home</Link>
          </li>
          {/*
          <li className="nav-item">
            <a className="nav-link" href="#">Sign Up</a>
            <Link to="/signup" style={linkStyle} className="btn btn-primary">Sign Up</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Login</a>
            <Link to="/login" style={linkStyle} className="btn btn-primary">Login</Link>
          </li> */}
          <li className="nav-item">
            {/* <a className="nav-link" href="#">Login</a> */}
            <Link to="/loginweb3" style={linkStyle} className="btn btn-primary">Web3 Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar;