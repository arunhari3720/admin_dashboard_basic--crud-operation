import { useEffect, useState } from "react";
import axios from "axios";

function BikePage() {
  const [bikes, setBikes] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchBikes = async (selectedPage) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/bikes?page=${selectedPage}`
      );

      // 🔥 append logic
      if (selectedPage === 1) {
        setBikes(res.data.data);
      } else {
        setBikes((prev) => [...prev, ...res.data.data]);
      }

      setPage(selectedPage);
      setPages(res.data.pages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBikes(1);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <h1 className="text-2xl font-bold mb-6">Bike List</h1>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Brand</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">CC</th>
            </tr>
          </thead>

          <tbody>
            {bikes.map((bike) => (
              <tr key={bike._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{bike.name}</td>
                <td className="p-3">{bike.brand}</td>
                <td className="p-3">₹{bike.price}</td>
                <td className="p-3">{bike.cc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 PAGINATION */}
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

        {/* FIRST 5 PAGES */}
        {[...Array(Math.min(5, pages))].map((_, i) => {
          const pageNum = i + 1;

          return (
            <button
              key={pageNum}
              onClick={() => fetchBikes(pageNum)}
              className={`px-3 py-1 rounded ${
                page >= pageNum
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* DROPDOWN FOR REMAINING */}
        {pages > 5 && (
          <select
            onChange={(e) => fetchBikes(Number(e.target.value))}
            className="px-3 py-1 border rounded"
          >
            <option>More</option>

            {[...Array(pages - 5)].map((_, i) => {
              const pageNum = i + 6;

              return (
                <option key={pageNum} value={pageNum}>
                  {pageNum}
                </option>
              );
            })}
          </select>
        )}

      </div>

    </div>
  );
}

export default BikePage;