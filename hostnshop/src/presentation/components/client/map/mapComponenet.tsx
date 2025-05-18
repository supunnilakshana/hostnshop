// src/presentation/components/MapComponent.tsx
"use client";

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    L: any;
  }
}

const MapComponent: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Skip on server-side
    if (typeof window === 'undefined') return;
    
    let isMounted = true;
    
    const loadLeaflet = async () => {
      // Check if Leaflet is already loaded
      if (!window.L) {
        // Load Leaflet CSS
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(linkElement);

        // Load Leaflet JS dynamically
        try {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = () => resolve();
            script.onerror = reject;
            document.head.appendChild(script);
          });
          
          if (isMounted) initializeMap();
        } catch (err) {
          console.error('Failed to load Leaflet:', err);
        }
      } else {
        initializeMap();
      }
    };
    
    const initializeMap = () => {
      // Ensure the DOM element exists
      const mapContainer = document.getElementById('map');
      if (!mapContainer) return;
      
      // Clear any existing map
      if (mapRef.current) {
        mapRef.current.remove();
      }
      
      // Colombo coordinates
      const colomboCoords: [number, number] = [6.9147, 79.8584];
      
      // Initialize map
      const map = window.L.map('map', {
        center: colomboCoords,
        zoom: 15,
        zoomControl: true,
        scrollWheelZoom: false
      });
      
      // Add tile layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Custom marker icon
      const customIcon = window.L.divIcon({
        html: `
          <div style="
            background-color: #4f46e5;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 4px solid white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            position: relative;
          ">
            <div style="
              background-color: white;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            "></div>
          </div>
        `,
        className: '',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      });
      
      // Add marker
      const marker = window.L.marker(colomboCoords, { icon: customIcon }).addTo(map);
      
      // Add popup
      marker.bindPopup(`
        <div style="text-align: center; padding: 8px; min-width: 200px;">
          <strong style="font-size: 14px; color: #4f46e5;">HostNShop Sri Lanka</strong><br>
          <span style="font-size: 13px;">123 Galle Road<br>
          Colombo 3, Sri Lanka<br>
          +94 11 234 5678</span>
        </div>
      `);
      
      // Store reference
      mapRef.current = map;
      
      // Hide loading indicator
      const loadingElement = document.getElementById('map-loading');
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
    };
    
    loadLeaflet();
    
    // Cleanup
    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-md relative">
      <div id="map" style={{ width: '100%', height: '100%', backgroundColor: '#f0f8ff' }}></div>
      
      {/* Loading indicator */}
      <div id="map-loading" className="absolute inset-0 flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-8 border-4 border-t-4 border-t-indigo-600 border-indigo-200 rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">Loading map...</p>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;