import { Login } from './pages/login-register.jsx';
import { Layout } from './pages/layout.jsx';
import { Main } from './pages/main.jsx';
import { CreatePost } from './pages/createPost.jsx';
import { Settings } from './pages/settings.jsx';
import { Product } from './pages/product/product.jsx'

import { useEffect, useState } from "react";
import React from 'react';

export const App = () => {
  const [ account, setAccount ] = useState(undefined);
  const [ screen, setScreen ] = useState(1);
  const [ product, setProduct] = useState(undefined);
  function setScreenValue(value){
    setScreen(value);
  }
  function setAccountValue(value){
    setAccount(value);
  }
  return <>
    <div className="vh-100 overflow-hidden">
      <Layout account = {account} setAccount={setAccountValue} screen={screen} setScreen={setScreenValue}/>
      <div className="h-100 overflow-scroll">
      {screen == 1 && <Main setScreen={setScreenValue} setProduct={setProduct}/>}
      {screen == 2 && <Login setAccount={setAccountValue} setScreen={setScreenValue}/>}
      {screen == 3 && <Product product={product}/>}
      {screen == 4 && <CreatePost setScreen={setScreenValue}/>}
      {screen == 5 && <Settings account={account} setAccount={setAccountValue}/>}
    </div>
    </div>
  </>;
}
