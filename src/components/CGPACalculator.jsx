import { useState } from "react";
import Result from "./Result";

function CGPACalculator() {
  const [semesters, setSemesters] = useState([]);
  const [cgpa, setCgpa] = useState(0);

  const handleSemesters = (count) => {
    const inputs = Array.from({ length: count }, (_, i) => ({ sem: i + 1, gpa: "" }));
    setSemesters(inputs);
  };

  const updateGPA = (index, value) => {
    const updated = [...semesters];
    updated[index].gpa = parseFloat(value) || "";
    setSemesters(updated);
  };

  const calculateCGPA = () => {
    let total = 0, count = 0;
    semesters.forEach(s => {
      if (s.gpa) {
        total += s.gpa;
        count++;
      }
    });
    setCgpa(count ? (total / count).toFixed(2) : "0.00");
  };

  return (
    <div>
      <label>Semesters Completed: </label>
      <select
        className="form-select w-auto d-inline-block ms-2"
        onChange={(e) => handleSemesters(parseInt(e.target.value))}
      >
        <option value="">--Select--</option>
        {[...Array(8)].map((_, i) => (
          <option key={i+1} value={i+1}>{i+1}</option>
        ))}
      </select>

      <table className="table table table-bordered border-primary mt-3">
        <thead className="table-info">
          <tr>
            <th>Semester</th>
            <th>GPA</th>
          </tr>
        </thead>
        <tbody>
          {semesters.map((s, i) => (
            <tr key={i}>
              <td>Semester {s.sem}</td>
              <td>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="10"
                  className="form-control w-50"
                  value={s.gpa}
                  onChange={(e) => updateGPA(i, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-success mt-3" onClick={calculateCGPA}>
        Calculate CGPA
      </button>

      <Result label="CGPA" value={cgpa} />
    </div>
  );
}

export default CGPACalculator;
