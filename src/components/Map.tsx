import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import type { Coordinates } from "../types";

// Fix for default marker icons - using CDN URLs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const API_KEY = import.meta.env.VITE_API_KEY
const MAPTILES_KEY = import.meta.env.VITE_MAPTILES_API_KEY 

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
                <MapTileLayer />
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
    
    useEffect(() => {
        map.panTo([coords.lat, coords.lon])
        
        const handleClick = (e: L.LeafletMouseEvent) => {
            const { lat, lng } = e.latlng
            onMapClick(lat, lng)
        }
        
        map.on("click", handleClick)
        
        return () => {
            map.off("click", handleClick)
        }
    }, [coords.lat, coords.lon, map, onMapClick])
    
    return null
}

function MapTileLayer() {
    const map = useMap()
    const layerRef = useRef<InstanceType<typeof MaptilerLayer> | null>(null)
    
    useEffect(() => {
        // Only create the layer once
        if (!layerRef.current) {
            layerRef.current = new MaptilerLayer({
                style: 'basic-dark', 
                apiKey: MAPTILES_KEY
            })
            layerRef.current.addTo(map)
        }
        
        return () => {
            if (layerRef.current) {
                map.removeLayer(layerRef.current)
                layerRef.current = null
            }
        }
    }, []) 
    return null
}