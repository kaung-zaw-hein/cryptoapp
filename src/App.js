
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout} from 'antd';

import { Navbar, Footer, Error } from './components';
import {  Homepage, News, Cryptocurrencies, CryptoDetails} from './pages';

const App = () => (
  <div className="app">
    <div className="navbar">
      <Navbar />
    </div>
    <div className="main">
      <Layout>
        <div className="routes">
          <Routes>
            <Route path="/"  element={<Homepage />} />
            <Route path="/cryptocurrencies"  element={<Cryptocurrencies />} />
            <Route path="/crypto/:coinId"  element={<CryptoDetails />} />
            <Route path="/news"  element={<News />} />
            <Route path="*"  element={  <Error />}/>
          </Routes>
        </div>
      </Layout>
     <Footer/>
    </div>
  </div>
);

export default App;