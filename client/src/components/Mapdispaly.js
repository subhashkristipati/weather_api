import React, { useEffect, useState } from 'react';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Mapdisplay = (props) => {
    const [weatherData, setWeatherData] = useState({});
    const [center, setCenter] = useState([0, 0]);
    const [mapRef, setMapRef] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://weatherapiserver.onrender.com/weather/${props.city}`);
                const data = await response.json();
                setWeatherData(data);
                setCenter([data.latitude, data.longitude]);
                if (mapRef && mapRef.leafletElement) {
                    mapRef.leafletElement.setZoom(7);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [props.city, mapRef]);

    useEffect(() => {
        if (mapRef && mapRef.leafletElement) {
            mapRef.leafletElement.setView(center, 7);
        }
    }, [center, mapRef]);

    if (!weatherData.latitude || !weatherData.longitude) return null;
    const position = [weatherData.latitude, weatherData.longitude];

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    // console.log("center: " + center)
    // console.log("position: " + position)

    return (
        <MapContainer center={center} zoom={7} style={{ height: '100vh', width: '100%' }} animate={true} ref={(ref) => setMapRef(ref)} key={props.city}>
            <TileLayer
                url="https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=FC51tdcT0QD5DL5C9EpZ"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    <p>City: {weatherData.city}</p>
                    <p>Temperature: {weatherData.temperature} °C</p>
                    <p>Description: {weatherData.description}</p>
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Mapdisplay;
