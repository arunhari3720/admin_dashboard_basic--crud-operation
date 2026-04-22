const Offer = require("../models/Offer");
const { calculateFinalPrice } = require("../utils/calculatePrice");
const Car = require("../models/Car");

const createOffer = async (req, res) => {
  const offer = await Offer.create(req.body);
  res.json(offer);
};

const getOffers = async (req, res) => {
  const offers = await Offer.find();
  res.json(offers);
};

const updateOffer = async (req, res) => {
  const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  // Update all cars using this offer
  const cars = await Car.find({ offerId: offer.offerId });

  for (let car of cars) {
    const newFinalPrice = calculateFinalPrice(car.price, offer);

    await Car.updateOne(
      { _id: car._id },
      { finalPrice: newFinalPrice }
    );
  }

  res.json({ message: "Offer updated & cars synced", offer });
};

module.exports = {
  createOffer,
  getOffers,
  updateOffer,
};