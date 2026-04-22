// components/CarCard.jsx
export default function CarCard({ car }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 w-72">
      <h3 className="text-xl font-bold">{car.model}</h3>

      <p className="text-gray-500">
        Original: ₹{car.price}
      </p>

      <p className="text-red-500">
        Discount: {car.discountPercentage || 0}%
      </p>

      <p className="text-green-600 font-bold text-lg">
        Final: ₹{car.finalPrice}
      </p>
    </div>
  );
}