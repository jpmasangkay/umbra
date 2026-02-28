/**
 * Map – interactive Leaflet map with weather tile overlays.
 *
 * Sub-components (all rendered inside <MapContainer>):
 *  - ChangeView   – pans to new coordinates when props change.
 *  - MapClick     – listens for click events so the user can pick a location.
 *  - MapTileLayer – adds the MapTiler "basic-dark" base layer once.
 *  - TileLayer    – OpenWeatherMap weather overlay (clouds, temp, etc.).
 */
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import type { Coordinates } from "../types";

// ----- Fix default Leaflet marker icons (broken by bundlers) -----
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

/** OWM API key for weather tile overlay */
const API_KEY = import.meta.env.VITE_API_KEY
/** MapTiler API key for the base map style */
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

/** ChangeView – re-centres the map whenever the coordinates change. */
function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    
    return null;
}

/**
 * MapClick – registers a Leaflet click handler so the user
 * can select a location directly on the map.
 */
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

/**
 * MapTileLayer – adds the MapTiler "basic-dark" base layer.
 * Created once and cleaned up on unmount to avoid duplicate tiles.
 */
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