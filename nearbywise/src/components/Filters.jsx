export default function Filters({ onSortChange }) {
  return (
    <div className="flex gap-2 mb-4">
      <button 
        onClick={() => onSortChange('distance')}
        className="text-xs bg-gray-200 px-3 py-1 rounded-full hover:bg-indigo-100"
      >
        Sort by Distance
      </button>
      <button 
        onClick={() => onSortChange('rating')}
        className="text-xs bg-gray-200 px-3 py-1 rounded-full hover:bg-indigo-100"
      >
        Sort by Rating
      </button>
    </div>
  )
}