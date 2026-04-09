const StatCard = ({ title, value, change }) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl shadow w-full flex flex-col justify-between">

      {/* Title */}
      <p className="text-gray-500 text-xs sm:text-sm">
        {title}
      </p>

      {/* Value */}
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-2">
        {value}
      </h2>

      {/* Change */}
      <span
        className={`text-xs sm:text-sm mt-2 font-medium ${
          change.startsWith("+") ? "text-green-500" : "text-red-500"
        }`}
      >
        {change}
      </span>

    </div>
  );
};

export default StatCard;