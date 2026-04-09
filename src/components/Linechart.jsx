import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 700 },
  { name: "Mar", sales: 300 },
  { name: "Apr", sales: 800 },
  { name: "May", sales: 500 },
  { name: "Jun", sales: 900 },
  { name: "Jul", sales: 600 },
];

const Line_Chart = () => {
  return (
    <div className="w-full mt-3 bg-white p-4 sm:p-6 rounded-xl shadow">

      {/* Header */}
      <h2 className="text-base sm:text-lg font-semibold mb-4">
        Monthly Sales
      </h2>

      {/* Chart Container */}
      <div className="w-full h-[220px] sm:h-[300px] lg:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
            />

            <YAxis
              tick={{ fontSize: 10 }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Line_Chart;