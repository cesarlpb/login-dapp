import logo from './assets/img/logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from "react";
import { useMoralis } from 'react-moralis';

const SignUp = () => {
  const {signup} = useMoralis();
  // const [email = '', setEmail] = useState();
  const [username = '', setUsername] = useState();
  const [password = '', setPassword] = useState();
  
  return(
    <form>
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input value={username} onChange={(event) => setUsername(event.currentTarget.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input value={password} onChange={(event) => setPassword(event.currentTarget.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
      </div>
      <button type="submit" className="btn btn-primary" onClick={() => signup()}>Sign Up</button>
    </form>
  ) 
}

const Login = () => {
  const {login} = useMoralis();
  // const [email = '', setEmail] = useState();
  const [username = '', setUsername] = useState();
  const [password = '', setPassword] = useState();
  
  return(
    <form>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input value={username} onChange={(event) => setUsername(event.currentTarget.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input value={password} onChange={(event) => setPassword(event.currentTarget.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
      </div>
      <button type="submit" className="btn btn-primary" onClick={() => login()}>Login</button>
    </form>
  ) 
}

function App() {
  const { authenticate, authError, isAuthenticated, isAuthenticating, logout } = useMoralis();

  if(isAuthenticated){
    return(
    <div>
      <h1>Welcome to Entrupy!</h1>
      <img src={logo}></img>
      <div>
        <button onClick={() => logout()}>Log out</button>
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
        <button className="btn btn-primary" isLoading={isAuthenticating} onClick={() => authenticate()}>Authenticate with Metamask</button>
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
