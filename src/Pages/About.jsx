import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto bg-white">
      {/* Hero Banner */}
      <div className="relative w-full h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80"
          alt="Hero Banner"
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
          <div className="absolute bottom-0 left-0 w-full text-center text-white pb-8 px-4">
            <h1 className="text-4xl font-bold mb-2 transform transition-all duration-300 hover:scale-105">About Us</h1>
            <p className="text-xl opacity-90">Sleeves Up, Hearts Open, All In.</p>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="absolute bottom-8 right-8 flex space-x-3">
          {['facebook', 'twitter', 'instagram', 'youtube'].map((platform) => (
            <div
              key={platform}
              className="bg-indigo-600 hover:bg-indigo-700 rounded-full w-10 h-10 flex items-center justify-center text-white transform transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              {platform[0].toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {/* About Us content */}
      <div className="w-full p-8 flex flex-col md:flex-row gap-8 bg-white shadow-md rounded-xl mt-8 mx-4">
        <div className="w-full md:w-1/3 transform transition-all duration-300 hover:scale-[1.02]">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80"
            alt="Team Working"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="w-full md:w-2/3 text-gray-700">
          <p className="mb-4 text-base leading-relaxed">
            Each day, thousands of people – about 90% of the AidBridge workforce – contribute their time and talent to help those in need. Whether helping one displaced family or thousands, providing care and comfort to an ill or injured service member or veteran, or teaching others how to respond in emergencies, it's through the efforts of ordinary people that we can do extraordinary things.
          </p>
          <p className="text-base leading-relaxed">
            The AidBridge responds to an emergency every 8 minutes. No one else does this: not the government, not other charities. From small house fires to multi-state natural disasters, the American AidBridge goes wherever we are needed, so people can have clean water, safe shelter and hot meals when they need them most.
          </p>
        </div>
      </div>

      {/* Our Work Section */}
      <div className="w-full bg-white py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Our Work</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          AidBridge volunteers and staff work to deliver vital services – from providing relief and support to those in crisis, to helping you be prepared to respond in emergencies.
        </p>

        {/* Service Icons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: "🏠",
              title: "Disaster Relief",
              description: "Learn how we help families and communities recover from disaster.",
              image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80"
            },
            {
              icon: "🌎",
              title: "International Services",
              description: "Learn how we work with partner programs around the world.",
              image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80"
            },
            {
              icon: "🩸",
              title: "Donating Blood",
              description: "Learn how your blood donation contributes to saving lives.",
              image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80"
            },
            {
              icon: "⚕️",
              title: "Military Families",
              description: "Learn how we support military members, veterans and their families.",
              image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80"
            },
            {
              icon: "🧠",
              title: "Training & Certification",
              description: "Learn CPR, First Aid, Water Safety, childcare and workplace skills.",
              image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80"
            }
          ].map((service, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="mr-3 w-10 h-10 rounded-full border-2 border-indigo-600 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                    <span className="text-xl">{service.icon}</span>
                  </div>
                  <h3 className="font-bold text-indigo-700">{service.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="w-full bg-white py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Who We Are</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          From the mission, fundamental principles and business practices that guide our organization, to the history of our service for more than a century, get to know the AidBridge.
        </p>

        {/* Information Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {[
            {
              title: "Our Mission & Values",
              description: "Learn about the fundamental principles of the AidBridge",
              image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80"
            },
            {
              title: "History & Heritage",
              description: "The history of the AidBridge traces back to a legacy of service",
              image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80"
            },
            {
              title: "Board of Governors",
              description: "The Board provides governance and strategic oversight for the AidBridge",
              image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80"
            },
            {
              title: "Celebrity Supporters",
              description: "Meet the celebrities who support the important work of the AidBridge",
              image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80"
            }
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] cursor-pointer overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <div className="mr-3 w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white transform transition-transform duration-300 hover:scale-110">
                    <span>→</span>
                  </div>
                  <h3 className="font-bold text-indigo-700">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;