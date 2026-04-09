import StatCard from "../components/Statcard";
import SalesChart from "../components/Saleschart";
import TargetCard from "../components/TargetCard";
import Line_Chart from "../components/Linechart";

const Dashboard = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Customers" value="3,782" change="+11%" />
        <StatCard title="Orders" value="5,359" change="-9%" />
        <StatCard title="Users" value="100" change="+10%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Sales Chart */}
        <div className="w-full">
          <SalesChart />
        </div>

        {/* Target Card */}
        <div className="w-full">
          <TargetCard />
        </div>

        {/* Line Chart (full width always) */}
        <div className="col-span-1 lg:col-span-2">
          <Line_Chart />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;