import React from "react";
import { useParams } from "react-router-dom";

function HistoryPage() {
  const params = useParams();
  const email = params.clientEmail;

  return (
    <div>
      <h1>History Page</h1>
      <p>Email: {email}</p>
    </div>
  );
}

export default HistoryPage;
