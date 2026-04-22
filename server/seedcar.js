// seedCars.js
const mongoose = require("mongoose");
const Car = require("./models/Car");

const MONGO_URI = "your_mongodb_url";

const randomDateLast6Months = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 6, 1);

  return new Date(
    start.getTime() + Math.random() * (now.getTime() - start.getTime())
  );
};

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB Connected");

    await Car.deleteMany(); // clean slate

    const cars = [];

    for (let i = 1; i <= 50; i++) {
      const price = Math.floor(Math.random() * 500000) + 500000;
      const discount = Math.floor(Math.random() * 30);
      const finalPrice = price - (price * discount) / 100;

      cars.push({
        carId: `CAR${i}`,
        model: `Model-${i}`,
        price,
        discountPercentage: discount,
        finalPrice,
        offerId: "10",
        createdAt: randomDateLast6Months(),
        updatedAt: randomDateLast6Months(),
      });
    }

    await Car.insertMany(cars);

    console.log("✅ Seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();