import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components";
import "./App.css";

// Main App Component with Routing
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      {/* Add more routes here as needed */}
      {/* <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  );
}

export default App;
