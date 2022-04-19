import { useMoralis } from 'react-moralis';
import styles from './LoginWeb3.css';
import logo from '../assets/img/favicon-180x180.png';
import { Link } from 'react-router-dom';
import { ErrorBox } from './Errors';

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'white',
  border: '0px solid black'
};

function LoginWeb3(){
    const { authenticate, authError, isAuthenticating, isAuthenticated, Moralis, user, logout } = useMoralis();
    
    const handleCustomLogin = async () => {
      await authenticate({
        provider: "web3Auth",
        clientId: 'BKxE64Fdxr-fhkUG_ECnsSrWyxmUusB2g2jl0s-k-DyP-kwRluO8aHqaBM4J-EJt6e7766FPoOupb_macu7e0RA',
        chainId: Moralis.Chains.ETH_ROPSTEN,
        appLogo: {logo},
        loginMethodsOrder: 
        [
            "google", 
            "facebook", 
            "twitter", 
            "reddit", 
            "discord", 
            "twitch", 
            "apple", 
            "line", 
            "github", 
            "kakao", 
            "linkedin", 
            "weibo", 
            "wechat", 
            "email_passwordless"
        ],
        theme: 'light',
      });
    };
  
    if(isAuthenticated){
      return(
      <div id="container" className='justify-content-center mx-auto text-center'>
        <h1>Welcome to Entrupy, {user.attributes.username}!</h1>
        <img src={logo} width={50} alt="" className='mx-auto py-5'></img>
        <div>
          <Link to="/edit" style={linkStyle} className="btn btn-primary">Edit Profile</Link>
          <Link to="/nft" style={linkStyle} className="btn btn-primary">NFT</Link>
          <Link to="/dex" style={linkStyle} className="btn btn-primary">DEX (Swap)</Link>
          <Link to="/dashboard" style={linkStyle} className="btn btn-primary">Dashboard</Link>
          <button className="btn btn-secondary" onClick={() => logout()}>Log out</button>
        </div>
      </div>
      )
    }
    return (
      <div id="container" style={styles.div}>
        {authError && <ErrorBox title="Auth Error" message={authError.message}/>}
        <div id="card" className="card mx-auto justify-content-center">
            <img className='img mx-auto' alt="" src={logo} width={80} height={80}></img>
            <p className='my-3'>Log in to Entrupy</p>
            {isAuthenticating && <p className="green">Authenticating</p>}
            {authError && (
            <p className='error'>{JSON.stringify(authError.message)}</p>
            )}
            <div className='buttonCard'>
            <button className='loginButton' onClick={handleCustomLogin}>
                Login with Web3Auth
            </button>
            </div>
        </div>
      </div>
    );
}

export default LoginWeb3;