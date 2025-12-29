import { MapPin, Navigation, Clock, Star, Map } from "lucide-react";

export default function PlaceCard({ place }) {
  const currentHour = new Date().getHours();
  const isLikelyOpen = currentHour >= 9 && currentHour < 23;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-indigo-200 transition-all duration-300 overflow-hidden">
      {/* Decorative gradient bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-indigo-50/30 group-hover:via-purple-50/20 group-hover:to-pink-50/30 transition-all duration-500 pointer-events-none"></div>
      
      <div className="relative p-6 flex flex-col justify-between h-full">
        <div>
          {/* Header Section */}
          <div className="flex justify-between items-start mb-3 gap-3">
            <div className="flex-1">
              <h3 className="font-bold text-xl text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors mb-1">
                {place.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-3.5 h-3.5" />
                <span className="capitalize">{place.type?.replace('_', ' ')}</span>
              </div>
            </div>
            
            {/* Rating Badge */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 bg-gradient-to-br from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-xl shadow-md">
                <Star className="w-4 h-4 fill-white" />
                <span className="text-sm font-bold">{place.rating}</span>
              </div>
            </div>
          </div>

          {/* Status and Distance */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {/* Open/Closed Status */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${
              isLikelyOpen 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <div className="relative">
                <Clock className="w-3.5 h-3.5" />
                {isLikelyOpen && (
                  <div className="absolute inset-0 animate-ping">
                    <Clock className="w-3.5 h-3.5 opacity-40" />
                  </div>
                )}
              </div>
              <span>{isLikelyOpen ? "Likely Open" : "Likely Closed"}</span>
            </div>

            {/* Distance Badge */}
            <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-indigo-200">
              <Navigation className="w-3.5 h-3.5" />
              <span>{place.distance} km away</span>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 mb-5 p-3 bg-gray-50 rounded-xl">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-gray-600 text-sm leading-relaxed">
              {place.address}
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <a 
            href={`https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}#map=17/${place.lat}/${place.lon}`}
            target="_blank" 
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 py-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 group/btn"
          >
            <Map className="w-4 h-4 group-hover/btn:animate-pulse" />
            <span>View Map</span>
          </a>
          
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`}
            target="_blank" 
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-md hover:shadow-xl active:scale-95 group/btn relative overflow-hidden"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
            
            <Navigation className="w-4 h-4 relative z-10 group-hover/btn:rotate-45 transition-transform" />
            <span className="relative z-10">Directions</span>
          </a>
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
    </div>
  );
}