import React, { useState } from "react";
import girlImg from "../../assets/hero.jpg"; // Illustration image
import gmailIcon from "../../assets/gmail.png"; // Gmail Icon
import facebookIcon from "../../assets/facebook.png";
import HelpRequestForm from "./HelpRequestForm";
// import other icons if needed

const icons = [
  { src: gmailIcon, alt: "Gmail" },
  { src: facebookIcon, alt: "Facebook" },
  // Add other icons if needed
];

const Hero = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="flex flex-col md:flex-row justify-between items-center px-10 py-20 max-w-7xl mx-auto rounded-xl">
        {/* Left content */}
        <div className="md:w-1/2 space-y-6 text-white">
          <h1 className="text-5xl font-bold">
            <span className="text-yellow-300">Disaster</span> Relief
          </h1>
          <p className="text-lg">
            Join hands to help people affected by floods and natural disasters
            across the country.
          </p>
          <ul className="space-y-1 text-white">
            <li>✓ Support with food, clean water, and medicine</li>
            <li>✓ Mobilizing emergency resources 24/7</li>
            <li>✓ Transparent, clear, no intermediaries</li>
            <li>✓ You can contribute with just a few dollars</li>
          </ul>
          <button
            onClick={() => setShowForm(true)}
            className="bg-yellow-400 text-red-700 px-6 py-3 rounded-md font-semibold hover:bg-yellow-300 transition"
          >
            Request Support
          </button>
          <p className="text-sm text-white/80">
            For emergency information, please contact the national front
            hotline: 0813.051.989
          </p>
        </div>

        {/* Image + icons on the right */}
        <div className="md:w-1/2 relative mt-10 md:mt-0 flex justify-center items-center">
          <img
            src={girlImg}
            alt="Support"
            className="w-[400px] relative z-10"
          />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
            {icons.map((icon, idx) => (
              <img
                key={idx}
                src={icon.src}
                alt={icon.alt}
                className="w-8 h-8 bg-white p-1 rounded-full shadow-md"
              />
            ))}
          </div>
        </div>
      </section>
      {showForm && <HelpRequestForm onClose={() => setShowForm(false)} />}
    </>
  );
};

export default Hero;
