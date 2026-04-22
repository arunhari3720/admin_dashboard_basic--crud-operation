const Car = require("../models/Car");

const getDailySales = async (req, res) => {
  try {
    const sales = await Car.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalSales: { $sum: "$price" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMonthlySales = async (req, res) => {
  try {
    const sales = await Car.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalSales: { $sum: "$finalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getDailySales,
  getMonthlySales,
};