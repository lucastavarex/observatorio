"use client";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { CityCombobox } from "./city-combobox";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const cityCoordinates: Record<string, [number, number]> = {
  "São Paulo": [-46.6388, -23.5505],
  "Rio de Janeiro": [-43.43852, -22.91464],
  "Belo Horizonte": [-43.9388, -19.9167],
  "Niteroi": [-43.12084, -22.89277],
};

export default function PropertyMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [zoom] = useState(10.5);
  const [selectedCity, setSelectedCity] = useState("Rio de Janeiro");

  useEffect(() => {
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: cityCoordinates[selectedCity],
      zoom,
    });
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    return () => map.current?.remove();
  }, [zoom]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    if (map.current) {
      map.current.flyTo({
        center: cityCoordinates[city],
        zoom: 10.5,
        duration: 2000,
      });
    }
  };

  return (
    <div className="relative w-full h-screen min-h-lvh">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute top-32 right-4 z-10 w-60">
        <CityCombobox
          value={selectedCity}
          onValueChange={handleCityChange}
          placeholder="Selecionar cidade..."
        />
      </div>
    </div>
  );
}