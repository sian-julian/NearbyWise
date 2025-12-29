import { useState } from "react";
import { moodMap } from "../utils/moodMapper";
import { Sparkles, MapPin, Compass, Zap } from "lucide-react";

// Note: Added onSearchStart to the destructuring of props
export default function MoodSelector({ onResultsFound, onSearchStart }) {
  const [selectedMood, setSelectedMood] = useState("");
  const [loading, setLoading] = useState(false);

  // Keywords to block government/service centers tagged incorrectly
  const EXCLUSION_KEYWORDS = ["akshaya", "janasevana", "e-center", "citizen", "government", "aadhaar"];

  // Mood emoji mappings for visual enhancement
  const moodEmojis = {
    coffee: "☕",
    work: "💼",
    date: "💝",
    late_night: "🌙",
    explore: "🗺️",
    relax: "🧘",
    party: "🎉",
    food: "🍽️",
    fitness: "💪",
    shopping: "🛍️"
  };

  const handleSearch = async () => {
    if (!selectedMood) return alert("Please select a mood");
    
    setLoading(true);
    
    // TRIGGER THE LOADING STATE IN APP.JSX (Important for the new animations)
    if (onSearchStart) onSearchStart();

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const amenities = moodMap[selectedMood].join('|');
      
      // FUNCTIONALITY UPDATE: Added 'out center tags' to retrieve Wikidata IDs for real photos
      const query = `
        [out:json][timeout:60];
        (
            node["amenity"~"${amenities}"](around:5000, ${latitude}, ${longitude});
            way["amenity"~"${amenities}"](around:5000, ${latitude}, ${longitude});
            node["leisure"~"${amenities}"](around:5000, ${latitude}, ${longitude});
            way["leisure"~"${amenities}"](around:5000, ${latitude}, ${longitude});
        );
        out center tags;
        `;
      
      try {
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
        
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        
        const formatted = data.elements
          .filter(item => {
            const hasName = item.tags && item.tags.name;
            if (!hasName) return false;

            const name = item.tags.name.toLowerCase();
            const amenity = item.tags.amenity || "";
            
            // 1. BLOCK Government/Utility Centers (Smart Filter)
            const isGovCenter = EXCLUSION_KEYWORDS.some(keyword => name.includes(keyword));
            if (isGovCenter) return false;

            // 2. MOOD SPECIFIC FLEXIBILITY (The Coffee Fix)
            if (selectedMood === 'coffee') {
               return amenity === 'cafe' || name.includes('coffee') || name.includes('cafe') || name.includes('tea');
            }

            return true; 
          })
          .map(item => ({
            place_id: item.id,
            name: item.tags.name,
            type: item.tags.amenity || item.tags.leisure || "Point of Interest",
            address: item.tags["addr:street"] || "Nearby",
            lat: item.lat || (item.center && item.center.lat),
            lon: item.lon || (item.center && item.center.lon),
            // FUNCTIONALITY UPDATE: Pass wikidata ID to App -> PlacesList -> PlaceCard
            wikidata: item.tags.wikidata || null,
            rating: (Math.random() * (5 - 3.8) + 3.8).toFixed(1)
          }));

        // Send results back to App.jsx
        onResultsFound(formatted, { lat: latitude, lon: longitude });
      } catch (error) {
        console.error("OSM Error:", error);
        // Reset loading in App.jsx if fetch fails
        onResultsFound([], { lat: latitude, lon: longitude }); 
        alert("The map server is a bit busy right now. Please wait 5 seconds and click 'Find Places' again!");
      } finally {
        setLoading(false);
      }
    }, (err) => {
      setLoading(false);
      // Ensure App.jsx stops loading if location is denied
      if (onResultsFound) onResultsFound([], null); 
      alert("Location access denied. Please enable GPS and refresh.");
    });
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            What's your vibe today?
          </h2>
          <p className="text-sm text-gray-500">Tell us how you're feeling, we'll find the perfect spot</p>
        </div>
      </div>

      {/* Selection Interface */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Custom Styled Select */}
        <div className="relative flex-1 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
          <div className="relative">
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-2xl p-4 pl-5 pr-12 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all bg-white appearance-none text-gray-700 font-medium shadow-sm hover:shadow-md cursor-pointer"
            >
              <option value="" disabled>✨ Choose your mood...</option>
              {Object.keys(moodMap).map((key) => (
                <option key={key} value={key} className="capitalize py-2">
                  {moodEmojis[key] || "📍"} {key.replace('_', ' ')}
                </option>
              ))}
            </select>
            
            {/* Custom Dropdown Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Selected Mood Indicator */}
            {selectedMood && (
              <div className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg animate-slideDown flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>Selected</span>
              </div>
            )}
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={loading || !selectedMood}
          className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 min-w-[200px] group bg-[length:200%_100%] hover:bg-right-bottom shadow-lg active:scale-95"
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          {loading ? (
            <>
              <div className="relative">
                <Compass className="w-5 h-5 animate-spin" />
                <div className="absolute inset-0 animate-ping">
                  <Compass className="w-5 h-5 opacity-30" />
                </div>
              </div>
              <span className="relative">Discovering...</span>
            </>
          ) : (
            <>
              <MapPin className="w-5 h-5 group-hover:animate-bounce" />
              <span className="relative">Find Places</span>
            </>
          )}
        </button>
      </div>

      {/* Mood Preview Cards (Optional Enhancement) */}
      {selectedMood && !loading && (
        <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 rounded-2xl border-2 border-indigo-100 animate-slideUp">
          <div className="flex items-start gap-3">
            <div className="text-3xl">{moodEmojis[selectedMood] || "📍"}</div>
            <div>
              <h3 className="font-bold text-gray-800 capitalize mb-1">
                {selectedMood.replace('_', ' ')} Mood
              </h3>
              <p className="text-sm text-gray-600">
                Searching for places that match your {selectedMood.replace('_', ' ')} vibe within 5km radius
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}