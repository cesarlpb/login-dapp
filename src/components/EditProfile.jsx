import { useMoralis } from 'react-moralis';
import { Navigate } from "react-router-dom";


function EditProfile({ component: Component, ...restOfProps }) {
    const { isAuthenticated, logout } = useMoralis();
    console.log("this", isAuthenticated);
  
    if(isAuthenticated){
        return(
        <div id="container" className='text-center mx-auto'>
            <p>Logged</p>
            <div>
            <button className="btn btn-primary" onClick={() => logout()}>Log out</button>
            </div>
        </div>
        )
    } else {
    return (
        <Navigate to="/" replace={true} />
    )};
  }

export default EditProfile;