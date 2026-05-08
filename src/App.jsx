import { useState } from "react";
import Tabs from "./components/Tabs";
import GPACalculator from "./components/GPACalculator";
import CGPACalculator from "./components/CGPACalculator";

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <h1 className="text-center text-dark p-3 mb-0" style={{ backgroundColor: "#54c8faff" }}>
        SMARTSCORE
      </h1>
      <h2 className="text-center">CSE Department</h2>
      <h2 className="text-center">GPA & CGPA Calculator</h2>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="container mt-4">
        {activeTab === 0 ? <GPACalculator /> : <CGPACalculator />}
      </div>
      <div>
        note : This is only for you reference.The calculator follows the official semester-wise credit limit as per the university regulation
         If your total exceeds the limit add credits total it's above the allowed credits then consider the core subjects first to calculate.

      </div>
    </div>
    
  );
}

export default App;
