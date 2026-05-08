import React, { useState, useEffect } from "react";
import SubjectTable from "./SubjectTable";

function GPACalculator() {
  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [gpa, setGpa] = useState(0);
  const [creditWarning, setCreditWarning] = useState("");
  const [loading, setLoading] = useState(false);

  // 🎓 Semester-wise credit limit (Anna University example)
  const creditLimits = {
    1: 22, 2: 26, 3: 23, 4: 22, 5: 20, 6: 23, 7: 16, 8: 10,
  };

  const gradePoints = {
    O: 10,
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    U: 0,
  };

  // ➕ Add Subject
  const addSubject = () => {
    setSubjects([
      ...subjects,
      { subjectCode: "", subjectName: "", credits: "", grade: "", isManualCredit: false },
    ]);
  };

  // ❌ Remove Subject
  const removeSubject = (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
  };

  // 🚫 Prevent duplicate subject codes
  const isDuplicateCode = (code, index) =>
    subjects.some((sub, i) => i !== index && sub.subjectCode === code);

  // 🔍 Fetch subject details when user enters code
  const handleCodeChange = async (index, code) => {
    const subjectCode = code.toUpperCase();
    const updated = [...subjects];

    if (isDuplicateCode(subjectCode, index)) {
      alert("⚠️ Duplicate subject code not allowed!");
      updated[index].subjectCode = "";
      setSubjects(updated);
      return;
    }

    updated[index].subjectCode = subjectCode;
    updated[index].subjectName = "";
    updated[index].credits = "";
    updated[index].isManualCredit = false;
    setSubjects(updated);
    setLoading(true);

      if (subjectCode.length < 5) return;

    try {
      if(subjectCode.startsWith("NM") ||
      subjectCode.startsWith("OC") ||
      subjectCode.startsWith("SW") ||
      subjectCode.startsWith("VA")){
         updated[index].subjectName = "Special Subject (Enter Credits)";
      updated[index].isManualCredit = true;
      }else{
      const res = await fetch(`http://localhost:8080/api/subjects/${subjectCode}`);
      if (res.ok) {
      const data = await res.json();
const subject = Array.isArray(data) ? data[0] : data; // handle both array or single object

if (subject && subject.subjectName) {
  updated[index].subjectName = subject.subjectName;
  updated[index].credits = subject.credits;
} else {
  updated[index].subjectName = "Unknown Subject (Enter Credits)";
  updated[index].isManualCredit = true;
}
      } else {
        updated[index].subjectName = "Unknown Subject (Enter Credits)";
        updated[index].isManualCredit = true;
      }
    }} catch (err) {
      console.error("Error fetching subject:", err);
      updated[index].subjectName = "Unknown Subject (Enter Credits)";
      updated[index].isManualCredit = true;
    }

    setLoading(false);
    setSubjects(updated);
  };

  // 📥 Handle credit change manually
  const handleCreditChange = (index, value) => {
    const updated = [...subjects];
    updated[index].credits = parseFloat(value) || 0;
    setSubjects(updated);
  };

  // 📥 Handle grade change
  const handleGradeChange = (index, value) => {
    const updated = [...subjects];
    updated[index].grade = parseFloat(value);
    setSubjects(updated);
  };

  // ⚠️ Validate total credits per semester
  useEffect(() => {
    if (!semester) return;
    const total = subjects.reduce((sum, sub) => sum + (parseFloat(sub.credits) || 0), 0);
    const limit = creditLimits[semester] || 25;

    if (total > limit) {
      setCreditWarning(`⚠️ Total credits (${total}) exceed semester limit of ${limit}.`);
    } else {
      setCreditWarning("");
    }
  }, [subjects, semester]);

  // 🧮 Calculate GPA
  const calculateGPA = () => {
   
    let totalCredits = 0;
    let totalPoints = 0;

    subjects.forEach((sub) => {
      if (sub.credits && sub.grade >= 0) {
        totalCredits += parseFloat(sub.credits);
        totalPoints += parseFloat(sub.credits) * parseFloat(sub.grade);
      }
    });

    if (totalCredits === 0) {
      setGpa(0);
      return;
    }

    const result = (totalPoints / totalCredits).toFixed(2);
    const validGPA = Math.min(result, 10); // ✅ GPA max limit
    setGpa(validGPA);
  };

  return (
    <div className="container mt-4 p-3 border rounded shadow-lg bg-light">
      <h2 className="text-center mb-4 text-primary">🎓 GPA Calculator</h2>

      {/* Semester Selection */}
      <div className="mb-3 text-center">
        <label className="fw-bold me-2">Select Semester:</label>
        <select
          className="form-select d-inline-block w-auto"
          value={semester}
          onChange={(e) => {
            setSemester(e.target.value);
            setSubjects([]);
            setGpa(0);
          }}
        >
          <option value="">--Select--</option>
          {[...Array(8)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Semester {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Show table only after semester selection */}
      {semester && (
        <>
          {loading && <div className="text-info mb-2 text-center">⏳ Fetching subject details...</div>}

          <SubjectTable
            subjects={subjects}
            gradePoints={gradePoints}
            handleCodeChange={handleCodeChange}
            handleCreditChange={handleCreditChange}
            handleGradeChange={handleGradeChange}
            removeSubject={removeSubject}
          />

          {semester && (
            <div className="mt-2 text-center text-secondary">
              <small>
                Allowed Credits: <strong>{creditLimits[semester]}</strong>
              </small>
            </div>
          )}

      

          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-success" onClick={addSubject}>
              ➕ Add Subject
            </button>
         
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-primary"
              onClick={calculateGPA}
              disabled={!semester}
            >
              Calculate GPA
            </button>
            {creditWarning && (
  <div className="alert alert-warning text-center mt-3">
     {creditWarning} You can still calculate GPA for reference.
  </div>
)}
            <h4 className="mt-3">
              Your GPA: <span className="text-success">{gpa}</span>
            </h4>
          </div>
        </>
      )}
    </div>
  );
}

export default GPACalculator;
