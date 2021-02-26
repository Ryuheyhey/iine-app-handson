import React from 'react';
import logo from './logo.svg';
import './App.css';
import {MainTable} from "./components/index"
import {Helmet, HelmetProvider} from "react-helmet-async"

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>iine-app-handson</title>
      </Helmet>
    <div className="bg-blue-50 min-h-screen">
      <div className="container mx-auto">
        <header className="flex justify-center items-center text-3xl h-32 mx-5">
          いいねした画像を並べる
        </header>
        <div className="flex justify-center">
          <MainTable />
        </div>
      </div>
    </div>
    </HelmetProvider>
  );
}

export default App;
