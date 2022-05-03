import { Login } from './pages/login-register.jsx';
import { Layout } from './pages/layout.jsx';
import { Main } from './pages/main.jsx';
import { Settings } from './pages/settings.jsx';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import { useEffect, useState } from "react";
import React from 'react';
import { ListingMini } from './pages/listing/listingMini.jsx';
import { ListingView } from './pages/listing/listingView.jsx';
import { CreatePost } from './pages/createPost.jsx';


export const App = () => {
  const [ account, setAccount ] = useState(undefined);
  const [ product, setProduct] = useState(undefined);
  const [ token, setToken ] = useState(undefined);

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
            <Route path="/login" element={account == undefined? <Login setAccount={setAccount} setToken={setToken} /> : <Main setProduct={setProduct}/>} ></Route>
            <Route path="/listing/:listing" element={<ListingView/>} ></Route>
            <Route path="/settings" element={account != undefined? <Settings account={account} setAccount={setAccount} token={token} setToken={setToken}/> : <Main setProduct={setProduct}/>} ></Route>
            <Route path="/createPost" element={account != undefined? <CreatePost account={account}/> : <Main setProduct={setProduct}/>} ></Route>
          </Routes>
        </Router>
      </div>
    </div>
  </>;
}
