"use client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function PropertyMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [zoom] = useState(11);
  useEffect(() => {
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-46.6388, -23.5505], // São Paulo center
      zoom,
    });
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    return () => map.current?.remove();
  }, [zoom]);
  return <div ref={mapContainer} className="w-full h-screen" />;
}