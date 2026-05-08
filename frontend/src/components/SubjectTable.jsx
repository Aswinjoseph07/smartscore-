import React from "react";

function SubjectTable({
  subjects,
  gradePoints,
  handleCodeChange,
  handleCreditChange,
  handleGradeChange,
  removeSubject,
}) {
  return (
    <table className="table table-bordered border-primary">
      <thead className="table table-primary">
        <tr>
          <th>Subject Code</th>
          <th>Subject Name</th>
          <th>Credits</th>
          <th>Grade</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {subjects.map((sub, i) => (
          <tr key={i}>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Enter code"
                value={sub.subjectCode || ""}
                onChange={(e) => handleCodeChange(i, e.target.value)}
              />
            </td>
            <td>{sub.subjectName || "-"}</td>
            <td>
              {sub.isManualCredit ? (
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder="Enter credits"
                  value={sub.credits || ""}
                  onChange={(e) => handleCreditChange(i, e.target.value)}
                />
              ) : (
                sub.credits || "-"
              )}
            </td>
            <td>
              <select
                className="form-select"
                value={sub.grade || ""}
                onChange={(e) => handleGradeChange(i, e.target.value)}
              >
                <option value="">--Select--</option>
                {Object.entries(gradePoints).map(([grade, point]) => (
                  <option key={grade} value={point}>
                    {grade}
                  </option>
                ))}
              </select>
            </td>
               <td>
        <button
        type="button"
          className="btn btn-danger btn-close" aria-label="Close"
          onClick={(e) => removeSubject(i,e.target.value)}
        > 
        </button>
      </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SubjectTable;
