const Offer = require("../models/Offer");
const Car = require("../models/Car");

const getFinalPrice = async (req, res) => {
  const { carId } = req.params;

  const car = await Car.findOne({ carId });

  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  let finalPrice = car.price;

  if (car.offerId) {
    const offer = await Offer.findOne({ offerId: car.offerId });

    if (offer) {
      if (offer.discountType === "flat") {
        finalPrice -= offer.discountValue;
      } else if (offer.discountType === "percentage") {
        finalPrice -= (car.price * offer.discountValue) / 100;
      }
    }
  }

  res.json({
    carId: car.carId,
    model: car.model,
    originalPrice: car.price,
    finalPrice: car.finalPrice, // using stored value
  });
};

module.exports = {
  getFinalPrice,
};