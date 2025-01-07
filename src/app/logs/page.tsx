"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [analytics, setAnalytics] = useState({
    total_uploads: 0,
    total_toxicity: 0,
    total_accuracy: 0,
    total_nsfw: 0,
  });
  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/logs/`)
      .then((response) => {
        setLogs(response.data.logs);
      })
      .catch((error) => {
        console.error("Error fetching logs:", error);
      });
    axios
      .get(`${BASE_URL}/api/v1/analytics/`)
      .then((response) => {
        setAnalytics(response.data);
      })
      .catch((error) => {
        console.error("Error fetching analytics:", error);
      });
  }, []);

  return (
    <main className="flex flex-col p-4 sm:p-8 font-mono text-left">
      <h1 className="text-3xl sm:text-5xl font-bold mb-6">Logs</h1>

      <section className="flex flex-col sm:flex-row sm:justify-between gap-4 my-2">
        <p className="text-lg sm:text-2xl font-bold">
          Total Uploads: {analytics.total_uploads}
        </p>
        <p className="text-lg sm:text-2xl font-bold">
          Total Toxicity: {analytics.total_toxicity}
        </p>
        <p className="text-lg sm:text-2xl font-bold">
          Total Accuracy: {analytics.total_accuracy}
        </p>
        <p className="text-lg sm:text-2xl font-bold">
          Total NSFW: {analytics.total_nsfw}
        </p>
      </section>

      {/* Table to display the logs */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border p-2 text-xs sm:text-sm">User</th>
              <th className="border p-2 text-xs sm:text-sm">Timestamp</th>
              <th className="border p-2 text-xs sm:text-sm">Filename</th>
              <th className="border p-2 text-xs sm:text-sm">Filetype</th>
              <th className="border p-2 text-xs sm:text-sm">Completed</th>
              <th className="border p-2 text-xs sm:text-sm">Harmful</th>
              <th className="border p-2 text-xs sm:text-sm">Toxicity</th>
              <th className="border p-2 text-xs sm:text-sm">Accuracy</th>
              <th className="border p-2 text-xs sm:text-sm">NSFW</th>
              <th className="border p-2 text-xs sm:text-sm">Reason</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={log._id?.$oid || index}>
                <td className="border p-2 text-xs sm:text-sm">
                  <div className="relative group">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-500 rounded-full"></div>
                    <div className="absolute w-screen z-10 left-0">
                      <span className="w-1/2 bg-black text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity p-1">
                        {log.user_id}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="border p-2 text-xs sm:text-sm">
                  {log.timestamp
                    ? new Date(log.timestamp * 1000).toLocaleString()
                    : "N/A"}
                </td>
                <td className="border p-2 text-xs sm:text-sm">
                  {log.filename || "N/A"}
                </td>
                <td className="border p-2 text-xs sm:text-sm">
                  {log.filetype || "N/A"}
                </td>
                <td className="border p-2 text-xs sm:text-sm">
                  {log.completed ? "Yes" : "No"}
                </td>
                <td className="border p-2 text-xs sm:text-sm">
                  <span
                    className={
                      log.results?.harmful ? "text-red-500" : "text-green-500"
                    }
                  >
                    {log.results?.harmful ? "Yes" : "No"}
                  </span>
                </td>
                <td className="border p-2 text-xs sm:text-sm">
                  <span
                    className={
                      log.results?.toxicity ? "text-red-500" : "text-green-500"
                    }
                  >
                    {log.results?.toxicity ? "Yes" : "No"}
                  </span>
                </td>
                <td className="border p-2 text-xs sm:text-sm">
                  <span
                    className={
                      log.results?.accuracy ? "text-red-500" : "text-green-500"
                    }
                  >
                    {log.results?.accuracy ? "Yes" : "No"}
                  </span>
                </td>
                <td className="border p-2 text-xs sm:text-sm">
                  <span
                    className={
                      log.results?.nsfw ? "text-red-500" : "text-green-500"
                    }
                  >
                    {log.results?.nsfw ? "Yes" : "No"}
                  </span>
                </td>
                <td className="border p-2 text-xs sm:text-sm">
                  {log.results?.reason || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
