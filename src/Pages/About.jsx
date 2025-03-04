import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto bg-white">
      {/* Hero Banner */}
      <div className="relative w-full h-64">
        <img 
          src="/api/placeholder/1200/400" 
          alt="logo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full text-center text-white pb-4 bg-gradient-to-t from-black/70">
          <h1 className="text-3xl font-bold">About Us</h1>
          <p className="text-lg">Sleeves Up, Hearts Open, All In.</p>
        </div>
        
        {/* Social Media Icons */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {['facebook', 'twitter', 'instagram', 'youtube'].map((platform) => (
            <div key={platform} className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
              {platform[0].toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      {/* About Us content */}
      <div className="w-full p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <img 
            src="/api/placeholder/400/300" 
            alt="Map" 
            className="w-full h-auto border border-gray-300"
          />
        </div>
        <div className="w-full md:w-2/3 text-gray-700 text-sm">
          <p className="mb-2">
            Each day, thousands of people – about 90% of the AidBridge workforce – contribute their time and talent to help those in need. Whether helping one displaced family or thousands, providing care and comfort to an ill or injured service member or veteran, or teaching others how to respond in emergencies, it's through the efforts of ordinary people that we can do extraordinary things.
          </p>
          <p>
            The AidBridge responds to an emergency every 8 minutes. No one else does this: not the government, not other charities. From small house fires to multi-state natural disasters, the American AidBridge goes wherever we are needed, so people can have clean water, safe shelter and hot meals when they need them most.
          </p>
        </div>
      </div>

      {/* Our Work Section */}
      <div className="w-full bg-white py-6">
        <h2 className="text-2xl font-bold text-center mb-2">Our Work</h2>
        <p className="text-center text-gray-700 mb-6 px-4">
            AidBridge volunteers and staff work to deliver vital services – from providing relief and support to those in crisis, to helping you be prepared to respond in emergencies.
        </p>

        {/* Service Icons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
          {[
            { icon: "🏠", title: "Disaster Relief", description: "Learn how we help families and communities recover from disaster." },
            { icon: "🌎", title: "International Services", description: "Learn how we work with partner programs around the world." },
            { icon: "🩸", title: "Donating Blood", description: "Learn how your blood donation contributes to saving lives." },
            { icon: "⚕️", title: "Military Families", description: "Learn how we support military members, veterans and their families." },
            { icon: "🧠", title: "Training & Certification", description: "Learn CPR, First Aid, Water Safety, childcare and workplace skills." }
          ].map((service, index) => (
            <div key={index} className="flex items-start p-2">
              <div className="mr-4 w-12 h-12 rounded-full border-2 border-red-600 flex items-center justify-center">
                <span className="text-xl">{service.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-red-700">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="w-full bg-white py-6">
        <h2 className="text-2xl font-bold text-center mb-6">Who We Are</h2>
        <p className="text-center text-gray-700 mb-6 px-4">
          From the mission, fundamental principles and business practices that guide our organization, to the history of our service for more than a century, get to know the AidBridge.
        </p>

        {/* Information Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
          {[
            { title: "Our Mission & Values", description: "Learn about the fundamental principles of the AidBridge" },
            { title: "History & Heritage", description: "The history of the AidBridge traces back to a legacy of service" },
            { title: "Board of Governors", description: "The Board provides governance and strategic oversight for the AidBridge" },
            { title: "Celebrity Supporters", description: "Meet the celebrities who support the important work of the AidBridge" },
            { title: "Leadership", description: "Meet the executives who lead the mission, people and programs of the AidBridge" },
            { title: "AidBridge Stories", description: "Read inspiring stories of hope and impact from the AidBridge community" },
            { title: "Governance", description: "Learn about the bylaws, code of conduct and reports that guide our work" },
            { title: "Innovation at the AidBridge", description: "Discover how innovation and technology brings hope to those in need" },
            { title: "AidBridge Officials", description: "The American AidBridge leadership team is committed to the organization's mission" },
            { title: "Driven By Data", description: "Learn how the AidBridge uses evidence, experience, execution and equity to help communities" },
            { title: "Diversity, Equity & Inclusion", description: "How we strive to create an inclusive environment for one and all" },
            { title: "International Humanitarian Law", description: "Learn how the AidBridge helps protect human dignity" }
          ].map((item, index) => (
            <div key={index} className="flex items-center p-2 border-b border-gray-200">
              <div className="mr-4 w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white">
                <span>→</span>
              </div>
              <div>
                <h3 className="font-bold text-red-700">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;