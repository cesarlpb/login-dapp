import { useMoralis } from 'react-moralis';
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { ErrorBox } from './Errors';

function EditProfile() {

    const { user, setUserData, userError, isAuthenticated, isAuthUndefined, isUserUpdating, logout } = useMoralis();
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const handleSave = () => {
    //     setUserData({
    //         username:username === '' ? undefined : username,
    //         email: email === '' ? undefined : email,
    //         password: password === '' ? undefined : password
    //         // if any field is undefined it is NOT updated
    //     })
    //     console.log(username);
    //     console.log(email);
    //     console.log(password);
    // }

    if(isAuthenticated){
    return(
        <div id="container" className='text-center mx-auto col-4'>
            { userError && <ErrorBox title="User update failed" message={userError.message}/> }
            <form>
                <div className="form-group my-3">
                    <label className='' htmlFor="exampleInputEmail1">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="username" 
                        aria-describedby="usernameHelp" 
                        placeholder="Set username" 
                        value={username}
                        onChange={(event) => {
                            setUsername(event.currentTarget.value);
                            console.log(username);
                            }}
                        >
                    </input>
                    {/* <small id="usernameHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group my-3">
                    <label className='' htmlFor="exampleInputEmail1">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="emailHelp" 
                        placeholder="Set an email" 
                        value={email}
                        onChange={(event) => {
                            setEmail(event.currentTarget.value);
                            console.log(email);
                            }}
                        >
                    </input>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="pwd" 
                        placeholder="Set a Password" 
                        value={password}
                        onChange={(event) => {
                            setPassword(event.currentTarget.value)
                            console.log(password);
                        }}
                        >    
                    </input>
                </div>
                {/* <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div> */}
                <button 
                type="submit" 
                className="btn btn-primary mt-3 mb-5"
                onClick={() => setUserData({
                    username:username === '' ? undefined : username,
                    email: email === '' ? undefined : email,
                    password: password === '' ? undefined : password
                    })}
                >
                    Submit
                </button>
            </form>

            <hr/>

            <div className='mt-5'>
            <button className="btn btn-primary" onClick={() => logout()}>Log out</button>
            </div>
        </div>
        )
    } else {
        return (
        <Navigate to="/loginweb3" replace={true} />
        )
    }  
}
export default EditProfile;