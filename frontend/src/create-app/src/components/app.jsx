import { Login } from './pages/login-register.jsx';
import { Layout } from './pages/layout.jsx';
import { Main } from './pages/main.jsx';
import { Settings } from './pages/settings.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { useEffect, useState } from "react";
import React from 'react';
import { ListingMini, ListingView} from './pages/listing';
import { CreateListing } from './pages/createListing.jsx';


export const App = () => {
  const [ account, setAccount ] = useState(undefined);
  const [ product, setProduct] = useState(undefined);

  function setAccountValue(value){
    setAccount(value);
  }
  return <>
    <div className="vh-100 overflow-hidden">
      <div className="h-100 overflow-scroll"> 
        <Router>
          <Layout account = {account} setAccount={setAccountValue}/>
          <Routes>
            <Route path="/" element={<Main setProduct={setProduct}/>} ></Route>
            <Route path="/login" element={<Login setAccount={setAccount} />} ></Route>
            <Route path="/listing/:id" element={<ListingView/>} ></Route>
            <Route path="/settings" element={<Settings account={account} setAccount={setAccount}/>} ></Route>
            <Route path="/create-listing" element={<CreateListing setAccount={setAccount}/>} ></Route>
          </Routes>
        </Router>
      </div>
    </div>
  </>;
}
