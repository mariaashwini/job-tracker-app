import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { getJobsFromLocalStorage } from "../../utils/jobStorage";

const COLORS = {
  pending: "#FBBF24", // yellow
  accepted: "#10B981", // green
  rejected: "#EF4444", // red
  interview: "#3B82F6", // blue
};

export default function StatusPieChart() {
  const jobs = getJobsFromLocalStorage();
  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  return (
    <div className="flex flex-col justify-center items-center min-h-[300px]">
      <h2 className="text-2xl font-bold mb-4">Application Metrics</h2>
      <div className="w-[220px] h-1 bg-blue-500 mx-auto mt-1 mb-4"></div>
      <div className="mt-4 bg-white rounded-lg shadow-lg flex items-center justify-center p-4  w-full">
        <PieChart width={600} height={600}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={160}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => {
              const label = name.charAt(0).toUpperCase() + name.slice(1);
              return `${label}: ${(percent * 100).toFixed(0)}%`;
            }}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || "#ccc"} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [
              value,
              name.charAt(0).toUpperCase() + name.slice(1),
            ]}
          />
          <Legend
            formatter={(value) =>
              value.charAt(0).toUpperCase() + value.slice(1)
            }
          />
        </PieChart>
      </div>
    </div>
  );
}
