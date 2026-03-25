"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [token, setToken] = useState("");

  async function fetchDashboard() {
    const res = await fetch(
      "https://bosere-cooperative-clean-production.up.railway.app/api/dashboard/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await res.json();
    setData(result);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <textarea
        placeholder="Paste your token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        style={{ width: "100%", height: "80px" }}
      />

      <br /><br />

      <button onClick={fetchDashboard}>
        Load Dashboard
      </button>

      <hr />

      {data && (
        <div>
          <p><b>Name:</b> {data.full_name}</p>
          <p><b>Savings:</b> {data.savings_balance}</p>
          <p><b>Shares:</b> {data.shares_balance}</p>
          <p><b>Share Value:</b> {data.total_share_value}</p>

          {data.active_loan && (
            <>
              <h3>Loan</h3>
              <p>Amount: {data.active_loan.amount}</p>
              <p>Remaining: {data.active_loan.remaining_balance}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
