import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API = "http://localhost:5000/api/transactions";

function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (loading) return;

    if (!method) {
      toast.error("Please select a payment method");
      return;
    }

    try {
      setLoading(true);

      await axios.post(API, {
        planName: state.name,
        amount: state.price,
        paymentMethod: method,
      });

      toast.success("✅ Payment Completed!");

      setTimeout(() => navigate("/admin/productlist"), 1500);
    } catch (err) {
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-50 flex items-center justify-center p-6">
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        
        {/* 🔥 LEFT: PLAN SUMMARY */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">
            Order Summary
          </h2>

          <div className="mb-4">
            <p className="text-gray-500 text-sm">Plan</p>
            <h3 className="text-xl font-semibold text-gray-900">
              {state.name}
            </h3>
          </div>

          <div className="mb-6">
            <p className="text-gray-500 text-sm">Amount</p>
            <h1 className="text-3xl font-bold text-sky-600">
              ₹{state.price}
            </h1>
          </div>

          <div className="border-t pt-4 text-sm text-gray-500">
            Secure payment powered by your system
          </div>
        </div>

        {/* 🔥 RIGHT: PAYMENT METHODS */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-6">
            Select Payment Method
          </h2>

          <div className="space-y-4">
            {[
              { label: "UPI", value: "upi" },
              { label: "Card", value: "card" },
              { label: "Net Banking", value: "netbanking" },
            ].map((m) => (
              <label
                key={m.value}
                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition
                ${
                  method === m.value
                    ? "border-sky-500 bg-sky-50"
                    : "border-gray-200 hover:border-sky-300"
                }`}
              >
                <span className="font-medium text-gray-800">
                  {m.label}
                </span>

                <input
                  type="radio"
                  name="payment"
                  value={m.value}
                  checked={method === m.value}
                  onChange={(e) => setMethod(e.target.value)}
                />
              </label>
            ))}
          </div>

          {/* 🔥 BUTTON */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500
            text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Complete Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;