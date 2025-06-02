import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import axios from 'axios';
import { Leaf, Wind, Droplets, Sun, Cloud, CloudRain } from 'lucide-react';

// Add custom scrollbar styles
const scrollbarStyles = `
  /* For Webkit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(16, 185, 129, 0.1);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(16, 185, 129, 0.3);
    border-radius: 4px;
    border: 2px solid rgba(16, 185, 129, 0.1);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(16, 185, 129, 0.4);
  }

  /* For Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(16, 185, 129, 0.3) rgba(16, 185, 129, 0.1);
  }
`;

function App() {
  const [location, setLocation] = useState('');
  const [compareLocation, setCompareLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [compareWeatherData, setCompareWeatherData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [compareWeeklyData, setCompareWeeklyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [compareLoading, setCompareLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (isCompare = false) => {
    const targetLocation = isCompare ? compareLocation : location;
    if (!targetLocation) return;
    
    if (isCompare) {
      setCompareLoading(true);
    } else {
      setLoading(true);
    }
    setError('');
    
    try {
      const [currentResponse, weeklyResponse] = await Promise.all([
        axios.get(`/api/current/${targetLocation}`),
        axios.get(`/api/weekly/${targetLocation}`)
      ]);

      if (currentResponse.data.Ok) {
        if (isCompare) {
          setCompareWeatherData(currentResponse.data.Ok);
        } else {
          setWeatherData(currentResponse.data.Ok);
        }
      } else {
        setError(`Failed to fetch ${isCompare ? 'comparison' : 'current'} weather data. Please try again.`);
      }

      if (weeklyResponse.data.Ok) {
        if (isCompare) {
          setCompareWeeklyData(weeklyResponse.data.Ok);
        } else {
          setWeeklyData(weeklyResponse.data.Ok);
        }
      } else {
        setError(`Failed to fetch ${isCompare ? 'comparison' : 'weekly'} weather data. Please try again.`);
      }
    } catch (err) {
      setError(err.response?.data?.message || `Failed to fetch ${isCompare ? 'comparison' : 'weather'} data. Please try again.`);
      console.error('Error fetching weather:', err);
    } finally {
      if (isCompare) {
        setCompareLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  const getComparisonClass = (value1, value2, isHigher = true) => {
    if (!value1 || !value2) return '';
    const diff = value1 - value2;
    if (isHigher) {
      return diff > 0 ? 'text-amber-500' : diff < 0 ? 'text-teal-400' : '';
    } else {
      return diff < 0 ? 'text-amber-500' : diff > 0 ? 'text-teal-400' : '';
    }
  };

  const getComparisonArrow = (value1, value2) => {
    if (!value1 || !value2) return '';
    const diff = value1 - value2;
    if (diff > 0) return '↑';
    if (diff < 0) return '↓';
    return '→';
  };

  // Convert temperature to fantasy forest description
  const getTemperatureDescription = (temp) => {
    if (temp < 5) return "Frost Sprite Chill";
    if (temp < 10) return "Morning Dew Cool";
    if (temp < 15) return "Gentle Breeze";
    if (temp < 20) return "Sunlit Glade";
    if (temp < 25) return "Warm Hearth";
    if (temp < 30) return "Summer Solstice";
    return "Dragon's Breath";
  };

  // Convert wind speed to fantasy forest description
  const getWindDescription = (wind) => {
    if (wind < 5) return "Whispered Leaves";
    if (wind < 10) return "Dancing Branches";
    if (wind < 15) return "Swaying Canopy";
    if (wind < 20) return "Woodland Gale";
    return "Storm Spirit's Fury";
  };

  // Get fantasy day name
  const getFantasyDayName = (date) => {
    const days = [
      "Day of the Sun Sprite",
      "Day of the Moon Flower",
      "Day of the Root Deep",
      "Day of the Wind Song",
      "Day of the Thunder Oak",
      "Day of the Fairy Ring",
      "Day of the Star Moss",
    ];
    return days[date.getDay()];
  };

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    if (condition.includes("Sun") || condition.includes("Gold") || condition.includes("Fair")) {
      return <Sun className="h-6 w-6 text-amber-400" />;
    } else if (condition.includes("Mist") || condition.includes("Cloud") || condition.includes("Dappled")) {
      return <Cloud className="h-6 w-6 text-blue-300" />;
    } else if (condition.includes("Rain") || condition.includes("Shower")) {
      return <CloudRain className="h-6 w-6 text-blue-400" />;
    } else {
      return <Leaf className="h-6 w-6 text-emerald-400" />;
    }
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 text-emerald-50">
        {/* Magical forest particles */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(120,255,214,0.1)_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,120,0.05)_1px,_transparent_1px)] bg-[size:32px_32px]"></div>
        </div>

        <div className="relative container mx-auto px-4 py-8 max-w-6xl">
          {/* Enchanted Forest Header */}
          <div className="text-center mb-12 relative">
            {/* Glowing mushrooms decoration */}
            <div className="absolute -top-4 left-1/4 w-8 h-8 rounded-full bg-teal-400/20 animate-pulse"></div>
            <div className="absolute top-8 right-1/3 w-6 h-6 rounded-full bg-amber-400/20 animate-pulse delay-700"></div>
            <div className="absolute -bottom-4 right-1/4 w-10 h-10 rounded-full bg-purple-400/20 animate-pulse delay-1000"></div>

            <div className="inline-block relative">
              <div className="relative bg-emerald-900/60 backdrop-blur-sm rounded-lg p-8 border border-emerald-400/30 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                <h1 className="text-5xl font-bold text-emerald-200 mb-2" style={{ textShadow: "0 0 10px rgba(52,211,153,0.5)" }}>
                  Enchanted Forest Weather
                </h1>
                <div className="text-emerald-300 text-sm mt-2">
                  Whispers of the Ancient Woods
                </div>

                {/* Vine divider */}
                <div className="flex items-center justify-center my-4">
                  <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
                  <Leaf className="mx-4 text-emerald-400 h-4 w-4" />
                  <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
              {/* Primary Search */}
              <div className="bg-emerald-900/40 border border-emerald-400/30 shadow-lg backdrop-blur-sm rounded-lg p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter forest realm..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
                    className="px-4 py-2 bg-emerald-950/50 border border-emerald-600/50 text-emerald-100 placeholder:text-emerald-400/60 focus:border-emerald-400 focus:ring-emerald-400 rounded-lg w-64"
                  />
                  <button
                    onClick={() => fetchWeather()}
                    disabled={loading}
                    className="bg-emerald-600/80 hover:bg-emerald-500/80 text-emerald-50 border border-emerald-400/50 transition-all duration-200 shadow-[0_0_10px_rgba(52,211,153,0.2)] hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] rounded-lg px-4 py-2 flex items-center gap-2"
                  >
                    <SearchIcon />
                    <span>Seek</span>
                  </button>
                </div>
              </div>

              {/* Compare Search */}
              <div className="bg-emerald-900/40 border border-amber-400/30 shadow-lg backdrop-blur-sm rounded-lg p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Compare with another grove..."
                    value={compareLocation}
                    onChange={(e) => setCompareLocation(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && fetchWeather(true)}
                    className="px-4 py-2 bg-emerald-950/50 border border-amber-600/50 text-amber-100 placeholder:text-amber-400/60 focus:border-amber-400 focus:ring-amber-400 rounded-lg w-64"
                  />
                  <button
                    onClick={() => fetchWeather(true)}
                    disabled={compareLoading}
                    className="bg-amber-600/80 hover:bg-amber-500/80 text-amber-50 border border-amber-400/50 transition-all duration-200 shadow-[0_0_10px_rgba(251,191,36,0.2)] hover:shadow-[0_0_15px_rgba(251,191,36,0.4)] rounded-lg px-4 py-2 flex items-center gap-2"
                  >
                    <CompareArrowsIcon />
                    <span>Compare</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Animation */}
          {(loading || compareLoading) && (
            <div className="flex justify-center my-8">
              <div className="text-emerald-300 text-xl animate-pulse flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400/80 animate-ping"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400/80 animate-ping delay-150"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400/80 animate-ping delay-300"></div>
                The forest spirits are gathering whispers...
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-900/30 border border-red-400/30 mb-6 backdrop-blur-sm rounded-lg p-4">
              <div className="text-red-200 text-center" style={{ textShadow: "0 0 5px rgba(248,113,113,0.5)" }}>
                {error}
              </div>
            </div>
          )}

          {weatherData && !loading && (
            <div className="space-y-8">
              {/* Current Weather */}
              <div className="bg-emerald-900/40 border border-emerald-400/30 shadow-lg backdrop-blur-sm rounded-lg overflow-hidden relative">
                {/* Decorative vines */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-emerald-400/30 rounded-br-3xl"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-emerald-400/30 rounded-bl-3xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-emerald-400/30 rounded-tr-3xl"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-emerald-400/30 rounded-tl-3xl"></div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-emerald-200 text-center flex items-center justify-center gap-2 mb-6" style={{ textShadow: "0 0 10px rgba(52,211,153,0.3)" }}>
                    <Leaf className="h-5 w-5 text-emerald-400" />
                    Current Forest Whispers
                    <Leaf className="h-5 w-5 text-emerald-400" />
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4 bg-emerald-950/30 p-6 rounded-lg border border-emerald-400/20 shadow-inner">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-800/50 rounded-full">
                          <Sun className="h-6 w-6 text-amber-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-emerald-200">
                            <span className="font-bold">Warmth:</span>{' '}
                            <span className="text-xl">{weatherData.current.current.temp_c}°C</span>
                            {compareWeatherData && (
                              <span className={`ml-2 inline-flex items-center ${getComparisonClass(weatherData.current.current.temp_c, compareWeatherData.current.current.temp_c)}`}>
                                {getComparisonArrow(weatherData.current.current.temp_c, compareWeatherData.current.current.temp_c)}
                                {compareWeatherData.current.current.temp_c}°C
                              </span>
                            )}
                            <span className="block text-sm italic text-emerald-300 truncate">
                              {getTemperatureDescription(weatherData.current.current.temp_c)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-800/50 rounded-full">
                          <Wind className="h-6 w-6 text-teal-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-emerald-200">
                            <span className="font-bold">Forest Breath:</span>{' '}
                            <span className="whitespace-nowrap">{weatherData.current.current.wind_kph} km/h ({weatherData.current.current.wind_dir})</span>
                            {compareWeatherData && (
                              <span className={`ml-2 inline-flex items-center ${getComparisonClass(weatherData.current.current.wind_kph, compareWeatherData.current.current.wind_kph)}`}>
                                {getComparisonArrow(weatherData.current.current.wind_kph, compareWeatherData.current.current.wind_kph)}
                                {compareWeatherData.current.current.wind_kph} km/h
                              </span>
                            )}
                            <span className="block text-sm italic text-emerald-300 truncate">
                              {getWindDescription(weatherData.current.current.wind_kph)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-800/50 rounded-full">
                          <Droplets className="h-6 w-6 text-blue-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-emerald-200">
                            <span className="font-bold">Dew Drops:</span>{' '}
                            <span>{weatherData.current.current.precip_mm} mm</span>
                            {compareWeatherData && (
                              <span className={`ml-2 inline-flex items-center ${getComparisonClass(weatherData.current.current.precip_mm, compareWeatherData.current.current.precip_mm)}`}>
                                {getComparisonArrow(weatherData.current.current.precip_mm, compareWeatherData.current.current.precip_mm)}
                                {compareWeatherData.current.current.precip_mm} mm
                              </span>
                            )}
                            <span className="block text-sm italic text-emerald-300 truncate">
                              {weatherData.current.current.precip_mm > 5 ? "Woodland Shower" : weatherData.current.current.precip_mm > 0 ? "Gentle Mist" : "Dry Leaves"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Forecast */}
              {weeklyData && (
                <div className="bg-emerald-900/40 border border-emerald-400/30 shadow-lg backdrop-blur-sm rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-emerald-200 text-center mb-6" style={{ textShadow: "0 0 10px rgba(52,211,153,0.3)" }}>
                    Seven Day Forest Harmony
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
                    {weeklyData.forecast.forecastday.map((day, index) => {
                      const compareDay = compareWeeklyData?.forecast.forecastday[index];
                      const date = new Date(day.date);
                      return (
                        <div key={index} className="bg-emerald-950/30 border border-emerald-400/20 rounded-lg p-4 group hover:border-emerald-400/40 transition-all duration-300">
                          <div className="text-emerald-200 font-bold truncate" style={{ textShadow: "0 0 5px rgba(52,211,153,0.3)" }}>
                            {getFantasyDayName(date).split(" ").slice(-1)[0]}
                          </div>
                          <div className="text-emerald-400 text-xs">
                            {date.getDate()}{' '}
                            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()]}
                          </div>
                          <div className="flex items-center gap-2 mt-3">
                            <div className="p-1.5 bg-emerald-800/50 rounded-full">
                              {getWeatherIcon(day.day.condition.text)}
                            </div>
                            <div className="text-emerald-100 text-lg font-bold flex items-center flex-wrap gap-1">
                              {day.day.avgtemp_c}°C
                              {compareDay && (
                                <span className={`text-sm ${getComparisonClass(day.day.avgtemp_c, compareDay.day.avgtemp_c)}`}>
                                  {getComparisonArrow(day.day.avgtemp_c, compareDay.day.avgtemp_c)}
                                  {compareDay.day.avgtemp_c}°
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-emerald-300 text-xs mt-1 italic truncate">{day.day.condition.text}</div>
                          <div className="text-emerald-400 text-xs flex items-center gap-1 mt-1 flex-wrap">
                            <Wind className="h-3 w-3 flex-shrink-0" />
                            <span className="whitespace-nowrap">{day.day.maxwind_kph} km/h</span>
                            {compareDay && (
                              <span className={`ml-1 inline-flex items-center ${getComparisonClass(day.day.maxwind_kph, compareDay.day.maxwind_kph)}`}>
                                {getComparisonArrow(day.day.maxwind_kph, compareDay.day.maxwind_kph)}
                                {compareDay.day.maxwind_kph}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Hourly Forecast */}
              <div className="bg-emerald-900/40 border border-emerald-400/30 shadow-lg backdrop-blur-sm rounded-lg p-6">
                <h2 className="text-2xl font-bold text-emerald-200 text-center mb-6" style={{ textShadow: "0 0 10px rgba(52,211,153,0.3)" }}>
                  Hourly Enchantments
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {weatherData.hourly.forecast.forecastday[0].hour.slice(0, 12).map((hour, index) => {
                    const compareHour = compareWeatherData?.hourly.forecast.forecastday[0].hour[index];
                    return (
                      <div key={index} className="bg-emerald-950/30 border border-emerald-400/20 rounded-lg p-3 group hover:border-emerald-400/40 transition-all duration-300">
                        <div className="text-emerald-200 font-bold text-xs">
                          {new Date(hour.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          <div className="p-1 bg-emerald-800/50 rounded-full">
                            {getWeatherIcon(hour.condition.text)}
                          </div>
                          <div className="text-emerald-100 font-bold flex items-center flex-wrap gap-1">
                            {hour.temp_c}°C
                            {compareHour && (
                              <span className={`text-xs ${getComparisonClass(hour.temp_c, compareHour.temp_c)}`}>
                                {getComparisonArrow(hour.temp_c, compareHour.temp_c)}
                                {compareHour.temp_c}°
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-emerald-300 text-xs italic mt-1 truncate">{hour.condition.text}</div>
                        <div className="text-emerald-400 text-xs flex items-center gap-1 mt-1 flex-wrap">
                          <Wind className="h-3 w-3 flex-shrink-0" />
                          <span className="whitespace-nowrap">{hour.wind_kph} km/h</span>
                          {compareHour && (
                            <span className={`ml-1 inline-flex items-center ${getComparisonClass(hour.wind_kph, compareHour.wind_kph)}`}>
                              {getComparisonArrow(hour.wind_kph, compareHour.wind_kph)}
                              {compareHour.wind_kph}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Fantasy Forest Footer */}
          <div className="text-center mt-12 text-emerald-400/80">
            <div className="flex items-center justify-center mb-4">
              <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>
              <Leaf className="mx-4 h-4 w-4" />
              <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"></div>
            </div>
            <p>Enchanted by the Ancient Forest Spirits</p>
            <p className="text-xs mt-1">May the leaves guide your path</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App; 