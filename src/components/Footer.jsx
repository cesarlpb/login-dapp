import logo from '../assets/img/logo.png'

function Footer(){
  return (
    <nav className="px-5 navbar sticky-bottom navbar-expand navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="" width={147} height={39}></img>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample04">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/">Footer links</a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="#">Sign Up</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Login</a>
          </li> */}
        </ul>
      </div>
    </nav>
  )
}

export default Footer;