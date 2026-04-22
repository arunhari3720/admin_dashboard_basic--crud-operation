import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import axios from "axios";

const GaugeChart = () => {
  const [gaugeValue, setGaugeValue] = useState(0);
  const [percent, setPercent] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(true);

  const TARGET = 41789312;

  const fetchMonthlySales = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/monthly-sales");
      console.log("API RESPONSE:", res.data);

      const sales = Array.isArray(res.data)
        ? res.data[0]?.totalSales || 0
        : res.data?.totalSales || 0;

      const safeSales = Number(sales) || 0;
      const safeTarget = Number(TARGET) || 1;

      setTotalSales(safeSales);

      // ✅ Real percentage (can exceed 100)
      const rawPercent = (safeSales / safeTarget) * 100;
      setPercent(Number(rawPercent.toFixed(2)));

      // ✅ Arc capped at 100, minimum 0 (not 1 — that was skewing the gauge)
      const arcValue = Math.min(Math.max(rawPercent, 0), 100);
      setGaugeValue(Number(arcValue.toFixed(2)));

    } catch (err) {
      console.error("Error:", err);
      setGaugeValue(0);
      setPercent(0);
      setTotalSales(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlySales();
  }, []);

  // ✅ Fix: Always ensure total = 100 so the grey background arc is always full
  const filled = gaugeValue;
  const empty = Math.max(100 - gaugeValue, 0);

  const data =
    filled === 0
      ? [{ name: "Empty", value: 100 }] // Show full grey arc when 0%
      : [
          { name: "Progress", value: filled },
          { name: "Remaining", value: empty },
        ];

  const getColor = () => {
    if (percent <= 0) return "#e5e7eb";
    if (percent < 50) return "#ef4444";
    if (percent < 100) return "#f59e0b";
    return "#22c55e";
  };

  // ✅ Fix: When 0%, only one segment — grey. Otherwise progress + grey.
  const COLORS =
    filled === 0 ? ["#e5e7eb"] : [getColor(), "#e5e7eb"];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md mx-auto">

      {/* Header */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">Monthly Target</h2>
        <p className="text-xs text-gray-400">Based on car sales</p>
      </div>

      {/* Chart */}
      <div className="relative w-full h-[240px]">
        {loading ? (
          <div className="h-full bg-gray-100 animate-pulse rounded-lg"></div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  startAngle={180}
                  endAngle={0}
                  cx="50%"
                  cy="85%"
                  innerRadius="60%"
                  outerRadius="80%"
                  dataKey="value"
                  cornerRadius={filled > 0 && filled < 100 ? 8 : 0}
                  strokeWidth={0}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Info */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
              <h1 className="text-2xl font-bold text-gray-800">
                {percent.toFixed(1)}%
              </h1>
              <p className="text-xs text-gray-500">
                ₹ {totalSales.toLocaleString("en-IN")}
              </p>
              {percent > 100 && (
                <span className="text-[10px] text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                  Target Exceeded 🚀
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-center text-gray-500 mt-4 text-xs">
        You earned{" "}
        <span className="font-semibold text-gray-800">
          ₹ {totalSales.toLocaleString("en-IN")}
        </span>{" "}
        this month.
        <br />
        Target: ₹ {TARGET.toLocaleString("en-IN")}
      </p>

      {/* Footer */}
      <div className="grid grid-cols-3 gap-3 mt-6 text-center text-xs">
        <div>
          <p className="text-gray-400">Target</p>
          <p className="font-semibold">₹ {(TARGET / 10000000).toFixed(2)}Cr</p>
        </div>
        <div>
          <p className="text-gray-400">Achieved</p>
          <p className="font-semibold text-green-600">{percent.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-gray-400">Status</p>
          <p className="font-semibold text-blue-600">Live</p>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;