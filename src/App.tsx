import type React from "react";
import FullWorldFlow from "./components/FullWorldFlow";

const App: React.FC = () => {
  return (
    <div className="dark w-screen h-screen p-0 bg-slate-950 text-slate-100 font-sans flex items-center justify-center">
      <FullWorldFlow />
    </div>
  );
};

export default App;
