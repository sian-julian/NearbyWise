import { useState } from "react";
import MoodSelector from "./components/MoodSelector";
import Filters from "./components/Filters";
import PlacesList from "./components/PlacesList";
import { calculateDistance } from "./utils/geoUtils";
import { MapPin, Sparkles, Loader2, Plus } from "lucide-react";

export default function App() {
  const [places, setPlaces] = useState([]);
  const [sortBy, setSortBy] = useState('distance');
  const [userLoc, setUserLoc] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Pagination State: How many places to show at once
  const [visibleCount, setVisibleCount] = useState(6);

  const handleSearchStart = () => {
    setLoading(true);
    setPlaces([]);
    setVisibleCount(6); // Reset pagination on new search
  };

  const handleResults = (results, location) => {
    setUserLoc(location);
    const withDistance = results.map(p => ({
      ...p,
      distance: calculateDistance(location.lat, location.lon, p.lat, p.lon)
    }));
    setPlaces(withDistance);
    setLoading(false);
  };

  const sortedPlaces = [...places].sort((a, b) => {
    if (sortBy === 'distance') return a.distance - b.distance;
    return b.rating - a.rating;
  });

  // Get only the subset of places based on pagination count
  const displayedPlaces = sortedPlaces.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-20 overflow-x-hidden relative">
      
      {/* 1. Animated Background Elements (BLOBS) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* 2. Header Section */}
      <header className="relative z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-2xl mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-10 text-center">
          <div className="flex items-center justify-center mb-3 gap-3">
            <div className="relative">
              <MapPin className="w-10 h-10 text-white animate-bounce" />
              <Sparkles className="w-5 h-5 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
               NearbyWise
            </h1>
          </div>
          <p className="text-blue-100 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
            Discover places that match your <span className="font-semibold text-yellow-200">vibe</span>, not just your search
          </p>
          
          {userLoc && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/80">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Location active • Searching 5km radius</span>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                  className="fill-slate-50 opacity-50"></path>
          </svg>
        </div>
      </header>

      {/* 3. Main Content Section */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="backdrop-blur-md bg-white/70 rounded-3xl shadow-xl border border-white/40 p-8 mb-12 transition-all">
          <MoodSelector 
            onSearchStart={handleSearchStart} 
            onResultsFound={handleResults} 
          />
        </div>
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
            <p className="text-indigo-900 font-medium animate-pulse">Scanning the neighborhood for your vibe...</p>
          </div>
        )}

        {!loading && places.length > 0 && (
          <div className="mt-12 transition-all">
            <div className="backdrop-blur-md bg-white/40 rounded-2xl shadow-lg border border-white/20 p-6 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg text-white">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                   <h2 className="text-2xl font-bold text-indigo-900 leading-none">Top Picks</h2>
                   <p className="text-xs text-indigo-600 mt-1 uppercase tracking-widest font-bold">Showing {displayedPlaces.length} of {places.length} Spots</p>
                </div>
              </div>
              <Filters onSortChange={setSortBy} />
            </div>

            {/* Render the paginated list */}
            <PlacesList places={displayedPlaces} />

            {/* Load More Button */}
            {visibleCount < places.length && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="group flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 border-2 border-indigo-600"
                >
                  <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
                  Load More Places
                </button>
              </div>
            )}
          </div>
        )}

        {!loading && places.length === 0 && (
          <div className="text-center py-16 opacity-60">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
              <MapPin className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready to explore?</h3>
            <p className="text-gray-500">Pick a mood and we'll show you where to go</p>
          </div>
        )}
      </main>
    </div>
  );
}