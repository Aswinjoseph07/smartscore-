function Result({ label, value }) {
  return (
    <div className="mt-3 fs-5">
      <strong>{label}:</strong> <span>{value}</span>
    </div>
  );
}

export default Result;
