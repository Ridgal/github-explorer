import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CommitActivity } from "@/types/github";
import { useMemo } from "react";

interface CommitActivityChartProps {
  data?: CommitActivity;
}

export default function CommitActivityChart({
  data,
}: CommitActivityChartProps) {
  const chartData = useMemo(() => {
    if (!data) return [];

    const commits = data.target.history.edges;

    const grouped = commits.reduce<Record<string, number>>((acc, edge) => {
      const date = new Date(edge.node.committedDate)
        .toISOString()
        .split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([date, commits]) => ({
      date,
      commits,
    }));
  }, [data]);

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="commits" stroke="#4ade80" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
