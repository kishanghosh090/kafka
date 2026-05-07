import { useEffect, useState, type JSX } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { socket } from "./socket";

export default function User(): JSX.Element {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const defaultPosition: [number, number] = [51.505, -0.09];

  useEffect(() => {
    const handleRiderLocation = (location: { lat: number; lng: number }) => {
      setLat(location.lat);
      setLong(location.lng);
    };

    socket.on("rider-location", handleRiderLocation);

    return () => {
      socket.off("rider-location", handleRiderLocation);
    };
  }, []);

  const currentPosition: [number, number] =
    lat !== 0 || long !== 0 ? [lat, long] : defaultPosition;

  return (
    <>
      <MapContainer
        center={currentPosition}
        zoom={15} // Higher zoom (15-18) makes the marker the clear focus
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, long]} />
      </MapContainer>
    </>
  );
}
