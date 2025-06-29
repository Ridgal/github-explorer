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

interface CommitActivityChartProps {
  data?: CommitActivity;
}

export default function CommitActivityChart({
  data,
}: CommitActivityChartProps) {
  // Преобразуем данные для графика
  const chartData =
    data?.target.history.edges.map((edge, index) => ({
      week: index,
      commits: 1, // Здесь нужно добавить реальную логику подсчета коммитов
      date: new Date(edge.node.committedDate).toLocaleDateString(),
    })) || [];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="commits" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
