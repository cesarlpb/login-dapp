import { Moralis } from 'moralis';
import { useMoralis } from 'react-moralis';
import { Navigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import logo from '../../assets/img/favicon-180x180.png';
import styles from './NFT.css';

function NFT(){
    const { isAuthenticated, user, logout, authError } = useMoralis();
    
    // ToDo: set links styles
    const linkStyle = {
        margin: "1rem",
        textDecoration: "none",
        color: 'white',
        border: '0px solid black'
    };

    if(isAuthenticated){
    return(
        <>
    <div className="">
      
      {authError && (
        <div className="alert alert-danger" role="alert">
        The authentication has failed! {authError.message}
        </div>
      )}
      
      <div id="container" className='mx-auto col-6 text-center align-middle'>

        <div id="container" className='' style={styles.div}>
          <img className='text-center mx-auto' src={logo} alt=""></img>
          
          <h1 className="mx-auto text-center py-2">NFT</h1>
          <Link to="/nft/mint" style={linkStyle} className="col-3 col-sm-6 mx-auto btn btn-primary">Mint NFT</Link>
          <Link to="/nft/dashboard" style={linkStyle} className="col-3 col-sm-6 mx-auto btn btn-primary">See NFTs</Link>
          {/* Todo: Add other NFT actions, such as send to another wallet */}
        </div>

      </div> 
    </div>
        </>
    )
    } else {
        return (
            <Navigate to="/" replace={true} />
        )};
    }
export default NFT;