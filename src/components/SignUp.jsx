// import { MoralisProvider } from 'react-moralis';
import { useState } from "react";
import { useMoralis } from 'react-moralis';

import logo from '../assets/img/logo.png';
import './SignUp.css';

// const Signup = () => {

//   }

function SignUp(){
    const { authenticate, authError, isAuthenticated, isAuthenticating, user, logout } = useMoralis();

    // const {signup} = useMoralis();
    const {Moralis} = useMoralis();
  
    const signupFunc = async () => {
      console.log(username, password, email);
  
      const user = new Moralis.User();
      user.set("username", username);
      user.set("password", password);
      user.set("email", email);
  
      try {
        await user.signUp();
        alert("Succesfully Signed up!");
        // Hooray! Let them use the app now.
      } catch (error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
  
      // login(username, password, email);
    };
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
  
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleUsernameChange = (event) => setUsername(event.target.value);

    if(isAuthenticated){
      return(
      <div>
        <h1>Welcome to Entrupy, {user.attributes.username}!</h1>
        <img src={logo}></img>
        <div>
          <button className="btn btn-primary" onClick={() => logout()}>Log out</button>
        </div>
      </div>
      )
    }
    return (
        <div id="signup" className='col-6 mx-auto'>
        <h2>Sign Up</h2>
  
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input 
              value={username} 
              onChange={handleUsernameChange} 
              type="text" 
              className="form-control" 
              // id="exampleInputEmail1" 
              // aria-describedby="emailHelp" 
              placeholder="Enter username">
            </input>
            <small id="usernameHelp" className="form-text text-muted">
              Username field
            </small>
          </div>
  
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input 
              value={email} 
              onChange={handleEmailChange} 
              type="email" 
              className="form-control" 
              // id="exampleInputEmail1" 
              // aria-describedby="emailHelp" 
              placeholder="Enter email">
            </input>
            <small id="emailHelp" className="form-text text-muted">
              Email field
            </small>
          </div>
  
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password:</label>
            <input 
              value={password} 
              onChange={handlePasswordChange} 
              type="password" 
              className="form-control" 
              // id="exampleInputPassword1" 
              placeholder="Password">
            </input>
            <small id="emailHelp" className="form-text text-muted">
              Password field
            </small>
          </div>
          <button type="submit" className="btn btn-primary" onClick={() => signupFunc()}>Sign Up</button>
        </form>
      </div>
        )
}

export default SignUp;