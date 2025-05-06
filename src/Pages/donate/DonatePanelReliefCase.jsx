import React, { useEffect, useState } from "react";
import { checkout } from "../../apis/services/PaymentService";
import { Link, useParams } from "react-router-dom";
import {
  HeartHandshake,
  CreditCard,
  Package,
  ChevronRight,
  DollarSign,
} from "lucide-react";
import {
  getReliefCase,
  updateReliefCaseUser,
} from "../../apis/services/ReliefCaseService";

export default function DonatePanelReliefCase() {
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [totalDonation, setTotalDonation] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const exchangeRate = 26000;

  const presetAmounts =
    currency === "USD"
      ? [25, 50, 100, 250]
      : [500000, 1000000, 2500000, 5000000];

  useEffect(() => {
    const fetchTotalDonation = async () => {
      const res = await getReliefCase(id);
      setTotalDonation(res.data.totalDonations);
    };
    fetchTotalDonation();
  }, [id]);

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(value);
    setSelectedOption(null);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value.toUpperCase());
    setAmount("");
    setSelectedOption(null);
  };

  const selectPresetAmount = (value, index) => {
    setAmount(value.toString());
    setSelectedOption(index);
  };

  const handleCheckout = async () => {
    const numericAmount = parseFloat(amount);

    if (!numericAmount || numericAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      const res = await checkout(numericAmount, currency);

      await updateReliefCaseUser(id, {
        totalDonations: totalDonation + numericAmount,
      });

      if (res.data?.url) {
        window.location.href = res.data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an error processing your payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getDisplayAmount = () => {
    const numericAmount = parseFloat(amount);
    if (!numericAmount) return "";

    if (currency === "USD") {
      return `$${numericAmount.toFixed(2)}`;
    } else {
      const amountInUSD = numericAmount / exchangeRate;
      return `₫${numericAmount.toLocaleString()} (≈ $${amountInUSD.toFixed(
        2
      )})`;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <HeartHandshake className="mx-auto mb-4 text-blue-600" size={48} />
        <h1 className="text-4xl font-bold text-gray-800">
          Make a Difference Today
        </h1>
        <p className="mt-3 text-xl text-gray-600 max-w-2xl mx-auto">
          Your generosity helps us continue our mission of supporting those in
          need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Money Donation */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-blue-600 py-6 px-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <CreditCard className="mr-3" size={24} />
              Financial Contribution
            </h2>
          </div>

          <div className="p-8">
            {/* Currency Selector */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">
                Select Currency
              </label>
              <div className="flex gap-4">
                {["USD", "VND"].map((curr) => (
                  <label
                    key={curr}
                    className="flex items-center relative pl-8 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="currency"
                      value={curr}
                      checked={currency === curr}
                      onChange={handleCurrencyChange}
                      className="absolute opacity-0 h-0 w-0"
                    />
                    <span
                      className={`absolute left-0 top-0 h-6 w-6 rounded-full border-2 ${
                        currency === curr
                          ? "border-blue-600"
                          : "border-gray-300"
                      }`}
                    >
                      {currency === curr && (
                        <span className="absolute inset-1 bg-blue-600 rounded-full"></span>
                      )}
                    </span>
                    <span className="font-medium">
                      {curr} {curr === "USD" ? "($)" : "(₫)"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preset Amounts */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Common Amounts
              </label>
              <div className="grid grid-cols-4 gap-2">
                {presetAmounts.map((value, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectPresetAmount(value, index)}
                    className={`py-2 px-4 rounded-lg border-2 text-center transition-all ${
                      selectedOption === index
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    {currency === "USD" ? "$" : "₫"}
                    {currency === "USD" ? value : value.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-2">
                Custom Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {currency === "USD" ? "$" : "₫"}
                </span>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder={
                    currency === "USD" ? "Enter amount" : "Enter amount"
                  }
                  className="w-full p-4 pl-8 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
              </div>
              {amount && parseFloat(amount) > 0 && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg text-blue-700 flex items-center">
                  <DollarSign size={18} className="mr-2 flex-shrink-0" />
                  <p>
                    Your donation: <strong>{getDisplayAmount()}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Donate Button */}
            <button
              onClick={handleCheckout}
              disabled={loading || !amount || parseFloat(amount) <= 0}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors font-medium text-lg flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  Donate Now <ChevronRight size={20} className="ml-2" />
                </span>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-gray-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-gray-500">
                Secure payment processing
              </span>
            </div>
          </div>
        </div>

        {/* Items Donation */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-green-600 py-6 px-8">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Package className="mr-3" size={24} />
              In-Kind Donation
            </h2>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <p className="text-gray-700 mb-4 text-lg">
                We gratefully accept donations of goods and supplies to support
                our community programs:
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-800">Clothing & Shoes</span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-800">Household Items</span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-800">Furniture</span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-800">Electronics</span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-800">Books & Toys</span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-800">Non-perishable Food</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg mb-8">
                <p className="text-gray-700">
                  Your donated items make a direct impact by being distributed
                  to community members in need or by supporting our fundraising
                  efforts.
                </p>
              </div>
            </div>

            <Link
              to="/donate/items"
              className="block w-full bg-green-600 text-white text-center py-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg flex items-center justify-center"
            >
              Schedule Item Donation <ChevronRight size={20} className="ml-2" />
            </Link>

            <div className="mt-4 flex items-center justify-center">
              <svg
                className="h-5 w-5 text-gray-400 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-5h2v5a1 1 0 001 1h.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
              </svg>
              <span className="text-sm text-gray-500">
                Free pickup service available
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Your donation may be tax-deductible. Please consult with a tax
          professional for details.
        </p>
      </div>
    </div>
  );
}
