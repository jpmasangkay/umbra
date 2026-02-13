import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import type { Coordinates } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY

type Props = {
    coordinates: Coordinates;
    onMapClick: (lat: number, lon: number) => void;
    mapType: string
};

export default function Map({ coordinates, onMapClick, mapType }: Props) {
    const { lat, lon } = coordinates;

    console.log("Rendering Map with coordinates:", coordinates);

    return (
        <div
            className="h-125 w-full rounded-lg overflow-hidden"
            style={{ touchAction: 'none' }}
        >
            <MapContainer
                center={[lat, lon]}
                zoom={5} 
                style={{ width: "100%", height: "100%" }}
                scrollWheelZoom={true}
            >
                <ChangeView center={[lat, lon]} />
                <MapClick onMapClick={onMapClick} coords={coordinates} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    <TileLayer 
                    url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
                    opacity={0.6}
                />
                <Marker position={[lat, lon]} />
            </MapContainer>
        </div>
    );
}

function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    
    return null;
}

function MapClick({
    onMapClick,
    coords,
}: {
    onMapClick: (lat: number, lon: number) => void
    coords: Coordinates
}) {
    const map = useMap()
    
    map.panTo([coords.lat, coords.lon])

    map.on("click", (e) => {
        const { lat, lng } = e.latlng
        onMapClick(lat, lng)
    })

    return null
}