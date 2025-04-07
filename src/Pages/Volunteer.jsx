import React from 'react';

const Volunteer = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto bg-white">
      {/* Header */}
      <div className="w-full text-center py-8">
        <h1 className="text-3xl font-bold text-gray-800">Become a Volunteer</h1>
        <p className="text-gray-600 mt-1">Your time and talent can make a real difference in people&apos;s lives.</p>
      </div>

      {/* Most Needed Positions Banner */}
      <div className="w-full bg-teal-600 text-white text-center py-4">
        <h2 className="text-2xl font-bold">Sign Up for Our Most-Needed Positions</h2>
        <p className="text-sm mt-1">(Please note, every community&apos;s needs are different so availability may vary.)</p>
      </div>

      {/* Top row positions */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Blood Donor Ambassador */}
        <div className="border border-gray-300 bg-white flex">
          <div className="w-1/3">
            <img src="/api/placeholder/150/200" alt="Blood Donor Ambassador" className="w-full h-full object-cover" />
          </div>
          <div className="w-2/3 p-4">
            <h3 className="text-lg font-bold text-gray-800">Blood Donor Ambassador</h3>
            <p className="text-red-600 font-bold text-sm mb-2">Urgent need for volunteers</p>
            <p className="text-sm text-gray-600 mb-4">
              As a Blood Donor Ambassador, you will engage with donors by greeting, registering, answering questions, providing information and supporting them through the recovery process at the refreshment table. The positive, welcoming atmosphere you help create makes a favorable impression that keeps donors enjoying their support.
            </p>
            <button className="bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase">Apply Now</button>
          </div>
        </div>

        {/* Blood Transportation Specialist */}
        <div className="border border-gray-300 bg-white flex">
          <div className="w-1/3">
            <img src="/api/placeholder/150/200" alt="Blood Transportation Specialist" className="w-full h-full object-cover" />
          </div>
          <div className="w-2/3 p-4">
            <h3 className="text-lg font-bold text-gray-800">Blood Transportation Specialist</h3>
            <p className="text-red-600 font-bold text-sm mb-2">Urgent need for volunteers</p>
            <p className="text-sm text-gray-600 mb-4">
              Join a thriving blood support team in your community.
              <br /><br />
              As a Transportation Specialist, you will help us in this critical link between blood donors and blood recipients by delivering blood, platelets or other blood products to a hospital.
            </p>
            <button className="bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase">Apply Now</button>
          </div>
        </div>
      </div>

      {/* Bottom row positions */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {/* Disaster Action Team */}
        <div className="border border-gray-300 bg-white">
          <img src="/api/placeholder/400/200" alt="Disaster Action Team" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800">Disaster Action Team (DAT)</h3>
            <p className="text-sm text-gray-600 mb-4">
              Join a team that responds to an average of about 60,000 emergencies every year. We supply all the training you need.
            </p>
            <button className="bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase">Apply Now</button>
          </div>
        </div>

        {/* Shelter Volunteer */}
        <div className="border border-gray-300 bg-white">
          <img src="/api/placeholder/400/200" alt="Shelter Volunteer" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800">Shelter Volunteer</h3>
            <p className="text-red-600 font-bold text-sm mb-2">URGENT NEED FOR VOLUNTEERS</p>
            <p className="text-sm text-gray-600 mb-4">
              When disasters strike and people are displaced from their home, you can be the shelter in the storm. Shelter operations work directly with residents, manage dormitories, serve meals and deliver various additional services. If you are a calm and compassionate person, this is the opportunity for you to step up and start your training. This way you can be ready to respond when the next major disaster strikes.
            </p>
            <button className="bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase">Apply Now</button>
          </div>
        </div>

        {/* Disaster Health Services */}
        <div className="border border-gray-300 bg-white">
          <img src="/api/placeholder/400/200" alt="Disaster Health Services" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800">Disaster Health Services</h3>
            <p className="text-sm text-gray-600 mb-4">
              Join our team of dedicated healthcare professionals who make a difference during large-scale disasters. As a licensed healthcare provider, you will have the opportunity to provide essential hands-on care and education to those affected, using your expertise to support communities in need.
            </p>
            <button className="bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase">Apply Now</button>
          </div>
        </div>
      </div>

      {/* Footer Statistics */}
      <div className="w-full bg-gray-100 py-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">90% of the Red Cross workforce are volunteers.</h2>
        <p className="text-red-600 font-bold text-xl mt-4">Our work is possible because of people like you.</p>
        <p className="text-gray-600 mt-2 mb-4">Discover the role that is right for you and join us today!</p>
        
        <button className="bg-red-600 text-white px-6 py-2 font-bold uppercase mb-2">Find My Volunteer Opportunity</button>
        <p className="text-sm">Or <a href="#" className="text-blue-600 underline">Apply Now »</a></p>
      </div>
    </div>
  );
};

export default Volunteer;
