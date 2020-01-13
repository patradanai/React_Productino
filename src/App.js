import React from "react";
import Menu from "../src/components/Menu/Menu";
import Footer from "../src/components/Footer/Footer";
import Route from "../src/Route/Route";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Menu />
      <Route />
      <Footer />
    </div>
  );
}

export default App;
