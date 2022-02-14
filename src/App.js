import logo from './assets/img/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from "react";
import { useMoralis } from 'react-moralis';

const SignUp = () => {
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
  
  return(
    <div>
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

const Login = () => {
  // const {login} = useMoralis();
  // const {Moralis} = useMoralis();
  const { login, isAuthenticated } = useMoralis();

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
  
  return(
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
          placeholder="Enter Username">
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
  ) 
}

function App() {
  const { authenticate, authError, isAuthenticated, isAuthenticating, user, logout } = useMoralis();

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
    <div className="App">
      
      {authError && (
        <div className="alert alert-danger" role="alert">
        The authentication has failed! {authError.message}
        </div>
      )}
      
      <div className='mx-auto col-6'>
      <h1 className="h1 text-center py-2">Welcome</h1>
      <div className='mx-auto text-center py-2'>
      {/* isLoading={isAuthenticating} */}
        <button className="btn btn-primary" onClick={() => authenticate()}>Authenticate with Metamask</button>
      </div>
        <hr></hr>
        <SignUp />
        <br></br>
        <hr></hr>
        <br></br>
        <Login />
      </div>
    </div>
  );
}

export default App;
