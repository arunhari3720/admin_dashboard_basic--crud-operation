import { motion } from "framer-motion";
import { Star } from "lucide-react";
import cskLogo from "../assets/csk_logo.png";
import rcb from "../assets/rcb_logo.png";
const teams = [
  {
    name: "Chennai Super Kings",
    logo: cskLogo,
    points: [
      "Strong fan base across India",
      "High brand visibility in IPL",
      "Led by iconic players",
      "Consistent performance record"
    ]
  },
  {
    name: "Mumbai Indians",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cd/Mumbai_Indians_Logo.svg",
    points: [
      "5-time IPL champions",
      "Massive global audience reach",
      "Top sponsorship ROI",
      "Strong digital presence"
    ]
  },
  {
    name: "RCB",
    logo: rcb,
    points: [
      "Huge fan engagement",
      "Virat Kohli brand value",
      "Strong social media reach",
      "Youth audience attraction"
    ]
  }
];

// 🔥 Container animation (stagger effect)
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// 🔥 Card animation
const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 }
};

function SponsorshipPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-10">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-10"
      >
        IPL Sponsorship Plans
      </motion.h1>

      {/* GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-3 gap-8"
      >

        {teams.map((team, index) => (
          <motion.div
            key={index}
            variants={cardVariant}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition text-center"
          >

            {/* TEAM NAME */}
            <h2 className="text-xl font-bold mb-4">
              {team.name}
            </h2>

            {/* LOGO */}
            <motion.img
              src={team.logo}
              alt={team.name}
              className="w-24 h-24 mx-auto object-contain mb-4"
              whileHover={{ rotate: 5, scale: 1.1 }}
            />

            {/* BULLET POINTS */}
            <ul className="text-sm text-gray-600 space-y-2 text-left mt-4">
              {team.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Star size={14} className="text-yellow-500 mt-1" />
                  {point}
                </li>
              ))}
            </ul>

            {/* BUTTON */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              View Sponsorship
            </motion.button>

          </motion.div>
        ))}

      </motion.div>
    </div>
  );
}

export default SponsorshipPage;