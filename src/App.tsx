import Home from "./pages/Home/Home";
import type React from "react";
import Navbar from "./components/mycomponents/Navbar";

const App: React.FC = () => {
  return (
    <div className="dark transition-colors duration-300">
      <Navbar />
      <Home />
    </div>
  );
};

export default App;
