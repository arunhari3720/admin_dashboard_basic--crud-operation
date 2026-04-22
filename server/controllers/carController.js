const Car = require("../models/Car");

// CREATE
const createCar = async (req, res) => {
  try {
    const { carId, model, price } = req.body;

    const parsedPrice = Number(price);

    if (!carId || !model || isNaN(parsedPrice)) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const car = await Car.create({
      carId,
      model,
      price: parsedPrice,
      finalPrice: parsedPrice,
      discountPercentage: 0,
    });

    res.json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// GET
const getCars = async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
};

// UPDATE SINGLE
const updateCar = async (req, res) => {
  try {
    const { carId } = req.params;

    const price = Number(req.body.price);

    if (req.body.price && isNaN(price)) {
      return res.status(400).json({ error: "Invalid price" });
    }

    const car = await Car.findOne({ carId });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    if (req.body.model) car.model = req.body.model;
    if (req.body.price) car.price = price;

    await car.save();

    res.json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({
      carId: req.params.carId,
    });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// BULK DISCOUNT
const updateBulkDiscount = async (req, res) => {
  try {
    const { carIds, discountPercentage } = req.body;

    if (!carIds || carIds.length === 0) {
      return res.status(400).json({ error: "No cars selected" });
    }

    const discount = Number(discountPercentage);

    if (isNaN(discount)) {
      return res.status(400).json({ error: "Invalid discount" });
    }

    for (let id of carIds) {
      const car = await Car.findOne({ carId: id });

      if (!car) continue;

      let finalPrice = car.price;

      finalPrice -= (car.price * discount) / 100;
      finalPrice = Math.max(0, finalPrice);

      car.discountPercentage = discount;
      car.finalPrice = finalPrice;

      await car.save();
    }

    res.json({ message: "Bulk discount applied" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// SINGLE DISCOUNT
const updateCarDiscount = async (req, res) => {
  try {
    const { carId } = req.params;
    const { discountPercentage } = req.body;

    const discount = Number(discountPercentage);

    if (isNaN(discount)) {
      return res.status(400).json({ error: "Invalid discount" });
    }

    const car = await Car.findOne({ carId });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    let finalPrice = car.price;

    finalPrice -= (car.price * discount) / 100;
    finalPrice = Math.max(0, finalPrice);

    car.discountPercentage = discount;
    car.finalPrice = finalPrice;

    await car.save();

    res.json(car);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCar,
  getCars,
  updateCar,
  deleteCar,
  updateBulkDiscount,
  updateCarDiscount,
};