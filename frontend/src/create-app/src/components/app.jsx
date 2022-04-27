import { Login } from './pages/login-register.jsx';
import { Layout } from './pages/layout.jsx';
import { Main } from './pages/main.jsx';
import { Product } from './pages/product.jsx';
import { useEffect, useState } from "react";
import React from 'react';
import {CreateListing} from './pages/createListing';

export const App = () => {
  const [ account, setAccount ] = useState(undefined);
  const [ screen, setScreen ] = useState(1);
  function setScreenValue(value){
    setScreen(value);
  }
  function setAccountValue(value){
    setAccount(value);
  }
  return <>
    <div className="vh-100 overflow-hidden">
      <Layout account = {account} screen={screen} setScreen={setScreenValue}/>
      <div className="h-100 overflow-scroll">
        {screen == 1 && <Main setScreen = {setScreenValue}/>}
        {screen == 2 && <Login setAccount={setAccountValue} setScreen={setScreenValue}/>}
        {screen == 3 && <Product/>}
      </div>
    </div>
  </>;
}
