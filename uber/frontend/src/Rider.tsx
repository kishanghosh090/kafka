import { useEffect, useRef, useState } from "react";
import { socket } from "./socket";

export default function Rider() {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState("");
  const locationIntervalRef = useRef<number | null>(null);

  const sendLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const data = {
          userID: "USER1",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setCoords({ lat: data.lat, lng: data.lng });
        socket.emit("send", data);
      },
      (err) => {
        setError(`Error: ${err.message}`);
      },
    );
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("user connected");
    });

    return () => {
      socket.off("connect");
      if (locationIntervalRef.current !== null) {
        window.clearInterval(locationIntervalRef.current);
      }
    };
  }, []);

  const startSharingLocation = () => {
    if (locationIntervalRef.current !== null) {
      return;
    }

    sendLocation();
    locationIntervalRef.current = window.setInterval(() => {
      sendLocation();
    }, 1000);
  };

  return (
    <div>
      <button onClick={startSharingLocation}>Share My Location</button>
      {coords && (
        <p>
          Lat: {coords.lat}, Lng: {coords.lng}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
