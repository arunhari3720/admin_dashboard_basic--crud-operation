const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Bike = require("./models/Bike");

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // ❌ optional: clear old data
    await Bike.deleteMany();

    const bikes = [];

    for (let i = 1; i <= 50; i++) {
      bikes.push({
        name: `Bike ${i}`,
        brand: ["Yamaha", "Honda", "KTM"][i % 3],
        price: 100000 + i * 2000,
        cc: 100 + i,
      });
    }

    await Bike.insertMany(bikes);

    console.log("✅ 50 Bikes Inserted");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();