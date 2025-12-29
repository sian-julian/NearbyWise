<div align="center">
  <img src="https://img.icons8.com/fluency/96/map-marker.png" alt="NearbyWise Logo" width="80" />
  <h1>NearbyWise</h1>
  <p><b>A Geospatial Recommendation Engine for Contextual Discovery</b></p>
  
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/Lucide_Icons-5E6AD2?style=for-the-badge&logo=lucide&logoColor=white" />
  </p>
</div>

<hr />

## 📖 Project Overview
<b>NearbyWise</b> is a location-aware web application designed to bridge the gap between user intent and map data. Traditional navigation tools require users to know exactly what they are looking for (e.g., "Cafe" or "Library"). NearbyWise introduces <b>Contextual Discovery</b>, allowing users to select their current "vibe" or mood. 

The application programmatically translates these abstract moods into technical amenity tags, queries the OpenStreetMap database in real-time, and presents the most relevant social and recreational hubs within a 5km radius.



---

## 🚀 Core Functionalities

<table>
  <tr>
    <td width="50%">
      <h3>🎭 Mood-to-Amenity Mapping</h3>
      A custom translation engine that maps human vibes (<i>"Deep Work"</i>, <i>"Date Night"</i>, <i>"Late Night"</i>) into complex OpenStreetMap tag queries.
    </td>
    <td width="50%">
      <h3>📍 Real-Time Geolocation</h3>
      Integrates the Browser Geolocation API to pinpoint user coordinates and calculate distances using the <b>Haversine Formula</b>.
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>🔢 Advanced Pagination</h3>
      A custom-built pagination system that handles high-volume API responses, displaying 10 results per page with smart ellipsis navigation.
    </td>
    <td width="50%">
      <h3>🧹 Smart Data Sanitization</h3>
      A robust filtering logic that identifies and removes administrative "noise" (utility centers/government offices) from leisure-focused results.
    </td>
  </tr>
</table>

---

## 🛠️ Technical Stack
<ul>
  <li><b>Framework:</b> React.js (Functional Components & Hooks)</li>
  <li><b>Geospatial Data:</b> Overpass API (OpenStreetMap)</li>
  <li><b>Styling:</b> Tailwind CSS (Glassmorphism & Responsive Design)</li>
  <li><b>Icons:</b> Lucide-React</li>
</ul>



---

## ⚙️ Engineering Challenges

### 1. Handling Unstructured Map Data 🧩
OpenStreetMap is community-driven, which leads to inconsistent tagging. I implemented a <b>Keyword Exclusion Engine</b> to prevent non-leisure locations (like Akshaya or Citizen centers) from appearing in recreational searches, significantly improving result quality.

### 2. State Synchronization & UX ⚡
Managing a global list of places while handling independent sorting (by distance/rating) and pagination required a carefully designed state structure. By <b>"Lifting State Up"</b> to the parent component, I ensured that pagination resets correctly every time a new mood is selected.

---

## 📈 Future Roadmap
- [ ] **Google Maps Places API:** Integrating Google’s database for rich business photos and verified user reviews.
- [ ] **Custom Radius Control:** Allowing users to expand their search beyond the default 5km.
- [ ] **Saved Collections:** Persistent storage for users to bookmark their favorite "vibe" spots.

---

## 💻 Installation & Setup

```bash
# Clone the repository
git clone [https://github.com/yourusername/NearbyWise.git](https://github.com/yourusername/NearbyWise.git)

# Install dependencies
npm install

# Launch development server
npm run dev
