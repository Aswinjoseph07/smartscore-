function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="d-flex justify-content-center my-3">
      <div
        className={`px-4 py-2 border ${activeTab === 0 ? " bg-primary text-white" : "bg-white"}`}
        onClick={() => setActiveTab(0)}
        style={{ cursor: "pointer", margin: "0 10px" }}
      >
        GPA Calculator
      </div>
      <div
        className={`px-4 py-2 border ${activeTab === 1 ? " bg-primary text-white" : "bg-white"}`}
        onClick={() => setActiveTab(1)}
        style={{ cursor: "pointer", margin: "0 10px" }}
      >
        CGPA Calculator
      </div>
    </div>
  );
}

export default Tabs;
