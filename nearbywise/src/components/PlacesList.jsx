import PlaceCard from "./PlaceCard";
import { TrendingUp } from "lucide-react";

export default function PlacesList({ places }) {
  return (
    <div className="relative">
      {/* Animated counter badge */}
      {places.length > 0 && (
        <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl border border-indigo-100">
          {/* <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Found amazing places</p>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                {places.length} {places.length === 1 ? 'location' : 'locations'}
              </p>
            </div>
          </div> */}
          
          {/* Decorative elements */}
          {/* <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div> */}
        </div>
      )}

      {/* Places Grid with staggered animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {places.map((place, index) => (
          <div
            key={place.place_id}
            className="animate-slideUp"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both'
            }}
          >
            <PlaceCard place={place} />
          </div>
        ))}
      </div>

      {/* Empty state shouldn't show here, but just in case */}
      {places.length === 0 && (
        <div className="text-center py-16 px-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No places found</h3>
          <p className="text-gray-500">Try selecting a different mood or check back later</p>
        </div>
      )}

      {/* Scroll to top hint for long lists */}
      {places.length > 6 && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm text-gray-600 shadow-sm">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
            <span>Scroll up to see all results</span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}