import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function SalesChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/daily-sales");

      const result = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      if (!result.length) {
        setChartData([]);
        return;
      }

      const values = result.map((item) => Number(item.totalSales || 0));
      const max = Math.max(...values);

      const formatted = result.map((item) => {
        const value = Number(item.totalSales || 0);

        let color = "#22c55e"; // high

        if (value < max * 0.3) color = "#ef4444"; // low
        else if (value < max * 0.7) color = "#f59e0b"; // medium

        return {
          x: new Date(item._id).toLocaleDateString(),
          y: value,
          fillColor: color,
        };
      });

      setChartData(formatted);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Auto refresh every 5s
  useEffect(() => {
    fetchSales();

    const interval = setInterval(fetchSales, 5000);

    return () => clearInterval(interval);
  }, []);

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 600,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        borderRadius: 8,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      type: "category",
      labels: {
        rotate: -45,
        style: {
          fontSize: "11px",
          colors: "#6b7280",
        },
      },
    },
    yaxis: {
      title: {
        text: "Sales (₹)",
        style: { fontSize: "12px" },
      },
      labels: {
        style: { fontSize: "11px", colors: "#6b7280" },
      },
    },
    grid: {
      strokeDashArray: 4,
      borderColor: "#e5e7eb",
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val) => `₹ ${val}`,
      },
    },
  };

  const series = [
    {
      name: "Sales",
      data: chartData,
    },
  ];

  return (
    <div className="w-full bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-base font-semibold text-gray-800">
          Daily Sales Overview
        </h2>

        {/* Last Updated */}
        {lastUpdated && (
          <span className="text-xs text-gray-400">
            Updated {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="h-[260px] animate-pulse bg-gray-100 rounded-lg"></div>
      ) : chartData.length === 0 ? (
        <p className="text-center text-sm text-gray-400">
          No sales data available
        </p>
      ) : (
        <div className="h-[260px]">
          <Chart
            options={options}
            series={series}
            type="bar"
            height="100%"
          />
        </div>
      )}

      {/* Legend */}
      <div className="flex justify-center gap-5 mt-4 text-xs">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          Low
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          Medium
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          High
        </div>
      </div>
    </div>
  );
}

export default SalesChart;