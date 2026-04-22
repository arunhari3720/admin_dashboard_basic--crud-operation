import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import axios from "axios";

const months = [
  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const Line_Chart = () => {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [activeIndex, setActiveIndex] = useState(null);

  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/monthly-sales");

      let formatted = (Array.isArray(res.data) ? res.data : []).map(item => ({
        monthIndex: item._id,
        name: months[item._id],
        sales: item.totalSales,
      }));

      // Month filter
      if (monthFilter !== "all") {
        formatted = formatted.filter(
          (item) => item.monthIndex === Number(monthFilter)
        );
      }

      // Price filter
      if (priceFilter === "low") {
        formatted = formatted.filter((d) => d.sales < 500000);
      } else if (priceFilter === "medium") {
        formatted = formatted.filter(
          (d) => d.sales >= 500000 && d.sales <= 1500000
        );
      } else if (priceFilter === "high") {
        formatted = formatted.filter((d) => d.sales > 1500000);
      }

      // Sort
      if (sort === "high") {
        formatted.sort((a, b) => b.sales - a.sales);
      } else if (sort === "low") {
        formatted.sort((a, b) => a.sales - b.sales);
      }

      setData(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [sort, priceFilter, monthFilter]);

  const max = Math.max(...data.map((d) => d.sales), 0);

  const getColor = (val) => {
    if (val >= max * 0.8) return "#6366f1";
    if (val >= max * 0.5) return "#818cf8";
    return "#c7d2fe";
  };

  return (
    <div className="w-full p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Monthly Sales
          </h2>
          <p className="text-xs text-gray-400">
            Premium analytics overview
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs border px-2 py-1 rounded-lg"
          >
            <option value="all">Sort</option>
            <option value="high">Highest</option>
            <option value="low">Lowest</option>
          </select>

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="text-xs border px-2 py-1 rounded-lg"
          >
            <option value="all">Price</option>
            <option value="low">Low (&lt;5L)</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="text-xs border px-2 py-1 rounded-lg"
          >
            <option value="all">Month</option>
            {months.slice(1).map((m, i) => (
              <option key={i} value={i + 1}>
                {m}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer>
          <BarChart
            data={data}
            barCategoryGap="35%"
            onMouseLeave={() => setActiveIndex(null)}
          >

            {/* Gradient */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                <stop offset="100%" stopColor="#a5b4fc" stopOpacity={0.6} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 11, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "rgba(99,102,241,0.08)" }}
              formatter={(v) => `₹ ${v.toLocaleString()}`}
            />

            <Bar
              dataKey="sales"
              radius={[10, 10, 0, 0]}
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              {data.map((entry, index) => {
                const isActive =
                  activeIndex === null || activeIndex === index;

                return (
                  <Cell
                    key={index}
                    fill="url(#barGradient)"
                    opacity={isActive ? 1 : 0.4}
                    style={{
                      filter: isActive
                        ? "drop-shadow(0px 4px 8px rgba(99,102,241,0.25))"
                        : "none",
                    }}
                  />
                );
              })}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Line_Chart;