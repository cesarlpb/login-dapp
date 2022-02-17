import { useState } from "react";
import { useMoralis } from 'react-moralis';

import logo from '../assets/img/logo.png';


function Login(){
    // const { isAuthenticated,  } = useMoralis();
    const { login, isAuthenticated, user, logout } = useMoralis();
    const loginUser = async () => {
        console.log(username, password);
        // console.log(isAuthenticated);
        login(username, password);
        isAuthenticated = true;
        // console.log(isAuthenticated);
      };

      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      // const [email, setEmail] = useState("");
    
      // const handleEmailChange = (event) => setEmail(event.target.value);
      const handlePasswordChange = (event) => setPassword(event.target.value);
      const handleUsernameChange = (event) => setUsername(event.target.value);
    
      if(isAuthenticated){
        return(
        <div className="col-6 mx-auto my-20">
          <h1>Welcome to Entrupy, {user.attributes.username}!</h1>
          <img src={logo} alt=""></img>
          <div>
            <button className="btn btn-primary" onClick={() => logout()}>Log out</button>
          </div>
        </div>
        )
      }

    return (
    <div id="login" className="col-6 mx-auto py-10 my-auto">
        <form>
        <h2>Login</h2>
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
        </div>

        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
            value={password} 
            onChange={handlePasswordChange} 
            type="password" 
            className="form-control" 
            // id="exampleInputPassword1" 
            placeholder="Password">
            </input>
        </div>

        <button type="submit" className="btn btn-primary" onClick={() => loginUser()}>Login</button>

        </form>
    </div>
        )
}

export default Login;