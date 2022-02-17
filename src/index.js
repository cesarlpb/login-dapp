import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { MoralisProvider } from 'react-moralis';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import env from "react-dotenv";

// Global Styles
import './index.css';

// <Components>
import App from './App';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp';
// </Components>

const appId = env.APP_ID;
const serverUrl = env.SERVER_URL;

ReactDOM.render(
    <MoralisProvider appId={appId} serverUrl={serverUrl}> 
    <Router>
      <Fragment>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<App/>}>
            {/* <Route exact path='/' element={<App/>}/> */}
          </Route>
          <Route exact path='/signup' element={<SignUp/>}/>
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
        <Footer/>
      </Fragment>
    </Router>
    </MoralisProvider>
  , document.getElementById('root')
);
