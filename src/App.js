import React, {useState, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Routes/Navigation";
import Routes from "./Routes/Routes"
import jwt from "jsonwebtoken";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation/>
        <Routes/>      
      </div>
    </BrowserRouter>
  );
}

export default App;
