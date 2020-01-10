import React from "react";
import Todo from "../src/containers/Todo";
import Menu from "../src/components/Menu/Menu";
import Footer from "../src/components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Menu />
      <Todo />
      <Footer />
    </div>
  );
}

export default App;
