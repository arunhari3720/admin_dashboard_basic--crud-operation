// utils/calculatePrice.js

const calculateFinalPrice = (price, offer) => {
  let final = price;

  if (offer) {
    if (offer.discountType === "flat") {
      final -= offer.discountValue;
    } else {
      final -= (price * offer.discountValue) / 100;
    }
  }

  return Math.max(0, final);
};

module.exports = { calculateFinalPrice };