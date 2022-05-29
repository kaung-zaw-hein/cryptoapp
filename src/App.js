
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import { Navbar, Footer } from './components';
import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails} from './pages';
import './App.css'

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
            <Route path="/crypto/:news"  element={<News />} />
            <Route path="/exchanges"  element={<Exchanges />} />
            
          </Routes>
        </div>
      </Layout>
     <Footer/>
    </div>
  </div>
);

export default App;