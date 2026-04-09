import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const GaugeChart = ({ value = 75.55 }) => {
  const data = [
    { name: "Progress", value: value },
    { name: "Remaining", value: 100 - value },
  ];

  const COLORS = ["#4f46e5", "#e5e7eb"];

  return (
    <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl shadow-md w-full max-w-md mx-auto">
      
      {/* Header */}
      <div className="mb-4 text-center sm:text-left">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Monthly Target
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Target you've set for each month
        </p>
      </div>

      {/* Chart */}
      <div className="relative w-full h-[220px] sm:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              startAngle={180}
              endAngle={0}
              cx="50%"
              cy="85%"
              innerRadius="55%"
              outerRadius="75%"
              dataKey="value"
              cornerRadius={10}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
            {value}%
          </h1>
          <span className="text-xs sm:text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
            +10%
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-center text-gray-500 mt-4 text-xs sm:text-sm">
        You earn <span className="font-semibold">$3287</span> today, it's higher than last month.
        <br />
        Keep up your good work!
      </p>

      {/* Footer Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-6 text-center text-xs sm:text-sm">
        <div>
          <p className="text-gray-400">Target</p>
          <p className="font-semibold">$20K ↓</p>
        </div>
        <div>
          <p className="text-gray-400">Revenue</p>
          <p className="font-semibold text-green-600">$20K ↑</p>
        </div>
        <div>
          <p className="text-gray-400">Today</p>
          <p className="font-semibold text-green-600">$20K ↑</p>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;