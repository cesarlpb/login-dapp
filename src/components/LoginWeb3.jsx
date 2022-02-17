// import { useState } from "react";
import { useMoralis } from 'react-moralis';

import env from "react-dotenv";

import styles from './LoginWeb3.css';
import logo from '../assets/img/favicon-180x180.png';

// const clientID = env.CLIENT_ID;

function LoginWeb3(){
    const { authenticate, authError, isAuthenticating, Moralis } = useMoralis();

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
  
    return (
      <div id="container">
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