import { useMoralis } from 'react-moralis';
import { Navigate } from "react-router-dom";
import web3 from 'web3'; 
import './Dashboard.css';
// import { FaEdit } from 'react-icons/fa';
import defaultPic from '../assets/img/profile-pic.png'

function Dashboard(){

    const { isAuthenticated, user, logout } = useMoralis();

    async function getBalances(){
        const Moralis = require('moralis');
        const options = { chain: 'ropsten' }  /* TODO: make function(s) to read all balances */
        const balance = await Moralis.Web3API.account.getNativeBalance(options);
        
        return web3.utils.fromWei(balance.balance, "ether")
        
    }

    if(isAuthenticated){

        let userEmail = 'Email not provided';
        getBalances().then(res => document.querySelector("#balance").innerText = res);

        if( typeof user.attributes.email !== 'undefined'){
            userEmail = user.attributes.email;
        }
        
        let pwd, pwdLen, firstChar, lastChar;
        if( typeof user.attributes.password !== 'undefined'){
            pwd = user.attributes.password;
            firstChar = pwd.slice(0,1);
            lastChar  = pwd.slice(-1);
            pwdLen = '*'.repeat(pwd.length - 2);
            pwd = `${firstChar}${pwdLen}${lastChar}`;
        } else{
            pwd = 'Password not defined';
        }

        return(
        <div>
            <div id="container" className='text-center mx-auto col-6'>
                <div className="col-6 my-2 mx-auto">
                    <img width={150} src={defaultPic} alt="" className='round'></img>       
                </div>
                <div className="row my-2">
                    <span className='user-field'>Username:</span> 
                    
                    {user.attributes.username}
                    {/* <span id="data-field" className='col-11'> </span> */}
                    {/* <span className='col-1'>< FaEdit /></span> */}
                    
                    
                </div>
                <div className="row my-2">
                    <span className='user-field'>Email:</span> 
                    { userEmail }
                    {/* <span>< FaEdit /></span> */}
                </div>
                <div className="row my-2">
                    <span className='user-field'>Password:</span> 
                    { pwd }
                    {/* <span>< FaEdit /></span> */}
                </div>
                <div className="row my-2">
                    <span className='user-field'>Wallet:</span> 
                    {user.attributes.ethAddress}
                    {/* <span>< FaEdit /></span> */}
                </div>
                <div className="row my-2">
                    <span className='user-field'>Balance:</span> 
                    <span id="balance" className='text-left'></span>                
                </div>
                
                <div className="row my-5">
                <button className="btn btn-primary col-6 mx-auto" onClick={() => logout()}>Log out</button>
                </div>
            </div>
        </div>
        )
    } else {
    return (
        <Navigate to="/" replace={true} />
    )};
}
export default Dashboard;