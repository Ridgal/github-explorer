"use client";

import { useState } from "react";
import { Issue } from "@/types/github";

interface IssuesListProps {
  issues?: Issue[];
}

export default function IssuesList({ issues = [] }: IssuesListProps) {
  const [filter, setFilter] = useState<"OPEN" | "CLOSED">("OPEN");

  const filteredIssues = issues.filter((issue) => issue.state === filter);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("OPEN")}
          className={`px-3 py-1 rounded ${
            filter === "OPEN" ? "bg-blue-500 text-white" : "bg-gray-400"
          }`}
        >
          Open
        </button>
        <button
          onClick={() => setFilter("CLOSED")}
          className={`px-3 py-1 rounded ${
            filter === "CLOSED" ? "bg-red-500 text-white" : "bg-red-400"
          }`}
        >
          Closed
        </button>
      </div>

      <ul className="space-y-2">
        {filteredIssues.length === 0 ? (
          <p className="text-gray-400 italic">
            No {filter.toLowerCase()} issues found.
          </p>
        ) : (
          <ul className="space-y-2">
            {filteredIssues.map((issue) => (
              <li key={issue.id} className="border p-3 rounded">
                <h3 className="font-medium">{issue.title}</h3>
                <p className="text-sm text-gray-600">
                  #{issue.number} opened by {issue.author.login}
                </p>
              </li>
            ))}
          </ul>
        )}
      </ul>
    </div>
  );
}
