import { useState } from "react";
import {
  MapPin,
  Navigation,
  Search,
  Droplet,
  Wind,
  Cloud,
  Thermometer,
  Sun,
  RefreshCw,
} from "lucide-react";
import {
  getCurrentCoor,
  getCurrentLocation,
  getCurrentWeather,
  getPredict,
} from "../../apis/services/PredictFloodService";

export default function PredictFlood() {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [place, setPlace] = useState("");
  const [weatherForFloodPrediction, setWeatherForFloodPrediction] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [predictLoading, setPredictLoading] = useState(false);

  const FAST_API_URL = import.meta.env.VITE_PREDICT_FLOOD_API;

  const estimateBrightSunshine = (data) => {
    const sunrise = data.city.sunrise;
    const sunset = data.city.sunset;
    const cloudCover = data.list[0].clouds.all;
    const totalDaylightHours = (sunset - sunrise) / 3600;
    return (totalDaylightHours * (1 - cloudCover / 100)).toFixed(9);
  };

  const getLocation = async () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          fetchWeather(position.coords.latitude, position.coords.longitude);
          fetchLocation(position);
        },
        (error) => {
          alert(`Geolocation error: ${error.message}`);
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const fetchLocation = async (position) => {
    try {
      const data = await getCurrentLocation(
        position.coords.latitude,
        position.coords.longitude
      );
      setPlace(
        `${data.address.city || data.address.town || data.address.village}, ${
          data.address.country
        }`
      );
    } catch (error) {
      alert(`Error fetching location: ${error.message}`);
    }
  };

  const fetchCoordinates = async () => {
    if (!place) return;
    setLoading(true);
    try {
      const data = await getCurrentCoor(place);
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setLocation({ latitude: lat, longitude: lon });
        fetchWeather(lat, lon);
      } else {
        alert("Location not found");
      }
    } catch (error) {
      alert(`Error getting coordinates: ${error.message}`);
    }
    setLoading(false);
  };

  const fetchWeather = async (lat, lon) => {
    try {
      const OPEN_WEATHER_KEY = import.meta.env.VITE_OPEN_WEATHER_KEY;

      const data = await getCurrentWeather(lat, lon, OPEN_WEATHER_KEY);

      const weatherData = {
        Max_Temp: parseFloat(data.list[0].main.temp_max.toFixed(1)),
        Min_Temp: parseFloat(data.list[0].main.temp_min.toFixed(1)),
        Rainfall: data.list[0].rain?.["3h"] ?? 0 / 0.1,
        Relative_Humidity: data.list[0].main.humidity,
        Wind_Speed: parseFloat((data.list[0].wind.speed / 3.6).toFixed(9)),
        Cloud_Coverage: parseFloat(
          ((data.list[0].clouds.all * 8) / 100).toFixed(1)
        ),
        Bright_Sunshine: parseFloat(estimateBrightSunshine(data)),
      };
      setWeatherForFloodPrediction(weatherData);
    } catch (error) {
      alert(`Error fetching weather data: ${error.message}`);
    }
    setLoading(false);
  };

  const predict = async () => {
    setPredictLoading(true);
    try {
      const data = await getPredict(FAST_API_URL, weatherForFloodPrediction);
      setPrediction(data.Prediction);
    } catch (error) {
      alert(`Prediction error: ${error.message}`);
    }
    setPredictLoading(false);
  };

  // Helper function to get appropriate units for weather data
  const getUnit = (key) => {
    const units = {
      Max_Temp: "°C",
      Min_Temp: "°C",
      Rainfall: "mm",
      Relative_Humidity: "%",
      Wind_Speed: "m/s",
      Cloud_Coverage: "oktas",
      Bright_Sunshine: "hours",
    };
    return units[key] || "";
  };

  // Helper function to get more readable labels
  const getReadableLabel = (key) => {
    const labels = {
      Max_Temp: "Maximum Temperature",
      Min_Temp: "Minimum Temperature",
      Rainfall: "Rainfall",
      Relative_Humidity: "Relative Humidity",
      Wind_Speed: "Wind Speed",
      Cloud_Coverage: "Cloud Coverage",
      Bright_Sunshine: "Bright Sunshine",
    };
    return labels[key] || key;
  };

  // Helper function to get icon for each weather parameter
  const getWeatherIcon = (key) => {
    const icons = {
      Max_Temp: <Thermometer className="w-5 h-5 text-red-500" />,
      Min_Temp: <Thermometer className="w-5 h-5 text-blue-500" />,
      Rainfall: <Droplet className="w-5 h-5 text-blue-400" />,
      Relative_Humidity: <Droplet className="w-5 h-5 text-blue-300" />,
      Wind_Speed: <Wind className="w-5 h-5 text-gray-500" />,
      Cloud_Coverage: <Cloud className="w-5 h-5 text-gray-400" />,
      Bright_Sunshine: <Sun className="w-5 h-5 text-yellow-400" />,
    };
    return icons[key] || null;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800">FloodSense</h1>
        <p className="text-gray-600 mt-2">
          Advanced Flood Risk Analysis System
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Location Input */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-blue-700" />
            </div>
            <h2 className="text-xl font-semibold ml-3 text-gray-800">
              Location Selection
            </h2>
          </div>

          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter city, region or address"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
            </div>

            <button
              onClick={fetchCoordinates}
              disabled={loading || !place}
              className="w-full mt-3 bg-blue-700 hover:bg-blue-800 text-white py-3 px-4 rounded-lg font-medium transition duration-200 disabled:bg-blue-300 flex items-center justify-center"
            >
              {loading ? (
                <RefreshCw className="animate-spin h-5 w-5 mr-2" />
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Find Location
                </>
              )}
            </button>
          </div>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-200" />
            <span className="px-3 text-gray-400 text-sm font-medium">OR</span>
            <hr className="flex-grow border-gray-200" />
          </div>

          <button
            onClick={getLocation}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 disabled:bg-green-300 flex items-center justify-center"
          >
            {loading ? (
              <RefreshCw className="animate-spin h-5 w-5 mr-2" />
            ) : (
              <>
                <Navigation className="w-5 h-5 mr-2" />
                Use Current Location
              </>
            )}
          </button>

          {location.latitude && location.longitude && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm">
              <p className="text-gray-500 font-medium">Coordinates:</p>
              <p className="text-gray-700">
                Lat: {parseFloat(location.latitude).toFixed(4)}
              </p>
              <p className="text-gray-700">
                Lon: {parseFloat(location.longitude).toFixed(4)}
              </p>
            </div>
          )}
        </div>

        {/* Middle Column - Weather Data */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Cloud className="h-6 w-6 text-blue-700" />
            </div>
            <h2 className="text-xl font-semibold ml-3 text-gray-800">
              Weather Conditions
            </h2>
          </div>

          {weatherForFloodPrediction ? (
            <div className="space-y-3">
              {place && (
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <p className="font-medium text-blue-800">{place}</p>
                </div>
              )}

              {Object.entries(weatherForFloodPrediction).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-all hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    {getWeatherIcon(key)}
                    <span className="font-medium ml-2 text-gray-700">
                      {getReadableLabel(key)}
                    </span>
                  </div>
                  <span className="text-gray-800 font-semibold">
                    {value} {getUnit(key)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Cloud className="h-12 w-12 text-gray-300 mb-3" />
              <p className="text-gray-400">No weather data available</p>
              <p className="text-gray-400 text-sm mt-2">
                Select a location to view weather conditions
              </p>
            </div>
          )}
        </div>

        {/* Right Column - Prediction Results */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 flex flex-col">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Droplet className="h-6 w-6 text-blue-700" />
            </div>
            <h2 className="text-xl font-semibold ml-3 text-gray-800">
              Flood Risk Analysis
            </h2>
          </div>

          {prediction !== null ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center">
              <div
                className={`w-32 h-32 rounded-full flex items-center justify-center mb-4 ${
                  prediction ? "bg-red-100" : "bg-green-100"
                }`}
              >
                <Droplet
                  className={`h-16 w-16 ${
                    prediction ? "text-red-500" : "text-green-500"
                  }`}
                />
              </div>

              <h3 className="text-2xl font-bold mb-2">
                {prediction ? "High Risk" : "Safe"}
              </h3>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Droplet className="h-16 w-16 text-gray-300" />
              </div>
              <p className="text-gray-400 mb-8">
                Run the prediction to see flood risk analysis
              </p>
            </div>
          )}

          <button
            onClick={predict}
            disabled={!weatherForFloodPrediction || predictLoading}
            className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 disabled:bg-blue-300 flex items-center justify-center"
          >
            {predictLoading ? (
              <RefreshCw className="animate-spin h-5 w-5 mr-2" />
            ) : (
              "Analyze Flood Risk"
            )}
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          FloodSense uses advanced machine learning algorithms combined with
          real-time weather data to predict flood risks
        </p>
      </div>
    </div>
  );
}
