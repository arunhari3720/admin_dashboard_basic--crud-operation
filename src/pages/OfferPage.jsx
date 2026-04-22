import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function OfferPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const res = await API.get("/cars");
    setCars(res.data);
  };

  const handleChange = (index, value) => {
    const updated = [...cars];

    const discount = Number(value);
    updated[index].discountPercentage = discount;

    const price = updated[index].price;

    updated[index].finalPrice =
      price - (price * discount) / 100;

    setCars(updated);
  };

 const saveDiscount = async (car) => {
  try {
    const res = await API.put(`/cars/discount/${car.carId}`, {
      discountPercentage: Number(car.discountPercentage)
    });

    console.log("Response:", res.data); // ✅ now works
    toast.success("Discount saved!");
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
    toast.error("Error saving");
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Apply Offers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car, index) => (
          <div
            key={car._id}
            className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
          >
            {/* Car Name */}
            <h3 className="text-lg font-semibold text-gray-800">
              {car.model}
            </h3>

            {/* Price */}
            <p className="text-gray-500 mt-2">
              Price: ₹{car.price}
            </p>

            {/* Discount Input */}
            <div className="mt-4">
              <label className="text-sm text-gray-600">
                Discount %
              </label>

              <input
                type="number"
                placeholder="Enter %"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={car.discountPercentage || ""}
                onChange={(e) =>
                  handleChange(index, e.target.value)
                }
              />
            </div>

            {/* Final Price */}
            <p className="mt-4 font-semibold text-green-600">
              Final: ₹{car.finalPrice || car.price}
            </p>

            {/* Button */}
            <button
              onClick={() => saveDiscount(car)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}